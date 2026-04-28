import { setRequestLocale, getTranslations } from "next-intl/server";
import { Instagram } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });

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

        <div className="max-w-md mx-auto">
          <a
            href="https://www.instagram.com/randa_torten/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-8 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Instagram className="text-white" size={28} />
            </div>
            <div className="text-white">
              <div className="font-semibold text-lg">Instagram</div>
              <div className="text-white/80 text-sm">@randa_torten</div>
            </div>
          </a>
        </div>

        <p className="text-center mt-10 text-charcoal/60 text-sm">
          {t("contactNote")}
        </p>
      </div>
    </section>
  );
}
