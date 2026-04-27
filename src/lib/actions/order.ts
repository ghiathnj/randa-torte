"use server";

import { headers } from "next/headers";
import { orderSchema } from "../validation";
import { sendOrderEmails } from "../email";
import { checkRateLimit } from "../rate-limit";

export interface OrderActionResult {
  ok: boolean;
  error?: "validation" | "rate_limit" | "server";
  fieldErrors?: Record<string, string>;
}

export async function submitOrder(
  locale: "de" | "en",
  formData: FormData,
): Promise<OrderActionResult> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";

  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return { ok: false, error: "rate_limit" };
  }

  const raw = Object.fromEntries(formData.entries());

  // Honeypot — silently treat bot submissions as success
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return { ok: true };
  }

  const parsed = orderSchema.safeParse({
    ...raw,
    consent: raw.consent === "on" || raw.consent === "true",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "validation", fieldErrors };
  }

  try {
    await sendOrderEmails(parsed.data, locale);
    return { ok: true };
  } catch (err) {
    console.error("[order] sendOrderEmails failed:", err);
    return { ok: false, error: "server" };
  }
}
