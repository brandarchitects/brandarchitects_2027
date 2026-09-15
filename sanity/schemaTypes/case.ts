import { defineField, defineType } from "sanity";

/**
 * Case (Arbeit). Struktur verbindlich aus docs/briefings/briefing-3-1.md Kap. 6.4/6.5:
 * Situation → offene Frage → eigener Auftrag → Entscheid → bewahrt → Anwendung → Ergebnis → Rolle und Partner.
 * Ein Dokument speist Projektkarte, Startseiten-Auswahl und Fallseite.
 */
export const caseType = defineType({
  name: "case",
  title: "Arbeit (Case)",
  type: "document",
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "meta", title: "Rolle & Herkunft" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "title", title: "Titel", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL-Name", type: "slug", group: "content", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "client", title: "Kunde", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "task", title: "Aufgabe (Kurzfassung für Karte)", type: "string", group: "content", description: "Ein Satz: Welche Aufgabe hinter dem Auftritt stand.", validation: (r) => r.required().max(160) }),
    defineField({ name: "contribution", title: "Beitrag von Brand Architects (Kurzfassung)", type: "string", group: "content", validation: (r) => r.required().max(160) }),
    defineField({ name: "heroImage", title: "Hauptbild (tatsächliche Anwendung)", type: "figure", group: "content", validation: (r) => r.required() }),

    defineField({ name: "situation", title: "Situation", type: "text", rows: 4, group: "content", validation: (r) => r.required() }),
    defineField({ name: "question", title: "Offene Frage", type: "text", rows: 3, group: "content", validation: (r) => r.required() }),
    defineField({ name: "assignment", title: "Eigener Auftrag", type: "text", rows: 3, group: "content", validation: (r) => r.required() }),
    defineField({ name: "decision", title: "Entscheid", type: "text", rows: 4, group: "content", validation: (r) => r.required() }),
    defineField({ name: "preserved", title: "Was bewusst beibehalten wurde – und weshalb", type: "text", rows: 3, group: "content", validation: (r) => r.required() }),
    defineField({ name: "application", title: "Sichtbare Anwendung", type: "portableText", group: "content", description: "Text und Bilder mit Legende." }),
    defineField({ name: "result", title: "Belegtes Ergebnis", type: "text", rows: 3, group: "content", description: "Zahlen nur mit sauberer Zuordnung; sonst qualitativ." }),
    defineField({ name: "quote", title: "Kundenstimme (optional)", type: "quote", group: "content" }),

    defineField({ name: "origin", title: "Herkunft", type: "string", group: "meta", options: { list: [{ title: "Brand Architects", value: "brand-architects" }, { title: "Frühere Agentur", value: "former-agency" }], layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "formerAgency", title: "Damalige Agentur", type: "string", group: "meta", hidden: ({ document }) => document?.origin !== "former-agency", validation: (r) => r.custom((v, ctx) => (ctx.document?.origin === "former-agency" && !v ? "Pflicht bei früherer Agentur" : true)) }),
    defineField({ name: "year", title: "Jahr / Zeitraum", type: "string", group: "meta", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Tatsächliche Rolle", type: "string", group: "meta", validation: (r) => r.required() }),
    defineField({ name: "partners", title: "Projektpartner / weitere Credits", type: "array", of: [{ type: "string" }], group: "meta" }),
    defineField({ name: "services", title: "Leistungsbereiche", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }], group: "meta", validation: (r) => r.min(1) }),
    defineField({ name: "materialCleared", title: "Materialnutzung geklärt", type: "boolean", group: "meta", initialValue: false, validation: (r) => r.custom((v) => (v ? true : "Ohne geklärte Materialnutzung nicht veröffentlichen.")) }),
    defineField({ name: "featured", title: "Auf der Startseite zeigen", type: "boolean", group: "meta", initialValue: false }),
    defineField({ name: "order", title: "Reihenfolge", type: "number", group: "meta", description: "Kleinere Zahl = weiter vorne." }),
    defineField({ name: "contactTopic", title: "Kontakt-Vorbelegung", type: "string", group: "meta", options: { list: ["brand", "web", "ai", "assessment", "open"] }, initialValue: "brand" }),
    defineField({ name: "relatedCase", title: "Verwandter Case", type: "reference", to: [{ type: "case" }], group: "meta" }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Reihenfolge", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "client", subtitle: "task", media: "heroImage.image", featured: "featured" },
    prepare: ({ title, subtitle, media, featured }) => ({ title: featured ? `★ ${title}` : title, subtitle, media }),
  },
});
