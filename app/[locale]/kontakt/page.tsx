import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * Kontakt: Einführung → Formular und direkte E-Mail → Erwartung an das erste Gespräch → Geschäftsadresse.
 * Interessenfelder als Mehrfachauswahl (ADR-009); Vorbelegung eines Feldes über ?thema=brand|web|ai|assessment|open (Briefing Kap. 8.7).
 */
export async function generateMetadata({ params }: PageProps<"/[locale]/kontakt">): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings(locale as Locale);
  return buildMetadata({ locale: locale as Locale, path: "/kontakt/", title: `Projekt besprechen – ${settings.brandName}`, settings });
}

export default async function ContactPage({ params, searchParams }: PageProps<"/[locale]/kontakt">) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const [settings, t] = await Promise.all([getSiteSettings(locale as Locale), getTranslations("contact")]);
  const thema = typeof sp.thema === "string" ? sp.thema : undefined;
  const status = typeof sp.status === "string" ? sp.status : undefined;

  return (
    <section className="mx-auto max-w-7xl px-6 py-section">
      <h1 className="text-4xl font-semibold md:text-5xl">Was steht bei Ihrem Unternehmen an?</h1>
      <p className="mt-6 max-w-measure text-lg">Beschreiben Sie kurz Ihre Aufgabe. Wir melden uns, um die Ausgangslage und einen sinnvollen nächsten Schritt zu besprechen.</p>
      <div className="mt-12 grid gap-16 md:grid-cols-[2fr_1fr]">
        <ContactForm initialTopic={thema} initialStatus={status} />
        <aside className="text-muted">
          {settings.email && <p>{settings.contactPerson}<br /><a href={`mailto:${settings.email}`} className="text-ink" data-track="email_click">{settings.email}</a></p>}
          <address className="mt-6 not-italic">{settings.companyName}<br />{settings.street && <>{settings.street}<br /></>}{settings.zip} {settings.city}</address>
          <p className="sr-only">{t("privacyNote")}</p>
        </aside>
      </div>
    </section>
  );
}
