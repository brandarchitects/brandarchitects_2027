import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getFeaturedCases, getHome, getServices, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { Hero } from "@/components/modules/Hero";
import { ProjectCard } from "@/components/modules/ProjectCard";
import { ServiceModule } from "@/components/modules/ServiceModule";
import { ProcessSteps } from "@/components/modules/ProcessSteps";
import { ContactClose } from "@/components/modules/ContactClose";

/**
 * Startseite – acht Module in fester Reihenfolge (Briefing 3.1 Kap. 8.3, Struktur 1.3 Kap. 4).
 * Inhalte aus dem Dokument "home"; Cases und Leistungen automatisch. Jedes Modul trägt seine
 * weiterführende Aktion (Struktur-Briefing): Alle Arbeiten · Leistungen ansehen · Standortbestimmung ansehen · So arbeiten wir · Über uns.
 */
export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const [settings, home] = await Promise.all([getSiteSettings(locale as Locale), getHome(locale as Locale)]);
  return buildMetadata({ locale: locale as Locale, path: "/", title: settings.defaultSeo?.title ?? settings.brandName, seo: home?.seo ?? settings.defaultSeo, settings });
}

const linkStyle = "mt-8 inline-block rounded-full border border-ink px-5 py-3";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const [home, cases, services, settings, t, tn, te] = await Promise.all([
    getHome(l), getFeaturedCases(l), getServices(l), getSiteSettings(l), getTranslations("home"), getTranslations("nav"), getTranslations("empty"),
  ]);

  if (!home) return <EmptyState title={te("title")} text={te("text")} />;

  return (
    <>
      {/* Modul 1 – «Arbeiten ansehen» springt zum Projektmodul, sobald es eines gibt (Struktur 1.3 Modul 1) */}
      <Hero kicker={home.heroKicker} headline={home.heroHeadline} text={home.heroText} image={home.heroImage}
        primary={{ href: "/kontakt/", label: tn("cta") }} secondary={{ href: cases.length > 0 ? "#arbeiten" : "/arbeiten/", label: t("viewWork") }} />

      {/* Modul 2 */}
      {cases.length > 0 && (
        <section id="arbeiten" className="mx-auto max-w-7xl px-6 py-section">
          {home.workTitle && <h2 className="text-3xl font-semibold">{home.workTitle}</h2>}
          <div className="mt-10 grid gap-12 md:grid-cols-2">{cases.map((c) => <ProjectCard key={c._id} item={c} />)}</div>
          <Link href="/arbeiten/" className={linkStyle}>{t("allWork")}</Link>
        </section>
      )}

      {/* Modul 3 */}
      {home.situations?.length ? (
        <section className="mx-auto max-w-7xl px-6 py-section">
          <h2 className="text-3xl font-semibold">{home.situationsTitle}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {home.situations.map((s) => <div key={s.title}><h3 className="font-semibold">{s.title}</h3><p className="mt-2 text-muted">{s.text}</p></div>)}
          </div>
        </section>
      ) : null}

      {/* Modul 4 – drei Bereiche + KI-Zeile */}
      {services.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-section">
          {home.servicesTitle && <h2 className="text-3xl font-semibold">{home.servicesTitle}</h2>}
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {services.filter((s) => s.slug !== "ki-branding-marketing").map((s) => <ServiceModule key={s._id} title={s.title} text={s.teaser} href={`/leistungen/${s.slug}/`} />)}
          </div>
          {home.aiLine && <p className="mt-10 max-w-measure"><Link href="/leistungen/ki-branding-marketing/">{home.aiLine}</Link></p>}
          <Link href="/leistungen/" className={linkStyle}>{t("viewServices")}</Link>
        </section>
      )}

      {/* Modul 5 – Standortbestimmung; Hinweis auf vergüteten Auftrag ist Pflicht (Struktur 1.3) */}
      {home.assessmentTitle && (
        <section className="mx-auto max-w-7xl px-6 py-section">
          <h2 className="text-3xl font-semibold">{home.assessmentTitle}</h2>
          <p className="mt-4 max-w-measure text-muted">{home.assessmentText}</p>
          {home.assessmentNote && <p className="mt-3 max-w-measure text-sm text-muted">{home.assessmentNote}</p>}
          <Link href="/standortbestimmung/" className={linkStyle}>{t("viewAssessment")}</Link>
        </section>
      )}

      {/* Modul 6 */}
      {home.steps?.length ? (
        <section className="mx-auto max-w-7xl px-6 py-section">
          <h2 className="text-3xl font-semibold">{home.collaborationTitle}</h2>
          <p className="mt-4 max-w-measure text-muted">{home.collaborationText}</p>
          <div className="mt-10"><ProcessSteps steps={home.steps} /></div>
          {home.timeframe && <p className="mt-10 max-w-measure text-muted">{home.timeframe}</p>}
          <Link href="/zusammenarbeit/" className={linkStyle}>{t("howWeWork")}</Link>
        </section>
      ) : null}

      {/* Modul 7 */}
      {home.agencyText && (
        <section className="mx-auto max-w-7xl px-6 py-section">
          {home.agencyTitle && <h2 className="text-3xl font-semibold">{home.agencyTitle}</h2>}
          <p className="mt-4 max-w-measure text-xl">{home.agencyText}</p>
          <Link href="/ueber-uns/" className={linkStyle}>{t("about")}</Link>
        </section>
      )}

      {/* Modul 8 – ein CTA plus direkte E-Mail als gleichwertiger Weg */}
      {home.contactTitle && <ContactClose title={home.contactTitle} text={home.contactText} label={tn("cta")} email={settings.email || undefined} />}
    </>
  );
}

/** Erscheint nur, solange Sanity nicht konfiguriert oder die Startseite nicht angelegt ist. */
function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-section">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-4 max-w-measure text-muted">{text}</p>
    </section>
  );
}
