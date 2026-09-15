import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCaseSlugs, getServiceSlugs } from "@/lib/content";
import { SITE_URL } from "@/lib/seo/jsonld";

/** XML-Sitemap unter /sitemap.xml – alle Sprachen, alle Seiten mit hreflang-Alternativen. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["/", "/arbeiten/", "/leistungen/", "/standortbestimmung/", "/zusammenarbeit/", "/ueber-uns/", "/kontakt/", "/impressum/", "/datenschutz/"];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    const cases = (await getCaseSlugs(locale)).map((s) => `/arbeiten/${s}/`);
    const services = (await getServiceSlugs(locale)).map((s) => `/leistungen/${s}/`);
    for (const path of [...staticPaths, ...cases, ...services]) {
      entries.push({ url: `${SITE_URL}${prefix}${path}`, lastModified: new Date(), changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : path.startsWith("/arbeiten/") || path.startsWith("/leistungen/") ? 0.8 : 0.5 });
    }
  }
  return entries;
}
