import { defineField, defineType } from "sanity";

/**
 * SEO-Felder, an jedes Dokument mit eigener URL angehängt.
 * Title/Description-Vorgaben: docs/briefings/briefing-3-1.md Kap. 8.10 und docs/briefings/struktur-1-3.md Kap. 8.
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Seitentitel (Title-Tag)",
      type: "string",
      description: "50–60 Zeichen. Leer = Dokumenttitel + «– Brand Architects».",
      validation: (r) => r.max(70).warning("Über 60 Zeichen wird in Google abgeschnitten."),
    }),
    defineField({
      name: "description",
      title: "Meta-Description",
      type: "text",
      rows: 3,
      description: "120–160 Zeichen. Konkreter Nutzen, keine Sperrlisten-Begriffe.",
      validation: (r) => r.max(170).warning("Über 160 Zeichen wird abgeschnitten."),
    }),
    defineField({
      name: "ogImage",
      title: "Vorschaubild (Social/LLM)",
      type: "image",
      description: "1200×630. Leer = Standardbild aus den Website-Einstellungen.",
    }),
    defineField({
      name: "noIndex",
      title: "Von Suchmaschinen ausschliessen",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
