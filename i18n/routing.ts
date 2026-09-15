import { defineRouting } from "next-intl/routing";

/**
 * Zentrale Sprach-Konfiguration.
 *
 * Zweite Sprache aktivieren (z. B. Englisch):
 *   1. "en" zu `locales` hinzufügen
 *   2. messages/en.json anlegen (Kopie von de.json, übersetzen)
 *   3. Im Sanity Studio die Dokumente übersetzen (Übersetzungs-Menü pro Dokument)
 *   4. Sprachschalter im Header einblenden (components/modules/Header.tsx, bereits vorbereitet)
 * Mehr dazu: docs/I18N.md
 *
 * localePrefix "as-needed": die Standardsprache läuft ohne Präfix (brandarchitects.ch/arbeiten/),
 * weitere Sprachen mit Präfix (brandarchitects.ch/en/work/ – Pfadübersetzung siehe `pathnames`).
 */
export const routing = defineRouting({
  locales: ["de"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  // Übersetzte Pfade – erst mit Sprache 2 befüllen, z. B.:
  // pathnames: { "/arbeiten": { de: "/arbeiten", en: "/work" } }
});

export type Locale = (typeof routing.locales)[number];

/** Für <html lang> und Schema.org */
export const localeTags: Record<Locale, string> = {
  de: "de-CH",
};
