import { setRequestLocale, getTranslations } from "next-intl/server";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

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
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="heading-serif text-4xl sm:text-5xl text-charcoal">
            {t("title")}
          </h1>
          <p className="mt-3 text-charcoal/60">{t("subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <ContactCard
              icon={MapPin}
              title={t("address")}
              detail={t("addressNote")}
            />
            <ContactCard
              icon={Clock}
              title={t("hours")}
              detail={t("hoursValue")}
            />
            <ContactCard
              icon={Instagram}
              title={t("instagram")}
              detail={t("instagramHandle")}
              href="https://www.instagram.com/randa_torten/"
            />
            {whatsapp ? (
              <ContactCard
                icon={MessageCircle}
                title={t("whatsapp")}
                detail={t("whatsappCta")}
                href={`https://wa.me/${whatsapp}`}
                accent
              />
            ) : null}
          </div>

          <div className="rounded-3xl overflow-hidden shadow-rose-glow h-[420px] lg:h-full">
            <iframe
              title="Karlsruhe map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=8.36%2C48.97%2C8.46%2C49.04&layer=mapnik&marker=49.0069%2C8.4037"
              loading="lazy"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  title,
  detail,
  href,
  accent = false,
}: {
  icon: typeof Mail;
  title: string;
  detail: string;
  href?: string;
  accent?: boolean;
}) {
  const Wrapper = href ? "a" : "div";
  const props = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Wrapper
      {...(props as Record<string, string>)}
      className={`flex items-start gap-4 p-6 bg-white rounded-2xl shadow-soft transition-all ${
        href ? "hover:shadow-rose-glow hover:-translate-y-0.5" : ""
      } ${accent ? "ring-2 ring-emerald-400/50" : ""}`}
    >
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
          accent
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-soft/30 text-rose-deep"
        }`}
      >
        <Icon size={22} />
      </div>
      <div>
        <div className="font-medium text-charcoal mb-1">{title}</div>
        <div className="text-sm text-charcoal/60">{detail}</div>
      </div>
    </Wrapper>
  );
}
