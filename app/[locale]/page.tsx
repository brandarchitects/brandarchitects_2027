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
 * Startseite – acht Module in fester Reihenfolge (Briefing Kap. 8.3).
 * Inhalte aus dem Dokument "home"; Cases und Leistungen automatisch.
 */
export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const [settings, home] = await Promise.all([getSiteSettings(locale as Locale), getHome(locale as Locale)]);
  return buildMetadata({ locale: locale as Locale, path: "/", title: settings.defaultSeo?.title ?? settings.brandName, seo: home?.seo ?? settings.defaultSeo, settings });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const [home, cases, services, t, tn] = await Promise.all([getHome(l), getFeaturedCases(l), getServices(l), getTranslations("home"), getTranslations("nav")]);

  if (!home) return <EmptyState />;

  return (
    <>
      <Hero kicker={home.heroKicker} headline={home.heroHeadline} text={home.heroText} image={home.heroImage}
        primary={{ href: "/kontakt/", label: tn("cta") }} secondary={{ href: "/arbeiten/", label: t("viewWork") }} />

      {cases.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-section">
          {home.workTitle && <h2 className="text-3xl font-semibold">{home.workTitle}</h2>}
          <div className="mt-10 grid gap-12 md:grid-cols-2">{cases.map((c) => <ProjectCard key={c._id} item={c} />)}</div>
        </section>
      )}

      {home.situations?.length ? (
        <section className="mx-auto max-w-7xl px-6 py-section">
          <h2 className="text-3xl font-semibold">{home.situationsTitle}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {home.situations.map((s) => <div key={s.title}><h3 className="font-semibold">{s.title}</h3><p className="mt-2 text-muted">{s.text}</p></div>)}
          </div>
        </section>
      ) : null}

      {services.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-section">
          <div className="grid gap-10 md:grid-cols-3">
            {services.filter((s) => s.slug !== "ki-branding-marketing").map((s) => <ServiceModule key={s._id} title={s.title} text={s.teaser} href={`/leistungen/${s.slug}/`} />)}
          </div>
          {home.aiLine && <p className="mt-10 max-w-measure"><Link href="/leistungen/ki-branding-marketing/">{home.aiLine}</Link></p>}
        </section>
      )}

      {home.assessmentTitle && (
        <section className="mx-auto max-w-7xl px-6 py-section">
          <h2 className="text-3xl font-semibold">{home.assessmentTitle}</h2>
          <p className="mt-4 max-w-measure text-muted">{home.assessmentText}</p>
          <Link href="/standortbestimmung/" className="mt-8 inline-block rounded-full border border-ink px-5 py-3">{t("viewAssessment")}</Link>
        </section>
      )}

      {home.steps?.length ? (
        <section className="mx-auto max-w-7xl px-6 py-section">
          <h2 className="text-3xl font-semibold">{home.collaborationTitle}</h2>
          <p className="mt-4 max-w-measure text-muted">{home.collaborationText}</p>
          <div className="mt-10"><ProcessSteps steps={home.steps} /></div>
          {home.timeframe && <p className="mt-10 max-w-measure text-muted">{home.timeframe}</p>}
        </section>
      ) : null}

      {home.agencyText && (
        <section className="mx-auto max-w-7xl px-6 py-section"><p className="max-w-measure text-xl">{home.agencyText}</p></section>
      )}

      {home.contactTitle && <ContactClose title={home.contactTitle} text={home.contactText} label={tn("cta")} />}
    </>
  );
}

/** Erscheint nur, solange Sanity nicht konfiguriert oder die Startseite nicht angelegt ist. */
function EmptyState() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-section">
      <h1 className="text-3xl font-semibold">Rohbau</h1>
      <p className="mt-4 max-w-measure text-muted">Sanity ist noch nicht verbunden oder das Dokument «Startseite» fehlt. Anleitung: docs/SANITY.md.</p>
    </section>
  );
}
