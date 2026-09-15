import { defineField, defineType } from "sanity";

/**
 * Leistungsbereich. Textmechanik verbindlich (Briefing Kap. 8.4):
 * Für wen · Typische Auslöser · Sie erhalten · Was es von Ihnen braucht · Passender Case · CTA.
 * Vier Dokumente: Markenstrategie & Positionierung, Corporate Design & Rebranding,
 * Digital Branding & Webdesign, KI für Branding & Marketing.
 */
export const serviceType = defineType({
  name: "service",
  title: "Leistung",
  type: "document",
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL-Name", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "teaser", title: "Kurztext (Startseite / Übersicht)", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "forWhom", title: "Für wen", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "triggers", title: "Typische Auslöser", type: "array", of: [{ type: "string" }], validation: (r) => r.min(1) }),
    defineField({ name: "youGet", title: "Sie erhalten", type: "portableText", validation: (r) => r.required() }),
    defineField({ name: "whatItTakes", title: "Was es von Ihnen braucht", type: "portableText" }),
    defineField({ name: "questions", title: "Fragen auf der Seite", type: "array", of: [{ type: "reference", to: [{ type: "faq" }] }] }),
    defineField({ name: "cases", title: "Passende Cases", type: "array", of: [{ type: "reference", to: [{ type: "case" }] }] }),
    defineField({ name: "ctaLabel", title: "CTA-Text", type: "string", initialValue: "Projekt besprechen" }),
    defineField({ name: "contactTopic", title: "Kontakt-Vorbelegung", type: "string", options: { list: ["brand", "web", "ai", "assessment", "open"] }, initialValue: "brand" }),
    defineField({ name: "order", title: "Reihenfolge", type: "number" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Reihenfolge", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
