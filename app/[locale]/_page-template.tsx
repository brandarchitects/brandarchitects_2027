import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPage, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { FaqJsonLd } from "@/lib/seo/jsonld";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { ProcessSteps } from "@/components/modules/ProcessSteps";
import { Faq } from "@/components/modules/Faq";
import { ContactClose } from "@/components/modules/ContactClose";

/**
 * Gemeinsames Template für "page"-Dokumente (Standortbestimmung, Zusammenarbeit, Über uns, Impressum, Datenschutz).
 * Reihenfolge: Label → H1 → Einleitung → Prozessschritte (falls vorhanden) → Inhalt → FAQ → Kontaktabschluss.
 * Komposition: Seitenkopf über neun Spalten; Inhalt in Lesebreite ab Spalte 4 (Desktop), damit die Register-
 * spalte links frei bleibt. Die Schritte stehen vor dem Inhalt (Struktur 1.3 Kap. 5.5).
 */
export function pageMetadata(slug: string) {
  return async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
    const { locale } = await params;
    const [settings, page] = await Promise.all([getSiteSettings(locale as Locale), getPage(locale as Locale, slug)]);
    if (!page) return {};
    return buildMetadata({ locale: locale as Locale, path: `/${slug}/`, title: page.title, seo: { description: page.intro, ...page.seo }, settings });
  };
}

export async function GenericPage({ locale, slug, label, showCta = true }: { locale: string; slug: string; label?: string; showCta?: boolean }) {
  setRequestLocale(locale);
  const [page, t, tf, tc, settings] = await Promise.all([getPage(locale as Locale, slug), getTranslations("nav"), getTranslations("faq"), getTranslations("contact"), getSiteSettings(locale as Locale)]);
  if (!page) notFound();
  return (
    <>
      <article className="site pt-[clamp(3rem,2rem+4vw,6rem)]">
        <header className="grid-12">
          <div className="col-span-12 md:col-span-3">{label && <span className="label text-muted">{label}</span>}</div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="h1 max-w-[16ch]">{page.title}</h1>
            {page.intro && <p className="lead mt-8 max-w-[var(--max-width-measure)]">{page.intro}</p>}
          </div>
        </header>
        {page.steps?.length ? <div className="mt-[var(--spacing-section)]"><ProcessSteps steps={page.steps} /></div> : null}
        {page.body?.length ? (
          <div className="grid-12 mt-[var(--spacing-group)]">
            <div className="col-span-12 md:col-span-8 md:col-start-4"><PortableTextRenderer value={page.body} /></div>
          </div>
        ) : null}
        {page.faqs?.length ? (
          <div className="grid-12 mt-[var(--spacing-section)]">
            <div className="col-span-12 md:col-span-9 md:col-start-4"><Faq items={page.faqs} title={tf("title")} /><FaqJsonLd faqs={page.faqs} /></div>
          </div>
        ) : null}
      </article>
      {showCta && <ContactClose title={page.ctaTitle ?? tc("closeTitle")} label={page.ctaLabel ?? t("cta")} topic={page.contactTopic} email={settings.email || undefined} />}
    </>
  );
}
