import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getPage, getServices, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { ServiceModule } from "@/components/modules/ServiceModule";
import { ContactClose } from "@/components/modules/ContactClose";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Leistungsübersicht (Briefing 3.1 Kap. 8.2, Struktur 1.3 Kap. 5.3):
 * Einführung → drei Bereiche + KI als Index → Standortbestimmung als Einstieg (zweite Papierfläche) → Kontaktabschluss.
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
  const [services, page, settings, tn, ts, tc, th] = await Promise.all([getServices(l), getPage(l, "leistungen"), getSiteSettings(l), getTranslations("nav"), getTranslations("services"), getTranslations("contact"), getTranslations("home")]);
  const main = services.filter((s) => s.slug !== "ki-branding-marketing");
  const ai = services.find((s) => s.slug === "ki-branding-marketing");
  return (
    <>
      <section className="site pt-[clamp(3rem,2rem+4vw,6rem)]">
        <header className="grid-12">
          <div className="col-span-12 md:col-span-3"><span className="label text-muted">{tn("services")}</span></div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="h1 max-w-[16ch]">{page?.title ?? tn("services")}</h1>
            {page?.intro && <p className="lead mt-8 max-w-[var(--max-width-measure)] text-muted">{page.intro}</p>}
          </div>
        </header>
        <div className="mt-[var(--spacing-section)] border-b border-line" data-reveal>
          {main.map((s, i) => <ServiceModule key={s._id} index={String(i + 1).padStart(2, "0")} title={s.title} text={s.teaser} href={`/leistungen/${s.slug}/`} />)}
          {ai && <ServiceModule index="+" title={ai.title} text={ai.teaser} href={`/leistungen/${ai.slug}/`} note={th("labels.complementary")} tone="muted" />}
        </div>
      </section>
      {page?.body?.length ? (
        <section className="mt-[var(--spacing-section)] bg-paper-2">
          <div className="site grid-12 py-[var(--spacing-section)]">
            <div className="col-span-12 md:col-span-3"><span className="label text-muted">{th("labels.assessment")}</span></div>
            <div className="col-span-12 md:col-span-8">
              <PortableTextRenderer value={page.body} />
              <Link href="/standortbestimmung/" className="btn btn-ink mt-10">{ts("assessmentLink")}<Arrow /></Link>
            </div>
          </div>
        </section>
      ) : null}
      <ContactClose title={page?.ctaTitle ?? tc("closeTitle")} label={page?.ctaLabel ?? tn("cta")} topic={page?.contactTopic} email={settings.email || undefined} />
    </>
  );
}
