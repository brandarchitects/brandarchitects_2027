import { defineField, defineType } from "sanity";

/**
 * Startseite – acht Module in fester Reihenfolge (Briefing Kap. 8.3).
 * Die Texte sind hier editierbar, die Reihenfolge nicht (bewusst).
 * Cases: automatisch alle mit featured=true, sortiert nach order (max. 2).
 * Leistungen: automatisch alle service-Dokumente nach order.
 */
export const homeType = defineType({
  name: "home",
  title: "Startseite",
  type: "document",
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "heroKicker", title: "Hero – Einordnung", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heroHeadline", title: "Hero – Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heroText", title: "Hero – Erklärung", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "heroImage", title: "Hero – Projektausschnitt (optional)", type: "figure" }),
    defineField({ name: "workTitle", title: "Modul 2 – Titel", type: "string" }),
    defineField({ name: "stats", title: "Zahlenzeile (nur belegbare Grössen)", type: "array", validation: (r) => r.max(3), of: [{ type: "object", fields: [defineField({ name: "value", type: "number", title: "Zahl" }), defineField({ name: "suffix", type: "string", title: "Zusatz (z. B. +)" }), defineField({ name: "label", type: "string", title: "Bezeichnung" })] }] }),
    defineField({ name: "situationsTitle", title: "Modul 3 – Titel", type: "string" }),
    defineField({ name: "situations", title: "Modul 3 – Drei Situationen", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string", title: "Situation" }), defineField({ name: "text", type: "text", rows: 2, title: "Text" })] }], validation: (r) => r.max(3) }),
    defineField({ name: "servicesTitle", title: "Modul 4 – Titel", type: "string" }),
    defineField({ name: "aiLine", title: "Modul 4 – KI-Zeile", type: "text", rows: 2 }),
    defineField({ name: "assessmentTitle", title: "Modul 5 – Titel", type: "string" }),
    defineField({ name: "assessmentText", title: "Modul 5 – Text", type: "text", rows: 3 }),
    defineField({ name: "assessmentNote", title: "Modul 5 – Hinweis (vergüteter Auftrag)", type: "string", description: "Pflichtinformation laut Struktur-Briefing: Der Besucher erkennt, dass es ein vergüteter Auftrag mit schriftlichem Ergebnis ist." }),
    defineField({ name: "collaborationTitle", title: "Modul 6 – Titel", type: "string" }),
    defineField({ name: "collaborationText", title: "Modul 6 – Text", type: "text", rows: 3 }),
    defineField({ name: "steps", title: "Modul 6 – Vier Schritte", type: "array", of: [{ type: "processStep" }], validation: (r) => r.max(4) }),
    defineField({ name: "timeframe", title: "Modul 6 – Zeitrahmen", type: "text", rows: 2 }),
    defineField({ name: "agencyTitle", title: "Modul 7 – Titel", type: "string" }),
    defineField({ name: "agencyText", title: "Modul 7 – Agentur", type: "text", rows: 4 }),
    defineField({ name: "contactTitle", title: "Modul 8 – Titel", type: "string" }),
    defineField({ name: "contactText", title: "Modul 8 – Text", type: "text", rows: 3 }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Startseite" }) },
});
