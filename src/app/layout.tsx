import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Randa Torten · Handgemacht mit Liebe in Karlsruhe",
    template: "%s · Randa Torten",
  },
  description:
    "Individuelle Torten, Cupcakes, Cakepops & Cookies für Hochzeiten, Geburtstage und besondere Anlässe – mit Liebe handgefertigt in Karlsruhe.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Randa Torten",
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
