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
 * Reihenfolge: H1 → Einleitung → Prozessschritte (falls vorhanden) → Inhalt → FAQ → Kontaktabschluss.
 * Die Schritte stehen vor dem Inhalt, weil Struktur 1.3 Kap. 5.5 sie direkt nach der Einführung verlangt.
 * Jede Route ruft `pageMetadata(slug)` und `<GenericPage slug=… />` auf.
 */
export function pageMetadata(slug: string) {
  return async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
    const { locale } = await params;
    const [settings, page] = await Promise.all([getSiteSettings(locale as Locale), getPage(locale as Locale, slug)]);
    if (!page) return {};
    return buildMetadata({ locale: locale as Locale, path: `/${slug}/`, title: page.title, seo: { description: page.intro, ...page.seo }, settings });
  };
}

export async function GenericPage({ locale, slug, showCta = true }: { locale: string; slug: string; showCta?: boolean }) {
  setRequestLocale(locale);
  const [page, t, tf, tc] = await Promise.all([getPage(locale as Locale, slug), getTranslations("nav"), getTranslations("faq"), getTranslations("contact")]);
  if (!page) notFound();
  return (
    <article className="mx-auto max-w-7xl px-6 py-section">
      <h1 className="max-w-4xl text-4xl font-semibold md:text-5xl">{page.title}</h1>
      {page.intro && <p className="mt-6 max-w-measure text-lg">{page.intro}</p>}
      {page.steps?.length ? <div className="mt-section"><ProcessSteps steps={page.steps} /></div> : null}
      <div className="mt-8"><PortableTextRenderer value={page.body} /></div>
      {page.faqs?.length ? <div className="mt-section"><Faq items={page.faqs} title={tf("title")} /><FaqJsonLd faqs={page.faqs} /></div> : null}
      {showCta && <ContactClose title={page.ctaTitle ?? tc("closeTitle")} label={page.ctaLabel ?? t("cta")} topic={page.contactTopic} />}
    </article>
  );
}
