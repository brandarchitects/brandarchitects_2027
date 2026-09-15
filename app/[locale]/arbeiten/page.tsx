import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getCases, getPage, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { ContactClose } from "@/components/modules/ContactClose";

/**
 * Arbeiten-Übersicht (Struktur 1.3 Kap. 5.1): Erklärung zur Herkunft → Projektkarten → «Steht bei Ihnen eine ähnliche Aufgabe an?».
 * Karten im Wechsel 7/5 Spalten, die schmale Karte rückt nach unten – ein Portfolio-Rhythmus statt Raster.
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
  const [cases, page, settings, tn, tw, tc] = await Promise.all([getCases(l), getPage(l, "arbeiten"), getSiteSettings(l), getTranslations("nav"), getTranslations("work"), getTranslations("contact")]);
  return (
    <>
      <section className="site pt-[clamp(3rem,2rem+4vw,6rem)]">
        <header className="grid-12">
          <div className="col-span-12 md:col-span-3"><span className="label text-muted">{tn("work")}</span></div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="h1 max-w-[16ch]">{page?.title ?? tn("work")}</h1>
            {page?.intro && <p className="lead mt-8 max-w-[var(--max-width-measure)] text-muted">{page.intro}</p>}
          </div>
        </header>
        {cases.length > 0 ? (
          <div className="grid-12 mt-[var(--spacing-section)] gap-y-16 md:gap-y-24">
            {cases.map((c, i) => {
              const wide = i % 2 === 0;
              return <div key={c._id} className={wide ? "col-span-12 md:col-span-7" : "col-span-12 md:col-span-5 md:mt-24"}><ProjectCard item={c} priority={i < 2} /></div>;
            })}
          </div>
        ) : (
          <p className="rule mt-[var(--spacing-group)] max-w-[var(--max-width-measure)] pt-4 text-muted">{tw("empty")}</p>
        )}
      </section>
      <ContactClose title={page?.ctaTitle ?? tc("closeTitle")} label={page?.ctaLabel ?? tw("ctaSimilar")} topic={page?.contactTopic} email={settings.email || undefined} />
    </>
  );
}
