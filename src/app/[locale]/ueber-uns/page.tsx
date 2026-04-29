import { setRequestLocale, getTranslations } from "next-intl/server";
import { Heart, Leaf, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div
        className="bg-blob bg-rose-soft/30 -top-20 right-0 w-[500px] h-[500px]"
        aria-hidden
      />
      <div className="bg-blob bg-gold/30 bottom-0 -left-20 w-[400px] h-[400px]" aria-hidden />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-xs tracking-[0.3em] uppercase text-rose-deep mb-4">
          {t("eyebrow")}
        </div>
        <h1 className="heading-serif text-5xl sm:text-6xl text-charcoal mb-8 leading-[1.05]">
          {t("title")}
        </h1>

        <div className="w-40 h-40 mx-auto mb-10 rounded-full overflow-hidden ring-4 ring-rose-soft shadow-rose-glow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/randa-logo.jpg"
            alt="Randa Torten – Tortenbäckerei Karlsruhe"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-lg text-charcoal/80 leading-relaxed max-w-2xl mx-auto mb-8">
          {t("story")}
        </p>
        <p className="heading-serif italic text-2xl text-rose-deep mb-16">
          {t("signature")}
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Heart, key: "handmade" },
            { icon: Leaf, key: "fresh" },
            { icon: Sparkles, key: "personal" },
          ].map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="bg-white rounded-3xl p-8 shadow-soft text-left"
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

        <Link
          href="/bestellen"
          className="inline-flex items-center px-8 py-4 rounded-full bg-rose-deep text-cream font-medium hover:bg-rose-darker hover:scale-105 transition-all shadow-rose-glow"
        >
          {t("ctaContact")}
        </Link>
      </div>
    </section>
  );
}
