import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import type { Locale } from "@/i18n/routing";
import * as q from "./queries";
import type { Case, CaseSummary, Faq, Home, Page, Service, SiteSettings } from "./types";

export type * from "./types";

/**
 * Öffentliche Inhalts-API. Templates greifen NUR über diese Funktionen auf Inhalte zu.
 *
 * Caching: Alle Abfragen sind nach Typ getaggt. Sanity ruft nach jedem Publish den Webhook
 * app/api/revalidate auf, der die Tags invalidiert (ISR ohne Zeitintervall → schont das
 * Sanity-Free-Kontingent). Ohne Sanity-Konfiguration liefern die Funktionen leer/null,
 * damit das Repo auch vor dem Sanity-Setup baut.
 */
async function fetchContent<T>(query: string, params: Record<string, unknown>, tags: string[]): Promise<T | null> {
  // Design-Demo ohne Sanity: dieselben Abfragen über die Seed-Daten plus gekennzeichnete Platzhalter-Cases
  // (lib/content/mock.ts). Aktiv lokal mit CONTENT_MOCK=1 und auf allen Vercel-Preview-Deploys (Branches).
  // Production liest immer Sanity. Entscheid Pascal: Design zuerst an Demo-Inhalten beurteilen (ADR-015).
  if (process.env.CONTENT_MOCK === "1" || (process.env.VERCEL_ENV === "preview" && process.env.CONTENT_MOCK !== "0")) return (await import("./mock")).mockFetch<T>(query, params);
  if (!isSanityConfigured) return null;
  return client.fetch<T>(query, params, { next: { tags } });
}

const FALLBACK_SETTINGS: SiteSettings = {
  companyName: "Brand Architects Design GmbH",
  brandName: "Brand Architects",
  tagline: "Markenberatung und Design – Aargau und Zürich",
  zip: "5436",
  city: "Würenlos",
  email: "",
  contactPerson: "Pascal Frey",
  areaServed: ["Aargau", "Zürich"],
};

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  return (await fetchContent<SiteSettings>(q.siteSettingsQuery, { locale }, ["siteSettings"])) ?? FALLBACK_SETTINGS;
}

export const getHome = (locale: Locale) => fetchContent<Home>(q.homeQuery, { locale }, ["home", "case", "service"]);
export const getFeaturedCases = async (locale: Locale) => (await fetchContent<CaseSummary[]>(q.featuredCasesQuery, { locale }, ["case"])) ?? [];
export const getCases = async (locale: Locale) => (await fetchContent<CaseSummary[]>(q.allCasesQuery, { locale }, ["case"])) ?? [];
export const getCase = (locale: Locale, slug: string) => fetchContent<Case>(q.caseBySlugQuery, { locale, slug }, ["case"]);
export const getCaseSlugs = async (locale: Locale) => (await fetchContent<string[]>(q.caseSlugsQuery, { locale }, ["case"])) ?? [];
export const getServices = async (locale: Locale) => (await fetchContent<Pick<Service, "_id" | "title" | "teaser" | "slug" | "contactTopic">[]>(q.allServicesQuery, { locale }, ["service"])) ?? [];
export const getService = (locale: Locale, slug: string) => fetchContent<Service>(q.serviceBySlugQuery, { locale, slug }, ["service", "case", "faq"]);
export const getServiceSlugs = async (locale: Locale) => (await fetchContent<string[]>(q.serviceSlugsQuery, { locale }, ["service"])) ?? [];
export const getPage = (locale: Locale, slug: string) => fetchContent<Page>(q.pageBySlugQuery, { locale, slug }, ["page", "faq"]);
export const getFaqs = async (locale: Locale) => (await fetchContent<Faq[]>(q.allFaqsQuery, { locale }, ["faq"])) ?? [];
