import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export function CTA() {
  const t = useTranslations("Hero");
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-deep via-rose-darker to-charcoal p-12 sm:p-20 text-center text-cream shadow-2xl shadow-rose-deep/30">
          <div
            className="bg-blob bg-gold/40 -top-20 -right-20 w-[400px] h-[400px]"
            aria-hidden
          />
          <div className="relative">
            <h3 className="heading-serif text-4xl sm:text-5xl mb-4">
              Bereit für deinen Moment?
            </h3>
            <p className="text-cream/80 max-w-xl mx-auto mb-10">
              Erzähl uns von deinem Anlass. Wir gestalten daraus eine Torte, an
              die du und deine Gäste euch noch lange erinnern werdet.
            </p>
            <Link
              href="/bestellen"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cream text-rose-deep font-medium hover:bg-white hover:scale-105 transition-all shadow-xl"
            >
              {t("ctaPrimary")}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
