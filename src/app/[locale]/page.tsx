import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedCakes } from "@/components/home/FeaturedCakes";
import { CategoriesPreview } from "@/components/home/CategoriesPreview";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { CTA } from "@/components/home/CTA";
import { getFeaturedPosts } from "@/lib/instagram";

export const revalidate = 1800;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const featured = await getFeaturedPosts(8);

  return (
    <>
      <Hero showcase={featured.posts} />
      <FeaturedCakes posts={featured.posts} />
      <CategoriesPreview />
      <AboutTeaser />
      <CTA />
    </>
  );
}
