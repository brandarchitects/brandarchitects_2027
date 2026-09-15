import { defineField, defineType } from "sanity";

/**
 * Website-Einstellungen (ein Dokument pro Sprache): Firmendaten, Kontakt, Standard-SEO.
 * Speist Footer, Kontaktseite, Impressum-Grunddaten und Schema.org (Organization/ProfessionalService).
 */
export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "companyName", title: "Firmenname", type: "string", initialValue: "Brand Architects Design GmbH" }),
    defineField({ name: "brandName", title: "Markenname", type: "string", initialValue: "Brand Architects" }),
    defineField({ name: "tagline", title: "Leistungseinordnung (Footer, Schema)", type: "string", initialValue: "Markenberatung und Design – Aargau und Zürich" }),
    defineField({ name: "street", title: "Strasse", type: "string" }),
    defineField({ name: "zip", title: "PLZ", type: "string", initialValue: "5436" }),
    defineField({ name: "city", title: "Ort", type: "string", initialValue: "Würenlos" }),
    defineField({ name: "email", title: "E-Mail", type: "string" }),
    defineField({ name: "phone", title: "Telefon (optional)", type: "string" }),
    defineField({ name: "contactPerson", title: "Ansprechpartner", type: "string", initialValue: "Pascal Frey" }),
    defineField({ name: "linkedin", title: "LinkedIn-URL (Agentur)", type: "url" }),
    defineField({ name: "areaServed", title: "Einzugsgebiet (Schema.org areaServed)", type: "array", of: [{ type: "string" }], initialValue: ["Aargau", "Zürich"] }),
    defineField({ name: "defaultSeo", title: "Standard-SEO", type: "seo" }),
    defineField({ name: "llmSummary", title: "Kurzbeschreibung für llms.txt", type: "text", rows: 4, description: "Zwei bis vier Sätze in natürlicher Sprache: Wer wir sind, für wen, was wir liefern. Wird unter /llms.txt ausgegeben." }),
  ],
  preview: { prepare: () => ({ title: "Website-Einstellungen" }) },
});
