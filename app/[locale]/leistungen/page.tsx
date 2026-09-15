import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getPage, getServices, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { ServiceModule } from "@/components/modules/ServiceModule";
import { ContactClose } from "@/components/modules/ContactClose";

/**
 * Leistungsübersicht (Briefing 3.1 Kap. 8.2, Struktur 1.3 Kap. 5.3):
 * Einführung → drei Bereiche + KI → Standortbestimmung als Einstieg → Kontaktabschluss.
 * Redaktionelle Texte aus dem page-Dokument mit Slug «leistungen»; der Inhalt (body) trägt den Standortbestimmungs-Absatz.
 */
export async function generateMetadata({ params }: PageProps<"/[locale]/leistungen">): Promise<Metadata> {
  const { locale } = await params;
  const [settings, page] = await Promise.all([getSiteSettings(locale as Locale), getPage(locale as Locale, "leistungen")]);
  return buildMetadata({ locale: locale as Locale, path: "/leistungen/", title: page?.seo?.title ?? `Markenstrategie, Design und digitale Auftritte – ${settings.brandName}`, seo: { description: page?.intro, ...page?.seo }, settings });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/leistungen">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const [services, page, tn, ts, tc] = await Promise.all([getServices(l), getPage(l, "leistungen"), getTranslations("nav"), getTranslations("services"), getTranslations("contact")]);
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-section">
        <h1 className="max-w-4xl text-4xl font-semibold md:text-5xl">{page?.title ?? tn("services")}</h1>
        {page?.intro && <p className="mt-6 max-w-measure text-lg">{page.intro}</p>}
        <div className="mt-12 grid gap-10 md:grid-cols-2">{services.map((s) => <ServiceModule key={s._id} title={s.title} text={s.teaser} href={`/leistungen/${s.slug}/`} />)}</div>
        {page?.body?.length ? (
          <div className="mt-section">
            <PortableTextRenderer value={page.body} />
            <Link href="/standortbestimmung/" className="mt-8 inline-block rounded-full border border-ink px-5 py-3">{ts("assessmentLink")}</Link>
          </div>
        ) : null}
      </section>
      <ContactClose title={page?.ctaTitle ?? tc("closeTitle")} label={page?.ctaLabel ?? tn("cta")} topic={page?.contactTopic} />
    </>
  );
}
