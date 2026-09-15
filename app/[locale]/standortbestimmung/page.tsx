import { getTranslations } from "next-intl/server";
import { GenericPage, pageMetadata } from "../_page-template";

export const generateMetadata = pageMetadata("standortbestimmung");

export default async function Page({ params }: PageProps<"/[locale]/standortbestimmung">) {
  const { locale } = await params;
  const t = await getTranslations("footer");
  return <GenericPage locale={locale} slug="standortbestimmung" label={t("assessment")} />;
}
