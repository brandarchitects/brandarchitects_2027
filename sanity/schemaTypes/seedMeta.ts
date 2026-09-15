import { defineField, defineType } from "sanity";

/**
 * Technisches Dokument des Seed-Skripts (scripts/seed.ts): merkt sich pro geseedetem Dokument die _rev nach dem
 * letzten Lauf. So erkennt der Seed beim nächsten Build, ob ein Dokument im Studio bearbeitet wurde, und lässt es
 * dann in Ruhe. Nicht in der Studio-Struktur gelistet; nicht von Hand bearbeiten.
 */
export const seedMetaType = defineType({
  name: "seedMeta",
  title: "Seed-Status (technisch)",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "revs", title: "Versionen", type: "object", fields: [defineField({ name: "placeholder", type: "string", hidden: true })], options: { collapsed: true } }),
  ],
  preview: { prepare: () => ({ title: "Seed-Status (technisch)" }) },
});
