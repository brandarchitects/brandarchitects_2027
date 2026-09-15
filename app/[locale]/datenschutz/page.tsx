import { getTranslations } from "next-intl/server";
import { GenericPage, pageMetadata } from "../_page-template";

export const generateMetadata = pageMetadata("datenschutz");

export default async function Page({ params }: PageProps<"/[locale]/datenschutz">) {
  const { locale } = await params;
  const t = await getTranslations("footer");
  return <GenericPage locale={locale} slug="datenschutz" label={t("privacy")} showCta={false} />;
}
