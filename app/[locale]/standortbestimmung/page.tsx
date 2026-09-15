import { GenericPage, pageMetadata } from "../_page-template";

export const generateMetadata = pageMetadata("standortbestimmung");

export default async function Page({ params }: PageProps<"/[locale]/standortbestimmung">) {
  const { locale } = await params;
  return <GenericPage locale={locale} slug="standortbestimmung" />;
}
