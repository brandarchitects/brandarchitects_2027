import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getCase, getCaseSlugs, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, CaseJsonLd, SITE_URL } from "@/lib/seo/jsonld";
import { urlFor } from "@/sanity/lib/image";
import { FigureImage } from "@/components/modules/FigureImage";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { QuoteBlock } from "@/components/modules/QuoteBlock";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { ContactClose } from "@/components/modules/ContactClose";

/**
 * Fallseite. Struktur verbindlich (Briefing Kap. 6.5, Struktur 1.3 Kap. 5.2):
 * Kopf (Kunde, Aufgabe als H1, Beitrag, Hauptbild) → Rollenblock direkt sichtbar → Situation → offene Frage →
 * Auftrag → Entscheid → bewahrt → Anwendung → Ergebnis → verwandter Fall → Kontakt.
 * Komposition: Rollenblock als vierspaltiger Ledger unter dem Bild; Erzählung zweispaltig mit Label links.
 */
export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) for (const slug of await getCaseSlugs(locale)) params.push({ locale, slug });
  return params;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/arbeiten/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const [settings, item] = await Promise.all([getSiteSettings(locale as Locale), getCase(locale as Locale, slug)]);
  if (!item) return {};
  return buildMetadata({ locale: locale as Locale, path: `/arbeiten/${slug}/`, title: `${item.client}: ${item.task}`, seo: { description: item.contribution, ...item.seo }, settings,
    ogImageFallback: item.heroImage?.image?.asset && !item.heroImage.image.asset.url?.startsWith("/") ? urlFor(item.heroImage.image).width(1200).height(630).url() : undefined });
}

export default async function CasePage({ params }: PageProps<"/[locale]/arbeiten/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [item, settings, t, tn, tc] = await Promise.all([getCase(locale as Locale, slug), getSiteSettings(locale as Locale), getTranslations("work"), getTranslations("nav"), getTranslations("contact")]);
  if (!item) notFound();
  const url = `${SITE_URL}/arbeiten/${slug}/`;
  const origin = item.origin === "brand-architects" ? t("originBrandArchitects") : `${t("originFormerAgency")}: ${item.formerAgency}`;

  const sections: [string, string | undefined][] = [
    [t("sections.situation"), item.situation], [t("sections.question"), item.question], [t("sections.assignment"), item.assignment],
    [t("sections.decision"), item.decision], [t("sections.preserved"), item.preserved],
  ];
  const facts: [string, string | undefined][] = [[t("origin"), origin], [t("year"), item.year], [t("role"), item.role], [t("partners"), item.partners?.join(", ")]];

  return (
    <>
      <article className="site pt-[clamp(3rem,2rem+4vw,6rem)]">
        <header className="grid-12">
          <div className="col-span-12 md:col-span-3"><span className="label text-muted">{item.client}</span></div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="h1 max-w-[16ch]">{item.task}</h1>
            <p className="lead mt-8 max-w-[var(--max-width-measure)] text-muted">{item.contribution}</p>
          </div>
        </header>
        <div className="mt-[var(--spacing-group)]"><FigureImage figure={item.heroImage} priority /></div>

        {/* Rollenblock: Herkunft, Jahr, Rolle, Partner – direkt sichtbar, nicht im Seitenende (Struktur 1.3 Kap. 5.2) */}
        <dl className="grid-12 rule-strong mt-[var(--spacing-group)] gap-y-6 pt-5">
          {facts.filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="col-span-6 md:col-span-3"><dt className="label text-muted">{k}</dt><dd className="mt-2">{v}</dd></div>
          ))}
        </dl>

        {/* Erzählung: Label links, Text rechts – dieselbe Zweiteilung wie Seitenkopf und Leistungsseite */}
        <div className="mt-[var(--spacing-section)]">
          {sections.map(([h, text]) => text && (
            <section key={h} data-reveal className="grid-12 rule py-8 md:py-10">
              <h2 className="label col-span-12 pt-1 text-muted md:col-span-3">{h}</h2>
              <p className="col-span-12 max-w-[var(--max-width-measure)] text-[1.125rem] leading-[1.5] md:col-span-8">{text}</p>
            </section>
          ))}
          {item.application?.length ? (
            <section className="grid-12 rule py-8 md:py-10">
              <h2 className="label col-span-12 pt-1 text-muted md:col-span-3">{t("sections.application")}</h2>
              <div className="col-span-12 md:col-span-9"><PortableTextRenderer value={item.application} wide /></div>
            </section>
          ) : null}
          {item.result && (
            <section className="grid-12 rule py-8 md:py-10">
              <h2 className="label col-span-12 pt-1 text-muted md:col-span-3">{t("sections.result")}</h2>
              <p className="col-span-12 max-w-[var(--max-width-measure)] text-[1.125rem] leading-[1.5] md:col-span-8">{item.result}</p>
            </section>
          )}
          {item.quote && (
            <div className="grid-12 py-8 md:py-10"><div className="col-span-12 md:col-span-8 md:col-start-4"><QuoteBlock quote={item.quote} /></div></div>
          )}
        </div>

        {item.relatedCase && (
          <section className="mt-[var(--spacing-group)]">
            <div className="rule-strong pt-5"><h2 className="label text-muted">{t("related")}</h2></div>
            <div className="grid-12 mt-8"><div className="col-span-12 md:col-span-6"><ProjectCard item={item.relatedCase} /></div></div>
          </section>
        )}

        <CaseJsonLd title={item.task} client={item.client} url={url} description={item.contribution} year={item.year}
          image={item.heroImage?.image?.asset && !item.heroImage.image.asset.url?.startsWith("/") ? urlFor(item.heroImage.image).width(1200).url() : undefined} />
        <BreadcrumbJsonLd items={[{ name: tn("work"), url: `${SITE_URL}/arbeiten/` }, { name: item.client, url }]} />
      </article>
      <ContactClose title={tc("closeTitle")} label={t("ctaSimilar")} topic={item.contactTopic} email={settings.email || undefined} />
    </>
  );
}
