import { GenericPage, pageMetadata } from "../_page-template";

export const generateMetadata = pageMetadata("datenschutz");

export default async function Page({ params }: PageProps<"/[locale]/datenschutz">) {
  const { locale } = await params;
  return <GenericPage locale={locale} slug="datenschutz" showCta={false} />;
}
