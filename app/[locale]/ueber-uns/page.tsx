import { getTranslations } from "next-intl/server";
import { GenericPage, pageMetadata } from "../_page-template";

export const generateMetadata = pageMetadata("ueber-uns");

export default async function Page({ params }: PageProps<"/[locale]/ueber-uns">) {
  const { locale } = await params;
  const t = await getTranslations("nav");
  return <GenericPage locale={locale} slug="ueber-uns" label={t("about")} />;
}
