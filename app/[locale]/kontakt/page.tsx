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
 * Komposition: Formular ab Spalte 4 in Lesebreite; Ansprechpartner, E-Mail und Adresse rechts als Ledger.
 * Vorbelegung eines Interessenfelds über ?thema=brand|web|ai|assessment|open (Briefing Kap. 8.7).
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
  const [settings, page, t, tn] = await Promise.all([getSiteSettings(locale as Locale), getPage(locale as Locale, "kontakt"), getTranslations("contact"), getTranslations("nav")]);
  const thema = typeof sp.thema === "string" ? sp.thema : undefined;
  const status = typeof sp.status === "string" ? sp.status : undefined;

  return (
    <section className="site pt-[clamp(3rem,2rem+4vw,6rem)] pb-[var(--spacing-section)]">
      <header className="grid-12">
        <div className="col-span-12 md:col-span-3"><span className="label text-muted">{tn("cta")}</span></div>
        <div className="col-span-12 md:col-span-9">
          <h1 className="h1 max-w-[16ch]">{page?.title ?? t("closeTitle")}</h1>
          {page?.intro && <p className="lead mt-8 max-w-[var(--max-width-measure)] text-muted">{page.intro}</p>}
        </div>
      </header>
      <div className="grid-12 mt-[var(--spacing-section)]">
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <ContactForm initialTopic={thema} initialStatus={status} />
          {page?.body?.length ? <div className="mt-[var(--spacing-group)]"><PortableTextRenderer value={page.body} /></div> : null}
        </div>
        <aside className="col-span-12 md:col-span-3 md:col-start-10">
          <dl className="rule-strong pt-4">
            <dt className="label text-muted">{t("contactPersonLabel")}</dt>
            <dd className="mt-2">{settings.contactPerson}</dd>
            {settings.email && <><dt className="label mt-6 text-muted">{t("email")}</dt><dd className="mt-2"><a href={`mailto:${settings.email}`} className="link" data-track="email_click">{settings.email}</a></dd></>}
            <dt className="label mt-6 text-muted">{t("addressLabel")}</dt>
            <dd className="mt-2"><address className="not-italic">{settings.companyName}<br />{settings.street && <>{settings.street}<br /></>}{settings.zip} {settings.city}</address></dd>
          </dl>
        </aside>
      </div>
    </section>
  );
}
