"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";
import { submitOrder } from "@/lib/actions/order";
import { cn } from "@/lib/cn";

const OCCASIONS = [
  "wedding",
  "birthday",
  "baptism",
  "anniversary",
  "corporate",
  "other",
] as const;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; reason: "rate_limit" | "server" | "validation"; fields?: Record<string, string> };

export function OrderForm() {
  const t = useTranslations("Order");
  const locale = useLocale() as "de" | "en";
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [pending, startTransition] = useTransition();

  const minDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  })();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setStatus({ kind: "submitting" });
    startTransition(async () => {
      const result = await submitOrder(locale, formData);
      if (result.ok) {
        setStatus({ kind: "success" });
      } else {
        setStatus({
          kind: "error",
          reason: result.error ?? "server",
          fields: result.fieldErrors,
        });
      }
    });
  };

  if (status.kind === "success") {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-12 text-center shadow-rose-glow">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-emerald-500" size={32} />
        </div>
        <h2 className="heading-serif text-3xl text-rose-deep mb-3">
          {t("success.title")}
        </h2>
        <p className="text-charcoal/70 mb-8">{t("success.body")}</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="inline-flex items-center px-6 py-3 rounded-full bg-rose-deep text-cream font-medium hover:bg-rose-darker transition-colors"
        >
          {t("success.again")}
        </button>
      </div>
    );
  }

  const fieldErrors =
    status.kind === "error" ? status.fields ?? {} : {};

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-rose-glow space-y-6"
    >
      {status.kind === "error" ? (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 text-rose-darker">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-medium">{t("error.title")}</div>
            <div className="text-rose-darker/80">
              {status.reason === "rate_limit"
                ? t("error.rateLimit")
                : t("error.body")}
            </div>
          </div>
        </div>
      ) : null}

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] top-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label={t("fields.occasion")}
          name="occasion"
          error={fieldErrors.occasion}
        >
          <select
            name="occasion"
            required
            defaultValue=""
            className={inputCls(!!fieldErrors.occasion)}
          >
            <option value="" disabled>
              {t("fields.occasionPlaceholder")}
            </option>
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {t(`fields.occasion${o.charAt(0).toUpperCase() + o.slice(1)}` as never)}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={t("fields.date")}
          name="date"
          error={fieldErrors.date}
        >
          <input
            type="date"
            name="date"
            required
            min={minDate}
            className={inputCls(!!fieldErrors.date)}
          />
        </Field>

        <Field
          label={t("fields.guests")}
          name="guests"
          error={fieldErrors.guests}
        >
          <input
            type="number"
            name="guests"
            min={1}
            max={500}
            required
            placeholder={t("fields.guestsPlaceholder")}
            className={inputCls(!!fieldErrors.guests)}
          />
        </Field>

        <Field
          label={t("fields.phone")}
          name="phone"
          error={fieldErrors.phone}
        >
          <input
            type="tel"
            name="phone"
            required
            className={inputCls(!!fieldErrors.phone)}
          />
        </Field>
      </div>

      <Field
        label={t("fields.flavor")}
        name="flavor"
        error={fieldErrors.flavor}
      >
        <textarea
          name="flavor"
          required
          rows={4}
          placeholder={t("fields.flavorPlaceholder")}
          className={inputCls(!!fieldErrors.flavor)}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t("fields.name")} name="name" error={fieldErrors.name}>
          <input
            type="text"
            name="name"
            required
            className={inputCls(!!fieldErrors.name)}
          />
        </Field>
        <Field
          label={t("fields.email")}
          name="email"
          error={fieldErrors.email}
        >
          <input
            type="email"
            name="email"
            required
            className={inputCls(!!fieldErrors.email)}
          />
        </Field>
      </div>

      <Field
        label={t("fields.address")}
        name="address"
        hint={t("fields.addressHint")}
      >
        <input type="text" name="address" className={inputCls(false)} />
      </Field>

      <Field
        label={t("fields.message")}
        name="message"
      >
        <textarea name="message" rows={3} className={inputCls(false)} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-charcoal/70 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 w-4 h-4 accent-rose-deep"
        />
        <span>
          {t("fields.consent")}
          {fieldErrors.consent ? (
            <span className="text-rose-darker block text-xs mt-1">
              {fieldErrors.consent}
            </span>
          ) : null}
        </span>
      </label>

      <button
        type="submit"
        disabled={pending || status.kind === "submitting"}
        className={cn(
          "group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full",
          "bg-rose-deep text-cream font-medium shadow-rose-glow",
          "hover:bg-rose-darker hover:scale-[1.02] transition-all",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
        )}
      >
        {pending || status.kind === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {t("submitting")}
          </>
        ) : (
          <>
            <Send size={18} />
            {t("submit")}
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  hint,
  error,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="text-sm font-medium text-charcoal mb-1.5 block">
        {label}
      </span>
      {children}
      {error ? (
        <span className="text-xs text-rose-darker mt-1 block">{error}</span>
      ) : hint ? (
        <span className="text-xs text-charcoal/50 mt-1 block">{hint}</span>
      ) : null}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full px-4 py-2.5 rounded-xl bg-cream/50 border-2 transition-all text-charcoal",
    "placeholder:text-charcoal/30",
    "focus:outline-none focus:bg-white",
    hasError
      ? "border-rose-darker focus:border-rose-darker"
      : "border-rose-soft/30 focus:border-rose-deep",
  );
}
