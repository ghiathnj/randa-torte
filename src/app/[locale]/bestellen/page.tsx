import { redirect } from "next/navigation";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Direkt auf Instagram weiterleiten
  redirect(`https://www.instagram.com/randa_torten/`);
}
