import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPage, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "@/components/forms/ContactForm";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";

/**
 * Kontakt (Struktur 1.3 Kap. 5.7): Einführung → Formular und direkte E-Mail → Erwartung an das erste Gespräch → Geschäftsadresse.
 * H1, Einführung und der Text «Erwartung an das erste Gespräch» (body) kommen aus dem page-Dokument mit Slug «kontakt».
 * Interessenfelder als Mehrfachauswahl (ADR-009); Vorbelegung eines Feldes über ?thema=brand|web|ai|assessment|open (Briefing Kap. 8.7).
 */
export async function generateMetadata({ params }: PageProps<"/[locale]/kontakt">): Promise<Metadata> {
  const { locale } = await params;
  const [settings, page] = await Promise.all([getSiteSettings(locale as Locale), getPage(locale as Locale, "kontakt")]);
  return buildMetadata({ locale: locale as Locale, path: "/kontakt/", title: page?.seo?.title ?? `Projekt besprechen – ${settings.brandName}`, seo: { description: page?.intro, ...page?.seo }, settings });
}

export default async function ContactPage({ params, searchParams }: PageProps<"/[locale]/kontakt">) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const [settings, page, t] = await Promise.all([getSiteSettings(locale as Locale), getPage(locale as Locale, "kontakt"), getTranslations("contact")]);
  const thema = typeof sp.thema === "string" ? sp.thema : undefined;
  const status = typeof sp.status === "string" ? sp.status : undefined;

  return (
    <section className="mx-auto max-w-7xl px-6 py-section">
      <h1 className="max-w-4xl text-4xl font-semibold md:text-5xl">{page?.title ?? t("closeTitle")}</h1>
      {page?.intro && <p className="mt-6 max-w-measure text-lg">{page.intro}</p>}
      <div className="mt-12 grid gap-16 md:grid-cols-[2fr_1fr]">
        <div>
          <ContactForm initialTopic={thema} initialStatus={status} />
          {page?.body?.length ? <div className="mt-section"><PortableTextRenderer value={page.body} /></div> : null}
        </div>
        <aside className="text-muted">
          <p>{t("contactPersonLabel")}: {settings.contactPerson}</p>
          {settings.email && <p className="mt-2"><a href={`mailto:${settings.email}`} className="text-ink" data-track="email_click">{settings.email}</a></p>}
          <address className="mt-6 not-italic">{settings.companyName}<br />{settings.street && <>{settings.street}<br /></>}{settings.zip} {settings.city}</address>
        </aside>
      </div>
    </section>
  );
}
