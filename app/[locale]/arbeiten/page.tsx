import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getCases, getPage, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { ContactClose } from "@/components/modules/ContactClose";

/**
 * Arbeiten-Übersicht (Struktur 1.3 Kap. 5.1): Erklärung zur Herkunft → Projektkarten → «Steht bei Ihnen eine ähnliche Aufgabe an?».
 * Redaktionelle Texte kommen aus dem page-Dokument mit Slug «arbeiten».
 */
export async function generateMetadata({ params }: PageProps<"/[locale]/arbeiten">): Promise<Metadata> {
  const { locale } = await params;
  const [settings, page] = await Promise.all([getSiteSettings(locale as Locale), getPage(locale as Locale, "arbeiten")]);
  return buildMetadata({ locale: locale as Locale, path: "/arbeiten/", title: page?.seo?.title ?? `Arbeiten und Markenprojekte – ${settings.brandName}`, seo: { description: page?.intro, ...page?.seo }, settings });
}

export default async function WorkPage({ params }: PageProps<"/[locale]/arbeiten">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const [cases, page, tn, tw, tc] = await Promise.all([getCases(l), getPage(l, "arbeiten"), getTranslations("nav"), getTranslations("work"), getTranslations("contact")]);
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-section">
        <h1 className="max-w-4xl text-4xl font-semibold md:text-5xl">{page?.title ?? tn("work")}</h1>
        {page?.intro && <p className="mt-6 max-w-measure text-lg">{page.intro}</p>}
        <div className="mt-12 grid gap-12 md:grid-cols-2">{cases.map((c) => <ProjectCard key={c._id} item={c} />)}</div>
      </section>
      <ContactClose title={page?.ctaTitle ?? tc("closeTitle")} label={page?.ctaLabel ?? tw("ctaSimilar")} topic={page?.contactTopic} />
    </>
  );
}
