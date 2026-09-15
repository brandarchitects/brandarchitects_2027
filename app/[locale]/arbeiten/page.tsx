import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getCases, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { ProjectCard } from "@/components/modules/ProjectCard";

export async function generateMetadata({ params }: PageProps<"/[locale]/arbeiten">): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings(locale as Locale);
  return buildMetadata({ locale: locale as Locale, path: "/arbeiten/", title: `Arbeiten und Markenprojekte – ${settings.brandName}`, settings });
}

export default async function WorkPage({ params }: PageProps<"/[locale]/arbeiten">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [cases, t] = await Promise.all([getCases(locale as Locale), getTranslations("nav")]);
  return (
    <section className="mx-auto max-w-7xl px-6 py-section">
      <h1 className="text-4xl font-semibold">{t("work")}</h1>
      <div className="mt-12 grid gap-12 md:grid-cols-2">{cases.map((c) => <ProjectCard key={c._id} item={c} />)}</div>
    </section>
  );
}
