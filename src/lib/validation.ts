import { z } from "zod";

const sevenDaysFromNow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const orderSchema = z.object({
  occasion: z.enum([
    "wedding",
    "birthday",
    "baptism",
    "anniversary",
    "corporate",
    "other",
  ]),
  date: z
    .string()
    .min(1)
    .refine((val) => {
      const d = new Date(val);
      return !Number.isNaN(d.getTime()) && d >= sevenDaysFromNow();
    }, "Date must be at least 7 days from now"),
  guests: z.coerce.number().int().min(1).max(500),
  flavor: z.string().min(10).max(2000),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(5).max(40),
  address: z.string().max(300).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  consent: z
    .union([z.boolean(), z.literal("on"), z.literal("true")])
    .refine((v) => v === true || v === "on" || v === "true", {
      message: "Consent required",
    }),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type OrderInput = z.infer<typeof orderSchema>;
