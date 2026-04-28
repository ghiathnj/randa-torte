import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const ITEMS = [
  {
    key: "birthday",
    image: "/images/cakes/salam-makeup.jpg",
    label: "Geburtstag"
  },
  {
    key: "kids",
    image: "/images/cakes/super-josef-mario.jpg",
    label: "Kinder"
  },
  {
    key: "love",
    image: "/images/cakes/teething-time-blue.jpg",
    label: "Liebe"
  },
  {
    key: "special",
    image: "/images/cakes/capybara-onsen.jpg",
    label: "Besonderes"
  },
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

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ITEMS.map(({ key, image, label }) => (
            <Link
              key={key}
              href="/galerie"
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft hover:shadow-rose-glow hover:scale-[1.02] transition-all"
            >
              <img
                src={image}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-white font-medium text-lg mb-1">{label}</div>
                <div className="text-white/70 text-sm">{t(`${key}Desc` as never)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
