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
import { SectionHead } from "@/components/ui/SectionHead";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Startseite – acht Module in fester Reihenfolge (Briefing 3.1 Kap. 8.3, Struktur 1.3 Kap. 4).
 * Komposition (docs/design-spec.md): Register-Köpfe mit schmaler Ziffer geben den Takt; die Module wechseln
 * die Form – zwei asymmetrische Projektkarten, drei Situationen als Zeilen, Leistungen als typografischer Index,
 * die Standortbestimmung auf zweiter Papierfläche, der Kontakt auf Tinte. Keine drei gleichen Karten.
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
  const [home, cases, services, settings, t, tn, te] = await Promise.all([
    getHome(l), getFeaturedCases(l), getServices(l), getSiteSettings(l), getTranslations("home"), getTranslations("nav"), getTranslations("empty"),
  ]);

  if (!home) return <EmptyState title={te("title")} text={te("text")} />;

  const mainServices = services.filter((s) => s.slug !== "ki-branding-marketing");
  const ai = services.find((s) => s.slug === "ki-branding-marketing");
  const gap = "mt-[var(--spacing-section)]";

  return (
    <>
      {/* Modul 1 – «Arbeiten ansehen» springt zum Projektmodul, sobald es eines gibt (Struktur 1.3 Modul 1) */}
      <Hero kicker={home.heroKicker} headline={home.heroHeadline} text={home.heroText} image={home.heroImage}
        primary={{ href: "/kontakt/", label: tn("cta") }} secondary={{ href: cases.length > 0 ? "#arbeiten" : "/arbeiten/", label: t("viewWork") }} />

      {/* Modul 2 – zwei Karten, asymmetrisch: 7 + 5 Spalten, die zweite rückt nach unten */}
      {cases.length > 0 && (
        <section id="arbeiten" className="site scroll-mt-24">
          <SectionHead index="01" label={t("labels.work")} title={home.workTitle} />
          <div className="grid-12 mt-[var(--spacing-group)] gap-y-16">
            {cases.map((c, i) => (
              <div key={c._id} className={i === 0 ? "col-span-12 md:col-span-7" : "col-span-12 md:col-span-5 md:mt-24"}>
                <ProjectCard item={c} priority={i === 0} />
              </div>
            ))}
          </div>
          <Link href="/arbeiten/" className="btn mt-12">{t("allWork")}<Arrow /></Link>
        </section>
      )}

      {/* Modul 3 – drei Situationen als Zeilen mit Haarlinien, Titel links */}
      {home.situations?.length ? (
        <section className={`site ${gap}`}>
          <SectionHead index="02" label={t("labels.situations")} title={home.situationsTitle} />
          <ol className="grid-12 mt-[var(--spacing-group)]">
            {home.situations.map((s, i) => (
              <li key={s.title} className="rule col-span-12 grid gap-2 py-6 md:col-span-4 md:col-start-auto md:py-8">
                <span className="index-sm text-muted" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3 mt-3">{s.title}</h3>
                <p className="text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* Modul 4 – Leistungen als Index: drei Zeilen plus die ergänzende KI-Zeile */}
      {services.length > 0 && (
        <section className={`site ${gap}`}>
          <SectionHead index="03" label={t("labels.services")} title={home.servicesTitle} />
          <div className="mt-[var(--spacing-group)] border-b border-line">
            {mainServices.map((s, i) => <ServiceModule key={s._id} index={String(i + 1).padStart(2, "0")} title={s.title} text={s.teaser} href={`/leistungen/${s.slug}/`} />)}
            {ai && home.aiLine && <ServiceModule index="+" title={ai.title} text={home.aiLine.replace(/^KI für Branding & Marketing:\s*/, "")} href="/leistungen/ki-branding-marketing/" note={t("labels.complementary")} tone="muted" />}
          </div>
          <Link href="/leistungen/" className="btn mt-12">{t("viewServices")}<Arrow /></Link>
        </section>
      )}

      {/* Modul 5 – Standortbestimmung auf zweiter Papierfläche; Hinweis auf vergüteten Auftrag ist Pflicht (Struktur 1.3) */}
      {home.assessmentTitle && (
        <section className={`${gap} bg-paper-2`}>
          <div className="site grid-12 py-[var(--spacing-section)]">
            <div className="col-span-12 md:col-span-3"><span className="label text-muted">{t("labels.assessment")}</span></div>
            <div className="col-span-12 md:col-span-7">
              <h2 className="h1">{home.assessmentTitle}</h2>
              <p className="lead mt-8 max-w-[var(--max-width-measure)]">{home.assessmentText}</p>
              {home.assessmentNote && <p className="rule mt-8 max-w-[var(--max-width-measure)] pt-3 body-sm text-muted">{home.assessmentNote}</p>}
              <Link href="/standortbestimmung/" className="btn btn-ink mt-10">{t("viewAssessment")}<Arrow /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Modul 6 – Zusammenarbeit: Titel und Text links, vier Schritte als Ledger */}
      {home.steps?.length ? (
        <section className={`site ${gap}`}>
          <SectionHead index="04" label={t("labels.collaboration")} title={home.collaborationTitle}>
            <p className="lead mt-6 max-w-[var(--max-width-measure)] text-muted">{home.collaborationText}</p>
          </SectionHead>
          <div className="mt-[var(--spacing-group)]"><ProcessSteps steps={home.steps} /></div>
          <div className="grid-12 mt-12 items-end">
            {home.timeframe && <p className="col-span-12 max-w-[var(--max-width-measure)] text-muted md:col-span-7">{home.timeframe}</p>}
            <div className="col-span-12 md:col-span-4 md:col-start-9 md:justify-self-end"><Link href="/zusammenarbeit/" className="btn">{t("howWeWork")}<Arrow /></Link></div>
          </div>
        </section>
      ) : null}

      {/* Modul 7 – Agentur: eine grosse Aussage, kein Teambild */}
      {home.agencyText && (
        <section className={`site ${gap}`}>
          <SectionHead index="05" label={t("labels.agency")} title={home.agencyTitle} />
          <div className="grid-12 mt-[var(--spacing-group)]">
            <p className="h2 col-span-12 font-medium md:col-span-10" style={{ fontVariationSettings: '"wdth" 100' }}>{home.agencyText}</p>
            <div className="col-span-12 mt-4"><Link href="/ueber-uns/" className="btn">{t("about")}<Arrow /></Link></div>
          </div>
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
    <section className="site py-[var(--spacing-section)]">
      <h1 className="h1">{title}</h1>
      <p className="mt-4 max-w-[var(--max-width-measure)] text-muted">{text}</p>
    </section>
  );
}
