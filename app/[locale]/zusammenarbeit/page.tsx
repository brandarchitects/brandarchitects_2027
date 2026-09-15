import { getTranslations } from "next-intl/server";
import { GenericPage, pageMetadata } from "../_page-template";

export const generateMetadata = pageMetadata("zusammenarbeit");

export default async function Page({ params }: PageProps<"/[locale]/zusammenarbeit">) {
  const { locale } = await params;
  const t = await getTranslations("nav");
  return <GenericPage locale={locale} slug="zusammenarbeit" label={t("collaboration")} />;
}
