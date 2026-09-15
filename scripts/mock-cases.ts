/**
 * Designstudien – NUR für die lokale Vorschau (lib/content/mock.ts). Kein Kundenauftrag, keine Referenz.
 * Jeder Text sagt, was er ist. Werden nie nach Sanity geschrieben (nicht Teil von seedDocs).
 * Bilder: public/design-study/*.svg (abstrakte Flächen mit Kennzeichnung), lokal, ohne CDN.
 */
const L = "de";
const study = (n: number, w: number, h: number) => ({
  _id: `image-study-${n}`,
  _type: "sanity.imageAsset",
  url: `/design-study/${n}.svg`,
  metadata: { dimensions: { width: w, height: h } },
});

export const mockAssets = [study(1, 1600, 1100), study(2, 1200, 1500), study(3, 1600, 900)];

// Bild-Referenz trägt URL und Masse gleich mit: Rich-Text-Bilder werden in den Abfragen nicht aufgelöst
const fig = (n: number, caption: string) => ({
  _type: "figure",
  _key: `fig${n}${caption.length}`,
  image: { _type: "image", asset: { _type: "reference", _ref: `image-study-${n}`, url: mockAssets[n - 1].url, metadata: mockAssets[n - 1].metadata } },
  alt: "Designstudie: abstrakte Flächenkomposition mit Kennzeichnung «kein Kundenauftrag»",
  caption,
});
const p = (text: string, k: string) => ({ _type: "block", _key: k, style: "normal", markDefs: [], children: [{ _type: "span", _key: k + "s", text, marks: [] }] });

export const mockCases = [
  {
    _id: `case-${L}-designstudie-a`, _type: "case", language: L,
    title: "Designstudie A", client: "Designstudie A – kein Kundenauftrag",
    slug: { _type: "slug", current: "designstudie-a" },
    task: "Platzhalter, um Projektkarte und Fallseite zu beurteilen.",
    contribution: "Zeigt Bildformat, Ledger-Zeilen und Herkunftsangabe der Karte.",
    heroImage: fig(1, "Designstudie – kein Kundenauftrag. Fläche im Format 16:11 zur Prüfung der Bildpräsentation."),
    situation: "Diese Fallseite ist eine Designstudie. Sie zeigt, wie eine echte Arbeit dargestellt wird: Kopf mit Kunde und Aufgabe, Hauptbild, Rollenblock, dann die Erzählung in Abschnitten.",
    question: "Trägt die Zweiteilung – Label links, Text rechts – auch bei kurzen und langen Absätzen?",
    assignment: "Prüfung der Typografie, Abstände und Zeilenlängen an realen Textmengen aus dem Briefing.",
    decision: "Die Erzählung bleibt in Lesebreite. Bilder in der Anwendung dürfen breiter laufen als der Text.",
    preserved: "Der Rollenblock steht sichtbar unter dem Bild, nicht im Seitenende – so verlangt es das Struktur-Briefing.",
    application: [p("Anwendung: Hier stehen später zwei bis vier Bilder mit Legende. In der Studie ein zweites Bild im Hochformat.", "a1"), fig(2, "Designstudie – kein Kundenauftrag. Hochformat 4:5."), p("Ein dritter Absatz prüft den Rhythmus von Text und Bild.", "a2"), fig(3, "Designstudie – kein Kundenauftrag. Querformat 16:9.")],
    result: "Kein Ergebnis – Designstudie ohne Kundenauftrag.",
    origin: "brand-architects", year: "Studie", role: "Gestaltung der Vorlage",
    partners: [], services: [{ _type: "reference", _ref: `service-${L}-corporate-design-rebranding`, _key: "s1" }],
    materialCleared: true, featured: true, order: 1, contactTopic: "brand",
    relatedCase: { _type: "reference", _ref: `case-${L}-designstudie-b` },
  },
  {
    _id: `case-${L}-designstudie-b`, _type: "case", language: L,
    title: "Designstudie B", client: "Designstudie B – kein Kundenauftrag",
    slug: { _type: "slug", current: "designstudie-b" },
    task: "Zweite Karte mit dem Herkunftshinweis «Frühere Agenturarbeit».",
    contribution: "Prüft die zweizeilige Herkunftsangabe und eine längere Aufgabenzeile in der Karte.",
    heroImage: fig(3, "Designstudie – kein Kundenauftrag. Querformat 16:9 zur Prüfung des Karten-Beschnitts."),
    situation: "Designstudie ohne Kundenauftrag.", question: "Designstudie ohne Kundenauftrag.", assignment: "Designstudie ohne Kundenauftrag.",
    decision: "Designstudie ohne Kundenauftrag.", preserved: "Designstudie ohne Kundenauftrag.",
    application: [fig(1, "Designstudie – kein Kundenauftrag.")],
    origin: "former-agency", formerAgency: "Frühere Agentur (Studie)", year: "Studie", role: "Gestaltung der Vorlage",
    services: [{ _type: "reference", _ref: `service-${L}-digital-branding-webdesign`, _key: "s1" }],
    materialCleared: true, featured: true, order: 2, contactTopic: "web",
  },
];
