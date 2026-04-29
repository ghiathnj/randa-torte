import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://randa-torte.vercel.app";

const ROUTES = [
  { de: "/", en: "/", changeFrequency: "weekly" as const, priority: 1.0 },
  {
    de: "/galerie",
    en: "/gallery",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
  {
    de: "/preise-faq",
    en: "/prices-faq",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    de: "/ueber-uns",
    en: "/about",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    de: "/kontakt",
    en: "/contact",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    de: "/bestellen",
    en: "/order",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.flatMap((route) => [
    {
      url: `${SITE_URL}/de${route.de === "/" ? "" : route.de}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          de: `${SITE_URL}/de${route.de === "/" ? "" : route.de}`,
          en: `${SITE_URL}/en${route.en === "/" ? "" : route.en}`,
        },
      },
    },
    {
      url: `${SITE_URL}/en${route.en === "/" ? "" : route.en}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority * 0.9,
      alternates: {
        languages: {
          de: `${SITE_URL}/de${route.de === "/" ? "" : route.de}`,
          en: `${SITE_URL}/en${route.en === "/" ? "" : route.en}`,
        },
      },
    },
  ]);
}
