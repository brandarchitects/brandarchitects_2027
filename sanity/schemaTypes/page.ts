import { defineField, defineType } from "sanity";

/**
 * Freie Seite: Standortbestimmung, Zusammenarbeit, Über uns, Impressum, Datenschutz.
 * Die Startseite hat ein eigenes Dokument (home), weil ihre Modulfolge fix ist.
 */
export const pageType = defineType({
  name: "page",
  title: "Seite",
  type: "document",
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "title", title: "Titel (H1)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL-Name", type: "slug", options: { source: "title" }, validation: (r) => r.required(), description: "standortbestimmung, zusammenarbeit, ueber-uns, impressum, datenschutz" }),
    defineField({ name: "intro", title: "Einleitung", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Inhalt", type: "portableText" }),
    defineField({ name: "steps", title: "Prozessschritte (optional)", type: "array", of: [{ type: "processStep" }] }),
    defineField({ name: "faqs", title: "FAQ (optional)", type: "array", of: [{ type: "reference", to: [{ type: "faq" }] }] }),
    defineField({ name: "ctaLabel", title: "CTA-Text", type: "string" }),
    defineField({ name: "contactTopic", title: "Kontakt-Vorbelegung", type: "string", options: { list: ["brand", "web", "ai", "assessment", "open"] } }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

/** Prozessschritt: Verstehen · Entscheiden · Gestalten · Einführen (Briefing Kap. 8.3, Modul 6) */
export const processStep = defineType({
  name: "processStep",
  title: "Prozessschritt",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Schritt", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Beschreibung", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "clientInvolvement", title: "Mitwirkung des Kunden", type: "string" }),
  ],
});
