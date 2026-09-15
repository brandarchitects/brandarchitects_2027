import { defineField, defineType } from "sanity";

/** FAQ-Eintrag. Erscheint auf /zusammenarbeit/ (FAQPage-Schema) und optional auf Leistungsseiten. */
export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "question", title: "Frage", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Antwort", type: "text", rows: 4, validation: (r) => r.required(), description: "Reiner Text – wird auch als strukturierte Daten (FAQPage) ausgegeben." }),
    defineField({ name: "order", title: "Reihenfolge", type: "number" }),
  ],
  orderings: [{ title: "Reihenfolge", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question" } },
});
