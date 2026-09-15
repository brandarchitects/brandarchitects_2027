import { getTranslations } from "next-intl/server";
import { GenericPage, pageMetadata } from "../_page-template";

export const generateMetadata = pageMetadata("impressum");

export default async function Page({ params }: PageProps<"/[locale]/impressum">) {
  const { locale } = await params;
  const t = await getTranslations("footer");
  return <GenericPage locale={locale} slug="impressum" label={t("imprint")} showCta={false} />;
}
