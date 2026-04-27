import { setRequestLocale, getTranslations } from "next-intl/server";
import { Gallery } from "@/components/gallery/Gallery";
import { getInstagramPosts } from "@/lib/instagram";

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });
  return { title: t("title") };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const payload = await getInstagramPosts();
  return <Gallery payload={payload} />;
}
