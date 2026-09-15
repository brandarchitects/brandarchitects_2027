import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/jsonld";

/**
 * robots.txt. Entscheid (docs/SEO.md): KI-Crawler dürfen die Website lesen – die Inhalte sollen
 * in KI-Antworten auftauchen (LLM-Sichtbarkeit). Studio und API bleiben ausgeschlossen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
