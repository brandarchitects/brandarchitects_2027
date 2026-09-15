import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

import { routing, localeTags } from "@/i18n/routing";
import { getSiteSettings } from "@/lib/content";
import { Header } from "@/components/modules/Header";
import { Footer } from "@/components/modules/Footer";
import { SkipLink } from "@/components/modules/SkipLink";
import { OrganizationJsonLd, SITE_URL } from "@/lib/seo/jsonld";
import "../globals.css";

/**
 * Root-Layout pro Sprache. Setzt <html lang>, lädt UI-Texte, Header/Footer und globale Schema.org-Daten.
 * Schrift: bis Phase 3 System-Schrift. Dann next/font/local mit den lizenzierten Dateien in public/fonts (siehe docs/DESIGN-TODO in docs/PHASES.md).
 */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const settings = await getSiteSettings(locale);

  return (
    <html lang={localeTags[locale]} className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <NextIntlClientProvider>
          <SkipLink />
          <Header brandName={settings.brandName} />
          <main id="main" className="flex-1">{children}</main>
          <Footer settings={settings} />
        </NextIntlClientProvider>
        <OrganizationJsonLd settings={settings} />
        <Analytics />
      </body>
    </html>
  );
}
