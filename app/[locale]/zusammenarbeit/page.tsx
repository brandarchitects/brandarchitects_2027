import { GenericPage, pageMetadata } from "../_page-template";

export const generateMetadata = pageMetadata("zusammenarbeit");

export default async function Page({ params }: PageProps<"/[locale]/zusammenarbeit">) {
  const { locale } = await params;
  return <GenericPage locale={locale} slug="zusammenarbeit" />;
}
