import { GenericPage, pageMetadata } from "../_page-template";

export const generateMetadata = pageMetadata("ueber-uns");

export default async function Page({ params }: PageProps<"/[locale]/ueber-uns">) {
  const { locale } = await params;
  return <GenericPage locale={locale} slug="ueber-uns" />;
}
