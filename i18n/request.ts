import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Lädt pro Request die UI-Texte (messages/<locale>.json).
 * Inhalte (Cases, Leistungen, Seiten) kommen NICHT von hier, sondern aus Sanity (lib/content).
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Europe/Zurich",
  };
});
