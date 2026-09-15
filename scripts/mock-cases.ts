/**
 * Platzhalter-Cases – NUR für die Design-Demo (lib/content/mock.ts: lokal mit CONTENT_MOCK=1, Vercel-Preview).
 * Werden nie nach Sanity geschrieben (nicht Teil von seedDocs). Texte stammen aus Pascals Relaunch-Prototyp
 * (Repo brandarchitects, Juli 2026) und sind auf die verbindliche Case-Struktur (Briefing 3.1 Kap. 6.5) umgelegt.
 * [PLATZHALTER]-Marken bleiben stehen: Jahr, Rolle, Ergebnis und Materialnutzung klärt Pascal, bevor ein Case
 * im Studio publiziert wird. Keyvisuals: public/design-study/*.svg im einheitlichen Inszenierungssystem.
 */
const L = "de";
const asset = (id: string, url: string, w: number, h: number) => ({ _id: `image-${id}`, _type: "sanity.imageAsset", url, metadata: { dimensions: { width: w, height: h } } });

export const mockAssets = [
  asset("geberit", "/design-study/geberit.svg", 1600, 1000),
  asset("geberit-2", "/design-study/geberit-2.svg", 1200, 1500),
  asset("trustwork", "/design-study/trustwork.svg", 1600, 1000),
  asset("trustwork-2", "/design-study/trustwork-2.svg", 1600, 900),
  asset("socar", "/design-study/socar.svg", 1600, 1000),
];
const byId = (id: string) => mockAssets.find((a) => a._id === `image-${id}`)!;

// Bild-Referenz trägt URL und Masse mit: Rich-Text-Bilder werden in den Abfragen nicht aufgelöst
const fig = (id: string, alt: string, caption: string) => ({
  _type: "figure",
  _key: `fig-${id}-${caption.length}`,
  image: { _type: "image", asset: { _type: "reference", _ref: `image-${id}`, url: byId(id).url, metadata: byId(id).metadata } },
  alt,
  caption,
});
const p = (text: string, k: string) => ({ _type: "block", _key: k, style: "normal", markDefs: [], children: [{ _type: "span", _key: k + "s", text, marks: [] }] });
const svc = (slug: string, k: string) => ({ _type: "reference", _ref: `service-${L}-${slug}`, _key: k });

