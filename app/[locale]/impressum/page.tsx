import { GenericPage, pageMetadata } from "../_page-template";

export const generateMetadata = pageMetadata("impressum");

export default async function Page({ params }: PageProps<"/[locale]/impressum">) {
  const { locale } = await params;
  return <GenericPage locale={locale} slug="impressum" showCta={false} />;
}
