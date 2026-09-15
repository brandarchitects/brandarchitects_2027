import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { SiteSettings } from "@/lib/content/types";

/**
 * Modul 10: Footer – Agenturname, Leistungseinordnung, Adresse, E-Mail, Hauptseiten, Standortbestimmung,
 * Impressum, Datenschutz, LinkedIn (Briefing Kap. 8.2). Steht auf Tinte und bildet mit dem Kontaktabschluss
 * den dunklen Schluss jeder Seite (docs/design-spec.md, zweiter Signaturzug).
 */
export function Footer({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  return (
    <footer className="on-ink bg-ink text-paper">
      <div className="site grid-12 border-t border-paper/20 py-14 md:py-20">
        <div className="col-span-12 md:col-span-5">
          <p className="wordmark">{settings.brandName}<i aria-hidden="true">.</i></p>
          <p className="mt-2 text-paper/70">{settings.tagline}</p>
          <address className="mt-8 not-italic text-paper/70">
            {settings.companyName}<br />
            {settings.street && <>{settings.street}<br /></>}
            {settings.zip} {settings.city}
          </address>
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="link mt-3 block" data-track="email_click">{settings.email}</a>
          )}
        </div>
        <nav aria-label="Footer" className="col-span-6 flex flex-col gap-3 md:col-span-3 md:col-start-7">
          <Link href="/arbeiten/" className="link">{n("work")}</Link>
          <Link href="/leistungen/" className="link">{n("services")}</Link>
          <Link href="/standortbestimmung/" className="link">{t("assessment")}</Link>
          <Link href="/zusammenarbeit/" className="link">{n("collaboration")}</Link>
          <Link href="/ueber-uns/" className="link">{n("about")}</Link>
          <Link href="/kontakt/" className="link">{n("cta")}</Link>
        </nav>
        <div className="col-span-6 flex flex-col gap-3 md:col-span-3">
          <Link href="/impressum/" className="link">{t("imprint")}</Link>
          <Link href="/datenschutz/" className="link">{t("privacy")}</Link>
          {settings.linkedin && <a href={settings.linkedin} rel="noopener" className="link">{t("linkedin")}</a>}
        </div>
      </div>
    </footer>
  );
}
