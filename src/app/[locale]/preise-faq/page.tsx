import { setRequestLocale, getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";

const FAQ_INDICES = [0, 1, 2, 3, 4] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Prices" });
  return { title: t("title") };
}

export default async function PricesFaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Prices" });

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="heading-serif text-4xl sm:text-5xl text-charcoal">
            {t("title")}
          </h1>
          <p className="mt-3 text-charcoal/60 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Preisübersicht - neu */}
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden mb-16">
          <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-rose-soft/30 to-cream-200 border-b border-rose-soft/30">
            <h2 className="heading-serif text-2xl text-charcoal">
              {t("tableTitle")}
            </h2>
          </div>
          <div className="divide-y divide-rose-soft/20">
            <div className="grid grid-cols-2 gap-2 sm:gap-6 px-6 sm:px-8 py-5 items-center hover:bg-cream/40 transition-colors">
              <div className="font-medium text-charcoal">
                {t("items.tenPeople.name")}
              </div>
              <div className="text-rose-deep font-semibold text-right">
                {t("items.tenPeople.price")}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-6 px-6 sm:px-8 py-5 items-center hover:bg-cream/40 transition-colors">
              <div className="font-medium text-charcoal">
                {t("items.twentyPeople.name")}
              </div>
              <div className="text-rose-deep font-semibold text-right">
                {t("items.twentyPeople.price")}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-6 px-6 sm:px-8 py-5 items-center hover:bg-cream/40 transition-colors">
              <div className="font-medium text-charcoal">
                {t("items.thirtyPeople.name")}
              </div>
              <div className="text-rose-deep font-semibold text-right">
                {t("items.thirtyPeople.price")}
              </div>
            </div>
          </div>
          <div className="px-6 sm:px-8 py-4 bg-cream/40 text-sm text-charcoal/70">
            {t("note")}
          </div>
        </div>

        <h2 className="heading-serif text-3xl text-charcoal mb-8 text-center">
          {t("faqTitle")}
        </h2>
        <div className="space-y-3">
          {FAQ_INDICES.map((i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl shadow-soft overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-rose-soft/10 transition-colors">
                <span className="font-medium text-charcoal">
                  {t(`faq.${i}.q` as never)}
                </span>
                <ChevronDown
                  size={20}
                  className="text-rose-deep transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="px-5 pb-5 text-sm text-charcoal/70 leading-relaxed">
                {t(`faq.${i}.a` as never)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
