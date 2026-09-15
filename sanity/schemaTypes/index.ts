import type { SchemaTypeDefinition } from "sanity";
import { seo } from "./objects/seo";
import { figure, portableText, quote } from "./objects/portableText";
import { caseType } from "./case";
import { serviceType } from "./service";
import { pageType, processStep } from "./page";
import { homeType } from "./home";
import { faqType } from "./faq";
import { siteSettingsType } from "./siteSettings";
import { seedMetaType } from "./seedMeta";

/** Alle Dokument- und Objekttypen. Neue Typen hier registrieren. */
export const schemaTypes: SchemaTypeDefinition[] = [
  // Objekte
  seo, portableText, figure, quote, processStep,
  // Dokumente
  homeType, caseType, serviceType, pageType, faqType, siteSettingsType,
  // Technisch (Seed-Skript), nicht in der Studio-Struktur
  seedMetaType,
];

/** Dokumenttypen, die pro Sprache existieren (document-internationalization) */
export const localizedTypes = ["home", "case", "service", "page", "faq", "siteSettings"];
