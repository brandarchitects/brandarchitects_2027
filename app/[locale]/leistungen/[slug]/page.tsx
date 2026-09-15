import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getService, getServiceSlugs, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { FaqJsonLd } from "@/lib/seo/jsonld";
import { Link } from "@/i18n/navigation";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { Faq } from "@/components/modules/Faq";
import { ContactClose } from "@/components/modules/ContactClose";

/**
 * Leistungsseite. Textmechanik (Briefing 3.1 Kap. 8.4): Für wen · Auslöser · Sie erhalten · Was es braucht · Case · Fragen · CTA.
 * H1 = Käuferfrage (headline, Struktur 1.3 Kap. 5.3), Bereichsname bleibt für Navigation und Karten.
 * Markenbereiche (contactTopic «brand») verweisen zusätzlich auf die Standortbestimmung als möglichen Einstieg.
 */
export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) for (const slug of await getServiceSlugs(locale)) params.push({ locale, slug });
  return params;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/leistungen/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const [settings, item] = await Promise.all([getSiteSettings(locale as Locale), getService(locale as Locale, slug)]);
  if (!item) return {};
  return buildMetadata({ locale: locale as Locale, path: `/leistungen/${slug}/`, title: item.title, seo: { description: item.teaser, ...item.seo }, settings });
}

export default async function ServicePage({ params }: PageProps<"/[locale]/leistungen/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [item, tn, ts, tc] = await Promise.all([getService(locale as Locale, slug), getTranslations("nav"), getTranslations("services"), getTranslations("contact")]);
  if (!item) notFound();
  return (
    <article className="mx-auto max-w-7xl px-6 py-section">
      {item.headline && <p className="text-muted">{item.title}</p>}
      <h1 className="mt-2 max-w-4xl text-4xl font-semibold md:text-5xl">{item.headline ?? item.title}</h1>
      <p className="mt-6 max-w-measure text-lg">{item.forWhom}</p>
      {item.triggers?.length ? <section className="mt-12"><h2 className="text-2xl font-semibold">{ts("sections.triggers")}</h2><ul className="mt-4 max-w-measure list-disc pl-6">{item.triggers.map((x) => <li key={x}>{x}</li>)}</ul></section> : null}
      <section className="mt-12"><h2 className="text-2xl font-semibold">{ts("sections.youGet")}</h2><PortableTextRenderer value={item.youGet} /></section>
      {item.whatItTakes?.length ? <section className="mt-12"><h2 className="text-2xl font-semibold">{ts("sections.whatItTakes")}</h2><PortableTextRenderer value={item.whatItTakes} /></section> : null}
      {item.cases?.length ? <section className="mt-section"><h2 className="text-2xl font-semibold">{ts("sections.cases")}</h2><div className="mt-8 grid gap-12 md:grid-cols-2">{item.cases.map((c) => <ProjectCard key={c._id} item={c} />)}</div></section> : null}
      {item.questions?.length ? <div className="mt-section"><Faq items={item.questions} /><FaqJsonLd faqs={item.questions} /></div> : null}
      {item.contactTopic === "brand" && <p className="mt-12"><Link href="/standortbestimmung/" className="underline">{ts("assessmentLink")}</Link></p>}
      <ContactClose title={tc("closeTitle")} label={item.ctaLabel ?? tn("cta")} topic={item.contactTopic} />
    </article>
  );
}
