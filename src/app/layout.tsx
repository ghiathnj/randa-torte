import type { Metadata } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://randa-torte.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Randa Torten · Tortenbäckerei in Karlsruhe – Hochzeitstorten, Geburtstagstorten & individuelle Torten",
    template: "%s · Randa Torten Karlsruhe",
  },
  description:
    "Individuelle Torten, Cupcakes & Cookies aus Karlsruhe – handgemacht für Hochzeiten, Geburtstage und besondere Anlässe. Jetzt deine Wunschtorte anfragen.",
  keywords: [
    "Torte Karlsruhe",
    "Tortenbäckerei Karlsruhe",
    "Hochzeitstorte Karlsruhe",
    "Geburtstagstorte Karlsruhe",
    "Motivtorte Karlsruhe",
    "Konditorei Karlsruhe",
    "individuelle Torte",
    "Cupcakes Karlsruhe",
    "Cake Pops Karlsruhe",
    "Randa Torten",
  ],
  authors: [{ name: "Randa Torten" }],
  creator: "Randa Torten",
  publisher: "Randa Torten",
  alternates: {
    canonical: "/",
    languages: {
      de: "/de",
      en: "/en",
      "x-default": "/de",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    siteName: "Randa Torten Karlsruhe",
    title:
      "Randa Torten · Tortenbäckerei in Karlsruhe – Hochzeit, Geburtstag, Motivtorten",
    description:
      "Individuelle Torten, Cupcakes & Cookies aus Karlsruhe – handgemacht für Hochzeiten, Geburtstage und besondere Anlässe.",
    url: SITE_URL,
    images: [
      {
        url: "/images/cakes/super-josef-mario.jpg",
        width: 840,
        height: 920,
        alt: "Individuelle Motivtorte aus Karlsruhe – Randa Torten",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Randa Torten · Tortenbäckerei in Karlsruhe",
    description:
      "Individuelle Torten, Cupcakes & Cookies aus Karlsruhe – handgemacht für Hochzeiten, Geburtstage und besondere Anlässe.",
    images: ["/images/cakes/super-josef-mario.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
