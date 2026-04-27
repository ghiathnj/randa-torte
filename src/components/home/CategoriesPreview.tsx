import { useTranslations } from "next-intl";
import { Cake, Cookie, Heart, PartyPopper, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";

const ITEMS = [
  { key: "wedding", icon: Heart, accent: "from-rose-soft to-rose-deep" },
  { key: "birthday", icon: PartyPopper, accent: "from-gold-light to-gold" },
  { key: "cupcakes", icon: Cake, accent: "from-rose-soft to-gold-light" },
  { key: "cookies", icon: Cookie, accent: "from-cream-200 to-gold" },
  { key: "cakepops", icon: Sparkles, accent: "from-rose-soft to-cream-200" },
] as const;

export function CategoriesPreview() {
  const t = useTranslations("Categories");

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-cream to-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[0.3em] uppercase text-rose-deep mb-3">
            {t("eyebrow")}
          </div>
          <h2 className="heading-serif text-4xl sm:text-5xl text-charcoal">
            {t("title")}
          </h2>
          <p className="mt-3 text-charcoal/60 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {ITEMS.map(({ key, icon: Icon, accent }) => (
            <Link
              key={key}
              href="/galerie"
              className="group relative bg-white rounded-3xl p-6 sm:p-8 text-center shadow-soft hover:shadow-rose-glow hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className="text-white" size={26} />
              </div>
              <div className="font-medium text-charcoal mb-1">{t(key)}</div>
              <div className="text-xs text-charcoal/60 leading-snug">
                {t(`${key}Desc` as never)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
