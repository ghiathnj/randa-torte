import { setRequestLocale, getTranslations } from "next-intl/server";
import { OrderForm } from "@/components/order/OrderForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Order" });
  return { title: t("title") };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Order" });

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-serif text-4xl sm:text-5xl text-charcoal">
            {t("title")}
          </h1>
          <p className="mt-3 text-charcoal/60 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        <OrderForm />
      </div>
    </section>
  );
}
