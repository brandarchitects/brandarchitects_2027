import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

import { routing, localeTags } from "@/i18n/routing";
import { getSiteSettings } from "@/lib/content";
import { Header } from "@/components/modules/Header";
import { Footer } from "@/components/modules/Footer";
import { SkipLink } from "@/components/modules/SkipLink";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { OrganizationJsonLd, SITE_URL } from "@/lib/seo/jsonld";
import "../globals.css";

/**
 * Root-Layout pro Sprache. Setzt <html lang>, lädt UI-Texte, Header/Footer und globale Schema.org-Daten.
 * Schrift: Archivo Variable (OFL-1.1, app/fonts/), selbst gehostet über next/font/local – keine Fremdserver.
 * Beide Achsen (wght 100–900, wdth 62–125) in einer Datei; die Breite steuern die Utilities in globals.css.
 */
const brand = localFont({
  src: [
    { path: "../fonts/archivo-variable.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/archivo-variable-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-brand",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

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
    <html lang={localeTags[locale]} className={`${brand.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <NextIntlClientProvider>
          <SkipLink />
          <Header brandName={settings.brandName} />
          <main id="main" className="flex-1">{children}</main>
          <Footer settings={settings} />
          <MotionLayer />
        </NextIntlClientProvider>
        <OrganizationJsonLd settings={settings} />
        <Analytics />
      </body>
    </html>
  );
}
