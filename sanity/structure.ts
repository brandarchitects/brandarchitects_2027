import type { StructureResolver } from "sanity/structure";

/**
 * Aufbau des Studios (linke Spalte). Singletons (Startseite, Einstellungen) oben,
 * dann Listen. Reihenfolge = Bedeutung für die Redaktion.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalt")
    .items([
      S.listItem().title("Startseite").child(S.documentTypeList("home").title("Startseite")),
      S.listItem().title("Arbeiten (Cases)").child(S.documentTypeList("case").title("Arbeiten")),
      S.listItem().title("Leistungen").child(S.documentTypeList("service").title("Leistungen")),
      S.listItem().title("Seiten").child(S.documentTypeList("page").title("Seiten")),
      S.listItem().title("FAQ").child(S.documentTypeList("faq").title("FAQ")),
      S.divider(),
      S.listItem().title("Website-Einstellungen").child(S.documentTypeList("siteSettings").title("Website-Einstellungen")),
    ]);
