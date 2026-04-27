import { useTranslations } from "next-intl";
import { ArrowRight, Heart, Leaf, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";

export function AboutTeaser() {
  const t = useTranslations("About");

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="bg-blob bg-rose-soft/40 -top-20 right-0 w-[400px] h-[400px]"
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-rose-deep mb-3">
            {t("eyebrow")}
          </div>
          <h2 className="heading-serif text-4xl sm:text-5xl text-charcoal mb-6">
            {t("title")}
          </h2>
          <p className="text-charcoal/70 leading-relaxed mb-6">{t("story")}</p>
          <div className="heading-serif italic text-rose-deep text-xl mb-8">
            {t("signature")}
          </div>
          <Link
            href="/ueber-uns"
            className="group inline-flex items-center gap-2 text-rose-deep font-medium hover:gap-3 transition-all"
          >
            {t("ctaContact")}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Heart, key: "handmade" },
            { icon: Leaf, key: "fresh" },
            { icon: Sparkles, key: "personal" },
          ].map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-rose-glow transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-soft to-cream-200 flex items-center justify-center mb-4">
                <Icon className="text-rose-deep" size={22} />
              </div>
              <div className="font-medium text-charcoal mb-1">
                {t(`values.${key}` as never)}
              </div>
              <div className="text-sm text-charcoal/60 leading-relaxed">
                {t(`values.${key}Desc` as never)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
