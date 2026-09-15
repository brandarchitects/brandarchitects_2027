import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { SiteSettings } from "@/lib/content/types";

/** Modul 10: Footer – Agenturname, Leistungseinordnung, Adresse, E-Mail, Hauptseiten, Standortbestimmung, Impressum, Datenschutz, LinkedIn. */
export function Footer({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  return (
    <footer className="mt-section border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-semibold">{settings.brandName}</p>
          <p className="text-muted">{settings.tagline}</p>
          <address className="mt-4 not-italic text-muted">
            {settings.companyName}<br />
            {settings.street && <>{settings.street}<br /></>}
            {settings.zip} {settings.city}
          </address>
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="mt-2 block" data-track="email_click">{settings.email}</a>
          )}
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2">
          <Link href="/arbeiten/">{n("work")}</Link>
          <Link href="/leistungen/">{n("services")}</Link>
          <Link href="/standortbestimmung/">{t("assessment")}</Link>
          <Link href="/zusammenarbeit/">{n("collaboration")}</Link>
          <Link href="/ueber-uns/">{n("about")}</Link>
          <Link href="/kontakt/">{n("cta")}</Link>
        </nav>
        <div className="flex flex-col gap-2">
          <Link href="/impressum/">{t("imprint")}</Link>
          <Link href="/datenschutz/">{t("privacy")}</Link>
          {settings.linkedin && <a href={settings.linkedin} rel="noopener">{t("linkedin")}</a>}
        </div>
      </div>
    </footer>
  );
}
