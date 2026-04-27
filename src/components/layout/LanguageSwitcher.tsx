"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/cn";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const swap = locale === "de" ? "en" : "de";

  const onSwitch = () => {
    startTransition(() => {
      router.replace(pathname, { locale: swap });
    });
  };

  return (
    <button
      type="button"
      onClick={onSwitch}
      disabled={isPending}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium tracking-wider uppercase",
        "border border-charcoal/10 hover:border-rose-deep/40 hover:text-rose-deep transition-all",
        "text-charcoal/70",
      )}
      aria-label="Switch language"
    >
      <Globe size={14} />
      <span>{swap}</span>
    </button>
  );
}
