import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getService, getServiceSlugs, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { FaqJsonLd } from "@/lib/seo/jsonld";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { Faq } from "@/components/modules/Faq";
import { ContactClose } from "@/components/modules/ContactClose";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Leistungsseite. Textmechanik (Briefing 3.1 Kap. 8.4): Für wen · Auslöser · Sie erhalten · Was es braucht · Case · Fragen · CTA.
 * H1 = Käuferfrage (headline, Struktur 1.3 Kap. 5.3), Bereichsname als Label darüber.
 * Komposition: Abschnitte als Zeilen mit Label links und Inhalt rechts – dieselbe Zweiteilung wie die Fallseite.
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

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid-12 rule py-8 md:py-10">
      <h2 className="label col-span-12 pt-1 text-muted md:col-span-3">{label}</h2>
      <div className="col-span-12 md:col-span-9">{children}</div>
    </section>
  );
}

export default async function ServicePage({ params }: PageProps<"/[locale]/leistungen/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [item, settings, tn, ts, tc] = await Promise.all([getService(locale as Locale, slug), getSiteSettings(locale as Locale), getTranslations("nav"), getTranslations("services"), getTranslations("contact")]);
  if (!item) notFound();
  return (
    <>
      <article className="site pt-[clamp(3rem,2rem+4vw,6rem)]">
        <header className="grid-12">
          <div className="col-span-12 md:col-span-3"><span className="label text-muted">{item.title}</span></div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="h1 max-w-[16ch]">{item.headline ?? item.title}</h1>
            <p className="lead mt-8 max-w-[var(--max-width-measure)]">{item.forWhom}</p>
          </div>
        </header>

        <div className="mt-[var(--spacing-section)]">
          {item.triggers?.length ? (
            <Row label={ts("sections.triggers")}>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {item.triggers.map((x, i) => (
                  <li key={x} className="flex items-baseline gap-4"><span className="index-sm text-muted" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><span className="text-[1.125rem]">{x}</span></li>
                ))}
              </ul>
            </Row>
          ) : null}
          <Row label={ts("sections.youGet")}><PortableTextRenderer value={item.youGet} /></Row>
          {item.whatItTakes?.length ? <Row label={ts("sections.whatItTakes")}><PortableTextRenderer value={item.whatItTakes} /></Row> : null}
          {item.cases?.length ? (
            <Row label={ts("sections.cases")}>
              <div className="grid gap-12 md:grid-cols-2">{item.cases.map((c) => <ProjectCard key={c._id} item={c} />)}</div>
            </Row>
          ) : null}
        </div>

        {item.questions?.length ? (
          <div className="grid-12 mt-[var(--spacing-section)]">
            <div className="col-span-12 md:col-span-9 md:col-start-4"><Faq items={item.questions} /><FaqJsonLd faqs={item.questions} /></div>
          </div>
        ) : null}
        {item.contactTopic === "brand" && (
          <div className="grid-12 mt-12"><div className="col-span-12 md:col-span-9 md:col-start-4"><Link href="/standortbestimmung/" className="btn">{ts("assessmentLink")}<Arrow /></Link></div></div>
        )}
      </article>
      <ContactClose title={tc("closeTitle")} label={item.ctaLabel ?? tn("cta")} topic={item.contactTopic} email={settings.email || undefined} />
    </>
  );
}
