import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import type { Seo, SiteSettings } from "@/lib/content/types";
import { urlFor } from "@/sanity/lib/image";
import { SITE_URL } from "./jsonld";

/**
 * Baut die Next.js-Metadata einer Seite: Title, Description, Canonical, hreflang, Open Graph.
 * `path` ohne Locale-Präfix und mit Trailing Slash, z. B. "/arbeiten/geberit/".
 * hreflang/alternates werden automatisch für alle aktiven Sprachen erzeugt (i18n/routing.ts).
 */
export function buildMetadata({ locale, path, title, seo, settings, ogImageFallback }: {
  locale: Locale;
  path: string;
  title: string;
  seo?: Seo;
  settings: SiteSettings;
  ogImageFallback?: string;
}): Metadata {
  const suffix = ` – ${settings.brandName}`;
  const fullTitle = seo?.title ?? (title.endsWith(settings.brandName) ? title : `${title}${suffix}`);
  const description = seo?.description ?? settings.defaultSeo?.description ?? settings.tagline;
  const ogImage = seo?.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : ogImageFallback ?? `${SITE_URL}/opengraph-image`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    const prefix = l === routing.defaultLocale ? "" : `/${l}`;
    languages[l === "de" ? "de-CH" : l] = `${SITE_URL}${prefix}${path}`;
  }
  const canonical = languages[locale === "de" ? "de-CH" : locale];

  return {
    title: fullTitle,
    description,
    alternates: { canonical, languages: { ...languages, "x-default": `${SITE_URL}${path}` } },
    openGraph: { title: fullTitle, description, url: canonical, siteName: settings.brandName, locale: "de_CH", type: "website", images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
    robots: seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
