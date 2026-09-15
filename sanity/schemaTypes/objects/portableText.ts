import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Rich Text (Portable Text). Bewusst schmal gehalten: Absätze, Zwischentitel, Listen,
 * Links, Bild mit Legende, Zitat. Keine Farben, keine freie Formatierung –
 * die Gestaltung kommt aus den Komponenten (components/portable-text).
 */
export const portableText = defineType({
  name: "portableText",
  title: "Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Absatz", value: "normal" },
        { title: "Zwischentitel", value: "h2" },
        { title: "Untertitel", value: "h3" },
      ],
      lists: [{ title: "Aufzählung", value: "bullet" }],
      marks: {
        decorators: [{ title: "Betont", value: "strong" }],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({ name: "href", type: "url", title: "URL", validation: (r) => r.uri({ scheme: ["http", "https", "mailto"] }) }),
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Interner Link",
            fields: [defineField({ name: "reference", type: "reference", to: [{ type: "case" }, { type: "service" }, { type: "page" }] })],
          },
        ],
      },
    }),
    defineArrayMember({ type: "figure" }),
    defineArrayMember({ type: "quote" }),
  ],
});

/** Bild mit Pflicht-Legende: Bild, Aufgabe, Beitrag (Briefing Kap. 8.9) */
export const figure = defineType({
  name: "figure",
  title: "Bild mit Legende",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", title: "Bild", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", type: "string", title: "Alternativtext", description: "Beschreibt, was zu sehen ist – für Screenreader und Suchmaschinen.", validation: (r) => r.required() }),
    defineField({ name: "caption", type: "string", title: "Legende", description: "Was gezeigt wird und welcher Beitrag dahintersteht.", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "caption", media: "image" } },
});

/** Kundenstimme: nennt die gelöste Aufgabe, keine Adjektive (Briefing Kap. 6.3) */
export const quote = defineType({
  name: "quote",
  title: "Zitat",
  type: "object",
  fields: [
    defineField({ name: "text", type: "text", title: "Zitat", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", title: "Name", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", title: "Funktion" }),
    defineField({ name: "company", type: "string", title: "Unternehmen" }),
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});
