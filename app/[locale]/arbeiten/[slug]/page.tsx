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
 * Fallseite. Struktur verbindlich (Briefing Kap. 6.5):
 * Situation → offene Frage → eigener Auftrag → Entscheid → bewahrt → sichtbare Anwendung → belegtes Ergebnis → Rolle und Partner.
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
    ogImageFallback: item.heroImage?.image?.asset ? urlFor(item.heroImage.image).width(1200).height(630).url() : undefined });
}

export default async function CasePage({ params }: PageProps<"/[locale]/arbeiten/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [item, t, tn] = await Promise.all([getCase(locale as Locale, slug), getTranslations("work"), getTranslations("nav")]);
  if (!item) notFound();
  const url = `${SITE_URL}/arbeiten/${slug}/`;

  const sections: [string, string | undefined][] = [
    ["Situation", item.situation], ["Offene Frage", item.question], ["Auftrag", item.assignment],
    ["Entscheid", item.decision], ["Was bewusst blieb", item.preserved],
  ];

  return (
    <article className="mx-auto max-w-7xl px-6 py-section">
      <p className="text-muted">{item.client}</p>
      <h1 className="mt-2 max-w-4xl text-4xl font-semibold md:text-5xl">{item.task}</h1>
      <p className="mt-4 max-w-measure text-lg">{item.contribution}</p>
      <div className="mt-12"><FigureImage figure={item.heroImage} priority /></div>

      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr]">
        <dl className="text-muted">
          <dt className="font-semibold text-ink">{t("role")}</dt><dd>{item.role}</dd>
          <dt className="mt-4 font-semibold text-ink">{t("year")}</dt><dd>{item.year}</dd>
          <dt className="mt-4 font-semibold text-ink">{t("origin")}</dt><dd>{item.origin === "brand-architects" ? t("originBrandArchitects") : `${t("originFormerAgency")}: ${item.formerAgency}`}</dd>
          {item.partners?.length ? <><dt className="mt-4 font-semibold text-ink">{t("partners")}</dt><dd>{item.partners.join(", ")}</dd></> : null}
        </dl>
        <div>
          {sections.map(([h, text]) => text && <section key={h} className="mt-8 first:mt-0"><h2 className="text-2xl font-semibold">{h}</h2><p className="mt-3 max-w-measure">{text}</p></section>)}
          <section className="mt-8"><h2 className="text-2xl font-semibold">Anwendung</h2><PortableTextRenderer value={item.application} /></section>
          {item.result && <section className="mt-8"><h2 className="text-2xl font-semibold">Ergebnis</h2><p className="mt-3 max-w-measure">{item.result}</p></section>}
          {item.quote && <div className="mt-12"><QuoteBlock quote={item.quote} /></div>}
        </div>
      </div>

      {item.relatedCase && <section className="mt-section"><h2 className="text-2xl font-semibold">{t("related")}</h2><div className="mt-8 max-w-xl"><ProjectCard item={item.relatedCase} /></div></section>}
      <ContactClose title="Was steht bei Ihrem Unternehmen an?" label={tn("cta")} topic={item.contactTopic} />

      <CaseJsonLd title={item.task} client={item.client} url={url} description={item.contribution} year={item.year}
        image={item.heroImage?.image?.asset ? urlFor(item.heroImage.image).width(1200).url() : undefined} />
      <BreadcrumbJsonLd items={[{ name: tn("work"), url: `${SITE_URL}/arbeiten/` }, { name: item.client, url }]} />
    </article>
  );
}