export const mockCases = [
  {
    _id: `case-${L}-geberit`, _type: "case", language: L,
    title: "Geberit – Template-Tool", client: "Geberit",
    slug: { _type: "slug", current: "geberit" },
    task: "Ein Template-Tool, das Markenkonsistenz für hunderte Anwender skaliert.",
    contribution: "Konzeption, Gestaltungslogik und Template-Architektur als Mandat von Brand Architects.",
    heroImage: fig("geberit", "Platzhalter-Keyvisual Geberit: Template-Tool für markenkonforme Vorlagen", "Platzhalter-Keyvisual – wird durch ein Projektbild des Template-Tools ersetzt."),
    situation: "Geberit führt eine der konsistentesten B2B-Marken Europas und produziert täglich Kommunikationsmittel in Dutzenden Märkten. Jede Vorlage, die extern gestaltet oder intern improvisiert wird, kostet doppelt: Geld in der Produktion und Präzision in der Marke.",
    question: "Wie skaliert Markenqualität, ohne dass jedes Dokument über den Tisch einer Agentur läuft?",
    assignment: "Ein Werkzeug entwickeln, mit dem Mitarbeitende markenkonforme Unterlagen selbst erstellen – so geführt, dass das Ergebnis aussieht, als käme es aus der Designabteilung.",
    decision: "Die Gestaltungsregeln des Corporate Designs werden nicht dokumentiert, sondern eingebaut: Raster, Typografie, Bildlogik und Farbwelt sind im Werkzeug verankert, nicht im Manual. Anwender treffen inhaltliche Entscheidungen, die gestalterischen trifft das System.",
    preserved: "Das bestehende Corporate Design bleibt unangetastet. Es wird nicht neu gestaltet, sondern in Regeln übersetzt, die im Alltag halten. [PLATZHALTER: IP-Story präzisieren und freigeben lassen]",
    application: [p("Die Template-Architektur ist so angelegt, dass neue Formate ohne Neukonzeption ergänzt werden können.", "g1"), fig("geberit-2", "Platzhalter: Ansicht des Template-Tools im Hochformat", "Platzhalter – Anwendungsansicht des Tools, wird durch Screens ersetzt.")],
    result: "Jede Vorlage, die intern statt extern entsteht, spart externe Produktionskosten bei gleichbleibender Markenqualität. [PLATZHALTER: Einsparung beziffern und von Geberit freigeben lassen – keine erfundenen Zahlen]",
    origin: "brand-architects", year: "2024 [PLATZHALTER: bestätigen]", role: "Konzeption, Gestaltungslogik, Template-Architektur",
    partners: [], services: [svc("corporate-design-rebranding", "s1"), svc("ki-branding-marketing", "s2"), svc("digital-branding-webdesign", "s3")],
    materialCleared: true, featured: true, order: 1, contactTopic: "ai",
    relatedCase: { _type: "reference", _ref: `case-${L}-trustwork` },
  },
  {
    _id: `case-${L}-trustwork`, _type: "case", language: L,
    title: "TrustWork – Markteintritt", client: "TrustWork",
    slug: { _type: "slug", current: "trustwork" },
    task: "Eine Identität, die aus einem jungen Anbieter einen glaubwürdigen Partner macht.",
    contribution: "Positionierung, visuelle Identität und Website aus einem Guss – Mandat von Brand Architects.",
    heroImage: fig("trustwork", "Platzhalter-Keyvisual TrustWork: Markenidentität und Website", "Platzhalter-Keyvisual – wird durch ein Projektbild der Identität ersetzt."),
    situation: "Wer Vertrauen verkauft, kann sich keinen improvisierten Auftritt leisten. TrustWork stand vor dem Markteintritt: Das Angebot war definiert, der Name gesetzt, aber es fehlte alles, was aus einem Namen eine Marke macht. [PLATZHALTER: Ausgangslage mit TrustWork präzisieren]",
    question: "Wofür soll TrustWork stehen, und gegen wen tritt es an?",
    assignment: "Positionierung schärfen, visuelle Identität entwickeln und den digitalen Auftritt bauen – in einer Qualität, die mit etablierten Anbietern mithält, und in einem Tempo, das den Markteintritt nicht verzögert.",
    decision: "Aus der Positionierung entstand eine Identität, die Seriosität und Zugänglichkeit verbindet: Wortmarke, Farbwelt, Typografie und Bildsprache als System, angelegt auf die Anwendungen, die ein junges Unternehmen wirklich braucht. Die Website wurde als erster Verkäufer konzipiert: klare Führung zum Angebot, Referenzlogik statt Selbstbeschreibung.",
    preserved: "Der gesetzte Name blieb; die Identität musste ihn tragen, nicht ersetzen.",
    application: [fig("trustwork-2", "Platzhalter: Website TrustWork im Querformat", "Platzhalter – Startseite der Website, wird durch Screens ersetzt.")],
    result: "Der Auftritt trägt seit Launch das Neukundengeschäft; die Zusammenarbeit wird laufend ausgebaut. [PLATZHALTER: Resultat beziffern oder belegen – Zitat, Folgeaufträge]",
    origin: "brand-architects", year: "2025 [PLATZHALTER: bestätigen]", role: "Positionierung, Corporate Design, Website-Konzept und Gestaltung",
    services: [svc("markenstrategie-positionierung", "s1"), svc("digital-branding-webdesign", "s2")],
    materialCleared: true, featured: true, order: 2, contactTopic: "brand",
    relatedCase: { _type: "reference", _ref: `case-${L}-geberit` },
  },
  {
    _id: `case-${L}-socar`, _type: "case", language: L,
    title: "Socar – Rebranding", client: "Socar Energy Switzerland",
    slug: { _type: "slug", current: "socar" },
    task: "Ein Rebranding, das hunderte Tankstellen und ein Land überzeugen musste.",
    contribution: "Kreative Leitung des Rollouts – als Creative Lead in früherer Agentur, nicht als Mandat von Brand Architects.",
    heroImage: fig("socar", "Platzhalter-Keyvisual Socar: Rebranding des Tankstellennetzes", "Platzhalter-Keyvisual – wird durch ein Projektbild ersetzt; Materialnutzung ist zu klären."),
    situation: "Als Socar das Schweizer Tankstellennetz von Esso übernahm, kannte hierzulande kaum jemand den Namen. Hunderte Standorte, tausende Kundenkontakte pro Tag – und eine Marke, die bei null Bekanntheit startete.",
    question: "Wie wird aus einem fremden Namen im laufenden Betrieb eine vertraute Marke?",
    assignment: "Die neue Marke in der Schweiz einführen und über alle Kontaktpunkte durchsetzen – von der Signaletik der Stationen über die Shop-Kommunikation bis zu Kampagnen.",
    decision: "Der Rollout folgte einer klaren Hierarchie: erst die Kontaktpunkte mit der grössten Reichweite, dann die Tiefe. Ein striktes System aus Signaletik, Farbcodierung und Kommunikationsrastern stellte sicher, dass hunderte Standorte wie eine Marke auftreten.",
    preserved: "Die Standorte selbst und ihre Abläufe blieben unverändert; das Rebranding musste um den Betrieb herum funktionieren.",
    application: [p("Anwendungen: Signaletik, Preisschilder, Shop-Kommunikation, Kampagnen. [PLATZHALTER: Bilder nach Klärung der Materialnutzung]", "so1")],
    result: "Der Namenswechsel gelang ohne Bruch im Tagesgeschäft. [PLATZHALTER: prüfbares Resultat ergänzen – nur belegbare Grössen]",
    origin: "former-agency", formerAgency: "[PLATZHALTER: damalige Agentur]", year: "2012–2015 [PLATZHALTER: bestätigen]", role: "Creative Lead (Anstellung), Beitrag Pascal Frey",
    partners: ["[PLATZHALTER: weitere Beteiligte]"],
    services: [svc("corporate-design-rebranding", "s1")],
    materialCleared: true, featured: false, order: 3, contactTopic: "brand",
  },
];
