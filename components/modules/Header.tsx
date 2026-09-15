import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MobileNav } from "./MobileNav";

/**
 * Modul 1: Header mit Desktop- und Mobilnavigation. Bleibt oben stehen (sticky), Haarlinie unten.
 * Navigation: Arbeiten · Leistungen · Zusammenarbeit · Über uns · Projekt besprechen (Briefing Kap. 8.2).
 * Wortmarke: provisorisch typografisch (Archivo, breit), bis das Logo (SVG) vorliegt – docs/design-spec.md.
 * Sprachschalter: wird eingeblendet, sobald i18n/routing.ts mehr als eine Sprache kennt (docs/I18N.md Schritt 5).
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="site flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link href="/" className="wordmark">{brandName}</Link>
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 md:flex">
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="navlink">{i.label}</Link>
          ))}
          <Link href="/kontakt/" className="btn btn-ink ml-2 min-h-10 px-4 py-2">{t("cta")}</Link>
        </nav>
        {/* TODO Sprache 2: <LanguageSwitch /> hier einfügen, sobald routing.locales.length > 1 (docs/I18N.md Schritt 5) */}
        <MobileNav items={[...items, { href: "/kontakt/", label: t("cta") }]} openLabel={t("menuOpen")} closeLabel={t("menuClose")} />
      </div>
    </header>
  );
}
