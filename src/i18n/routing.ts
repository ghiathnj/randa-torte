import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/galerie": {
      de: "/galerie",
      en: "/gallery",
    },
    "/ueber-uns": {
      de: "/ueber-uns",
      en: "/about",
    },
    "/bestellen": {
      de: "/bestellen",
      en: "/order",
    },
    "/kontakt": {
      de: "/kontakt",
      en: "/contact",
    },
    "/preise-faq": {
      de: "/preise-faq",
      en: "/prices-faq",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
