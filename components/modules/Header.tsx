import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MobileNav } from "./MobileNav";

/**
 * Modul 1: Header mit Desktop- und Mobilnavigation.
 * Navigation: Arbeiten · Leistungen · Zusammenarbeit · Über uns · Projekt besprechen (Briefing Kap. 8.2).
 * Sprachschalter: wird eingeblendet, sobald i18n/routing.ts mehr als eine Sprache kennt (siehe MobileNav/LanguageSwitch).
 */
export function Header({ brandName }: { brandName: string }) {
  const t = useTranslations("nav");
  const items = [
    { href: "/arbeiten/", label: t("work") },
    { href: "/leistungen/", label: t("services") },
    { href: "/zusammenarbeit/", label: t("collaboration") },
    { href: "/ueber-uns/", label: t("about") },
  ] as const;

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-semibold">{brandName}</Link>
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 md:flex">
          {items.map((i) => (
            <Link key={i.href} href={i.href}>{i.label}</Link>
          ))}
          <Link href="/kontakt/" className="rounded-full border border-ink px-4 py-2">{t("cta")}</Link>
        </nav>
        {/* TODO Sprache 2: <LanguageSwitch /> hier einfügen, sobald routing.locales.length > 1 (docs/I18N.md Schritt 5) */}
        <MobileNav items={[...items, { href: "/kontakt/", label: t("cta") }]} openLabel={t("menuOpen")} closeLabel={t("menuClose")} />
      </div>
    </header>
  );
}
