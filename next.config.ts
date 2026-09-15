import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * next.config.ts
 * - next-intl Plugin: bindet i18n/request.ts ein (Locale-Auflösung pro Request)
 * - trailingSlash: alle URLs enden mit "/", passend zur Sitemap im Briefing (Kap. 8.2)
 * - images: Sanity-CDN freigeben (Bilder werden über next/image optimiert)
 * - redirects: alte URLs der bisherigen Website – EINZELN eintragen, mit Kommentar
 *   (Inventar: docs/REDIRECTS.md). Kein Pauschal-Redirect auf die Startseite.
 */
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Beispiel – vor Go-Live durch das echte Inventar ersetzen:
      // { source: "/portfolio", destination: "/arbeiten/", permanent: true }, // alte Übersichtsseite
    ];
  },
};

export default withNextIntl(nextConfig);
