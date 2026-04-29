import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://randa-torte.vercel.app";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Randa Torten",
  alternateName: "Randa Torten Karlsruhe",
  description:
    "Individuelle Torten, Cupcakes & Cookies aus Karlsruhe – handgemacht für Hochzeiten, Geburtstage und besondere Anlässe.",
  url: SITE_URL,
  image: `${SITE_URL}/images/randa-logo.jpg`,
  logo: `${SITE_URL}/images/randa-logo.jpg`,
  priceRange: "€€",
  servesCuisine: "Konditorei, Tortenkunst",
  areaServed: [
    { "@type": "City", name: "Karlsruhe" },
    { "@type": "AdministrativeArea", name: "Baden-Württemberg" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karlsruhe",
    addressRegion: "Baden-Württemberg",
    addressCountry: "DE",
  },
  sameAs: ["https://www.instagram.com/randa_torten/"],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Hochzeitstorte" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Geburtstagstorte" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Motivtorte" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Cupcakes" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Cake Pops" },
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "de" | "en")) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-cream text-charcoal min-h-screen flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
