/**
 * Erstbefüllung von Sanity mit den Website-Texten aus docs/briefing-3-1.md.
 * Ausführen: npm run seed  (braucht SANITY_WRITE_TOKEN in .env.local)
 * Idempotent: feste _ids, createOrReplace – mehrfaches Ausführen überschreibt dieselben Dokumente.
 * Cases werden NICHT geseedet (brauchen Bilder und Freigaben) – die legt Pascal im Studio an.
 */
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";

// .env.local minimal einlesen (ohne zusätzliche Abhängigkeit)
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-09-15",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const L = "de";
const p = (text: string) => ({ _type: "block", _key: randomUUID().slice(0, 8), style: "normal", markDefs: [], children: [{ _type: "span", _key: randomUUID().slice(0, 8), text, marks: [] }] });
const bullets = (items: string[]) => items.map((text) => ({ ...p(text), listItem: "bullet", level: 1 }));
const ref = (id: string) => ({ _type: "reference", _ref: id, _key: randomUUID().slice(0, 8) });
const key = <T extends object>(o: T) => ({ ...o, _key: randomUUID().slice(0, 8) });

const faqs = [
  ["Muss unsere gesamte Marke verändert werden?", "Das hängt von Ihrer Ausgangslage ab. Wir prüfen, was funktioniert und was die heutige Leistung noch nicht vermittelt. Daraus ergibt sich der Umfang – oft ist er kleiner als erwartet."],
  ["Können Sie mit unserer bestehenden Webagentur zusammenarbeiten?", "Ja, sofern Aufgaben und Schnittstellen vereinbart sind. Positionierung, Inhalte und Gestaltung dienen als Grundlage für die technische Umsetzung."],
  ["Wer arbeitet an unserem Auftrag?", "Das legen wir vor der Beauftragung fest. Sie erhalten eine benannte Projektverantwortung und wissen, wer welche Leistung übernimmt."],
  ["Wie gross ist Brand Architects?", "Bewusst klein. Die Agentur wird von Pascal Frey geführt; für jeden Auftrag arbeiten wir mit erfahrenen Spezialisten aus unserem Netzwerk. Sie profitieren von der Erfahrung, nicht vom Apparat."],
  ["Was kostet ein Projekt?", "Das Honorar richtet sich nach Klärungsbedarf, Umfang und Anwendungen. Nach dem ersten Gespräch erhalten Sie einen Vorschlag mit Leistungen und Honorar. Wenn Budget und Vorhaben nicht zusammenpassen, sagen wir das im ersten Gespräch."],
  ["Wie lange dauert die Zusammenarbeit?", "Den Zeitplan stimmen wir auf Umfang, Kapazität und Ihre Entscheidungstermine ab. Die wesentlichen Schritte halten wir vor dem Start fest."],
  ["Arbeiten Sie nur im Aargau und in Zürich?", "Unser Einzugsgebiet ist der Aargau und Zürich; wir arbeiten weitgehend ortsunabhängig und treffen Sie dort, wo Entscheidungen anstehen. Aufträge aus der übrigen Schweiz sind willkommen, wenn die Aufgabe passt."],
  ["Was übernimmt KI bei Ihnen – und was nicht?", "KI beschleunigt Varianten, Entwürfe und wiederkehrende Inhalte. Strategie, Entscheidungen und Freigaben bleiben bei Menschen. Wo wir Prozesse für Sie bauen, legen wir fest, an welchen Stellen Ihr Team entscheidet."],
].map(([question, answer], i) => ({ _id: `faq-${L}-${i + 1}`, _type: "faq", language: L, question, answer, order: i + 1 }));

const steps = [
  { title: "Verstehen", text: "Angebot, Kundenfragen, Ausgangslage, Veränderung klären." },
  { title: "Entscheiden", text: "Markenrichtung und Botschaften begründen und abstimmen." },
  { title: "Gestalten", text: "Die Richtung an konkreten Anwendungen entwickeln und beurteilen." },
  { title: "Einführen", text: "Inhalte, Regeln, Vorlagen und Tools übergeben, so dass es ohne uns läuft." },
].map((s) => key({ _type: "processStep", ...s }));

const services = [
  { id: "markenstrategie-positionierung", title: "Markenstrategie & Positionierung", order: 1, topic: "brand",
    teaser: "Wir klären, für wen Ihr Unternehmen die richtige Wahl ist und weshalb. Daraus entstehen Richtung und Botschaften für Ihren Auftritt.",
    forWhom: "Für Unternehmen, deren Auftritt nicht mehr erzählt, was das Geschäft heute ist.",
    triggers: ["Eine Nachfolge", "Ein Wachstumsschritt", "Ein neues Angebot", "Das Gefühl, im Wettbewerb austauschbar geworden zu sein"],
    youGet: [p("Sie erhalten eine Positionierung, die trägt: wofür Sie stehen, wen Sie gewinnen wollen, warum man Sie wählt – verdichtet auf Botschaften, die Ihr Team im Alltag verwenden kann."), p("Dazu ein Briefing für die Umsetzung in Sprache, Gestaltung und digitale Anwendungen.")] },
  { id: "corporate-design-rebranding", title: "Corporate Design & Rebranding", order: 2, topic: "brand",
    teaser: "Wir übersetzen diese Richtung in Sprache und Gestaltung – ohne das Vertraute zu verspielen. Was bleibt und was sich verändert, entscheidet die Aufgabe.",
    forWhom: "Für Firmen, deren Erscheinungsbild dem Niveau ihrer Arbeit hinterherhinkt – oder deren Marke einen Schritt machen muss, ohne das Vertraute zu verspielen.",
    triggers: ["Gewachsener Wildwuchs", "Ein Auftritt, der Kunden und Bewerber zweifeln lässt", "Eine Repositionierung, Fusion oder Übernahme"],
    youGet: [p("Sie erhalten eine visuelle Identität als System und einen geführten Übergang: was bleibt, was sich ändert, in welcher Reihenfolge – so etappiert, dass das Tagesgeschäft weiterläuft.")] },
  { id: "digital-branding-webdesign", title: "Digital Branding & Webdesign", order: 3, topic: "web",
    teaser: "Wir entwickeln Websites und digitale Auftritte, die Ihr Angebot verständlich machen und Kunden zum nächsten Schritt führen.",
    forWhom: "Für Unternehmen, deren Website nicht mehr zeigt, was das Angebot heute ist.",
    triggers: ["Überholte Website", "Unklare Angebotsdarstellung", "Uneinheitlicher digitaler Auftritt"],
    youGet: [p("Sie erhalten eine Website, auf der Kunden Ihr Angebot verstehen und den passenden nächsten Schritt finden – von der Inhaltsstruktur über die Gestaltung bis zur vereinbarten Entwicklung."), p("Eine vorhandene Markenstrategie kann die Grundlage bilden; eine neue ist keine Voraussetzung. Design, Entwicklung und Pflege werden klar getrennt.")] },
  { id: "ki-branding-marketing", title: "KI für Branding & Marketing", order: 4, topic: "ai",
    teaser: "Content-Prozesse, digitale Produkte und Abläufe, mit denen Ihr Team markenkonsistente Inhalte selbst erzeugt.",
    forWhom: "Für Unternehmen, die wiederkehrende Inhalte brauchen, die zur Marke passen – mit einem Ablauf, den das eigene Team beherrscht.",
    triggers: ["Wiederkehrende Content-Aufgaben", "Eine digitale Produktidee für Marketing oder Kundenerlebnis", "Uneinheitliche Bildwelten und Varianten"],
    youGet: [p("Wir entwickeln Content-Prozesse mit KI, agentische Abläufe und digitale Produkte für Branding und Marketing. Dabei legen wir fest, welche Schritte die Technik übernimmt und wo Ihr Team entscheidet."), p("Vier Felder: KI in der Markenentwicklung mitgedacht (Bildwelten, Varianten, Konsistenzprüfung) · Content-Erstellungsprozesse mit KI · Agentische Prozesse für Branding und Marketing · KI-gestützte Software- und Produktentwicklung.")],
    ctaLabel: "KI-Aufgabe besprechen" },
].map((s) => ({
  _id: `service-${L}-${s.id}`, _type: "service", language: L, title: s.title, slug: { _type: "slug", current: s.id }, order: s.order,
  teaser: s.teaser, forWhom: s.forWhom, triggers: s.triggers, youGet: s.youGet, ctaLabel: s.ctaLabel ?? "Projekt besprechen", contactTopic: s.topic,
  questions: s.id === "ki-branding-marketing" ? [ref(`faq-${L}-8`)] : [ref(`faq-${L}-1`), ref(`faq-${L}-2`)],
}));

const pages = [
  { id: "standortbestimmung", title: "Was muss sich an Ihrer Marke wirklich ändern?", topic: "assessment", cta: "Standortbestimmung besprechen",
    intro: "Bevor Sie Ihren Auftritt erneuern, klären wir, was sich an Ihrer Marke tatsächlich ändern muss. Sie erhalten eine begründete Empfehlung und ein Briefing für die nächsten Schritte – auch dann nutzbar, wenn Sie die Umsetzung mit einem anderen Partner angehen.",
    body: [p("Kernfrage: Was muss sich ändern, damit der Auftritt das heutige Unternehmen angemessen vermittelt?"), p("Umfang: Gespräch mit den Zuständigen · Sichtung von Website, Offerte und weiteren Kontaktpunkten · drei relevante Wettbewerber · vorhandene Kundenkenntnisse."), p("Sie erhalten: eine Einschätzung der Unklarheiten, eine Empfehlung (erhalten, schärfen, neu entwickeln), ein priorisiertes Briefing und eine Besprechung der Entscheidungen. Die Standortbestimmung kann zeigen, dass ein kleinerer Eingriff genügt."), p("Das Honorar richtet sich nach dem Umfang und wird vor dem Start vereinbart. Ein kostenloses Erstgespräch klärt zuvor Aufgabe, Passung und Budgetrahmen.")] },
  { id: "zusammenarbeit", title: "Klare Aufgaben. Vereinbarte Schritte. Benannte Verantwortliche.", topic: "open", cta: "Projekt besprechen", withSteps: true, withFaq: true,
    intro: "Zu Beginn legen wir fest, welche Frage zu lösen ist, wer am Projekt arbeitet und wann Entscheidungen anstehen. Das Team richtet sich nach Ihrer Aufgabe. Sie wissen, welche Ergebnisse Sie erhalten und was wir dafür von Ihnen brauchen.",
    body: [p("Brand Architects ist bewusst keine grosse Agentur. Für jeden Auftrag stellen wir das Team aus erfahrenen Spezialisten zusammen, die genau diese Aufgabe beherrschen. Sie wissen vor dem Start, wer an Ihrem Projekt arbeitet."), p("Ein fokussiertes Corporate-Design-Projekt dauert typischerweise zwei bis drei Monate, ein Rebranding mit Strategie-Anteil drei bis sechs. Beides klären wir vor der Offerte, nicht danach."), p("Wie wir mit KI arbeiten: KI beschleunigt Varianten, Entwürfe und wiederkehrende Inhalte. Strategie, Entscheidungen und Freigaben bleiben bei Menschen.")] },
  { id: "ueber-uns", title: "Über Brand Architects", topic: "open", cta: "Projekt besprechen",
    intro: "Brand Architects verbindet Markenberatung, Design und digitale Umsetzung – seit über sieben Jahren, mit 20 Jahren Erfahrung aus führenden Agenturen und grossen Schweizer Marken, und mit einem Team aus Spezialisten, das wir für jeden Auftrag zusammenstellen. Direkt, ohne Apparat.",
    body: [p("Brand Architects wurde vor über sieben Jahren von Pascal Frey gegründet, zuerst als Einzelfirma, seit 2023 als GmbH. Er bringt über 20 Jahre Erfahrung in Markenentwicklung und Design ein – u. a. bei Jung von Matt/Limmat und in der Markenführung grosser Schweizer Unternehmen. Für jeden Auftrag arbeitet er mit erfahrenen Spezialisten aus seinem Netzwerk."), p("Unser Einzugsgebiet ist der Aargau und Zürich. Wir arbeiten weitgehend ortsunabhängig und treffen Sie dort, wo Entscheidungen anstehen."), p("Was wir bewusst nicht machen: Kampagnen-Feuerwerk, Mediaplanung, Social-Media-Betreuung, Hosting – und alles, was nach dem zwanzigsten Logo-Entwurf ohne Strategie verlangt.")] },
  { id: "impressum", title: "Impressum", body: [p("Brand Architects Design GmbH, [Strasse], 5436 Würenlos, Schweiz. [E-Mail]. Handelsregister: [UID]. Verantwortlich: Pascal Frey. — ENDFASSUNG DURCH PASCAL PRÜFEN, PLATZHALTER ERSETZEN.")] },
  { id: "datenschutz", title: "Datenschutzerklärung", body: [p("PLATZHALTER – Endfassung passend zu den eingesetzten Diensten (Vercel Hosting, Resend E-Mail-Versand, Vercel Web Analytics cookielos, Sanity) erstellen und juristisch prüfen lassen. Siehe docs/SEO.md → Rechtliches.")] },
].map((pg) => ({
  _id: `page-${L}-${pg.id}`, _type: "page", language: L, title: pg.title, slug: { _type: "slug", current: pg.id },
  intro: pg.intro, body: pg.body, ctaLabel: pg.cta, contactTopic: pg.topic,
  steps: pg.withSteps ? steps : undefined, faqs: pg.withFaq ? faqs.map((f) => ref(f._id)) : undefined,
}));

const home = {
  _id: `home-${L}`, _type: "home", language: L,
  heroKicker: "Markenberatung und Design für Unternehmen mit Substanz – im Aargau, in Zürich und darüber hinaus",
  heroHeadline: "Ihr Unternehmen ist weiter. Jetzt muss Ihre Marke mit.",
  heroText: "Ihr Angebot hat sich verändert, Ihre Marke erzählt noch die alte Geschichte? Brand Architects klärt Ihre Positionierung und übersetzt sie in Sprache, Design und digitale Anwendungen. Damit Kunden verstehen, wofür sie Ihr Unternehmen heute wählen sollen.",
  workTitle: "Welche Aufgabe hinter dem Auftritt stand.",
  situationsTitle: "Was sich im Unternehmen verändert hat, soll im Markt ankommen.",
  situations: [
    key({ title: "Das Angebot ist gewachsen.", text: "Kunden sollen schneller verstehen, welche Leistung zu ihrer Aufgabe passt und was Ihr Unternehmen auszeichnet." }),
    key({ title: "Die Ausrichtung hat sich verändert.", text: "Neue Kunden oder neue Leistungen brauchen eine Geschichte, die den nächsten Schritt nachvollziehbar macht." }),
    key({ title: "Ein neuer Auftritt steht an.", text: "Vor der Gestaltung braucht es eine Entscheidung darüber, was die Marke vermitteln soll." }),
  ],
  aiLine: "KI für Branding & Marketing: Content-Prozesse, digitale Produkte und Abläufe, mit denen Ihr Team markenkonsistente Inhalte selbst erzeugt.",
  assessmentTitle: "Was muss sich an Ihrer Marke wirklich ändern?",
  assessmentText: "Mit einer Standortbestimmung prüfen wir Ihren heutigen Auftritt und die anstehende Veränderung. Sie erhalten eine begründete Empfehlung: was bleiben kann, was geschärft werden sollte und welche nächsten Schritte sinnvoll sind.",
  collaborationTitle: "Klare Aufgaben. Vereinbarte Schritte. Benannte Verantwortliche.",
  collaborationText: "Zu Beginn legen wir fest, welche Frage zu lösen ist, wer am Projekt arbeitet und wann Entscheidungen anstehen. Das Team richtet sich nach Ihrer Aufgabe. Sie wissen, welche Ergebnisse Sie erhalten und was wir dafür von Ihnen brauchen.",
  steps,
  timeframe: "Ein fokussiertes Corporate-Design-Projekt dauert typischerweise zwei bis drei Monate, ein Rebranding mit Strategie-Anteil drei bis sechs. Beides klären wir vor der Offerte, nicht danach.",
  agencyText: "Brand Architects verbindet Markenberatung, Design und digitale Umsetzung – seit über sieben Jahren, mit 20 Jahren Erfahrung aus führenden Agenturen und grossen Schweizer Marken, und mit einem Team aus Spezialisten, das wir für jeden Auftrag zusammenstellen. Direkt, ohne Apparat.",
  contactTitle: "Was steht bei Ihrem Unternehmen an?",
  contactText: "Erzählen Sie uns, was sich verändert und wo Ihr heutiger Auftritt nicht mehr passt. Im ersten Gespräch klären wir die Aufgabe und besprechen einen sinnvollen nächsten Schritt.",
  seo: { _type: "seo", title: "Branding Agentur Aargau & Zürich – Markenberatung, Design, Digital | Brand Architects", description: "Ihr Unternehmen hat sich weiterentwickelt? Brand Architects schärft Positionierung, Design und digitalen Auftritt für Unternehmen im Aargau und in Zürich." },
};

const siteSettings = {
  _id: `siteSettings-${L}`, _type: "siteSettings", language: L,
  companyName: "Brand Architects Design GmbH", brandName: "Brand Architects",
  tagline: "Markenberatung und Design – Aargau und Zürich",
  zip: "5436", city: "Würenlos", email: "", contactPerson: "Pascal Frey", areaServed: ["Aargau", "Zürich"],
  defaultSeo: { _type: "seo", title: "Branding Agentur Aargau & Zürich – Markenberatung, Design, Digital | Brand Architects", description: "Ihr Unternehmen hat sich weiterentwickelt? Brand Architects schärft Positionierung, Design und digitalen Auftritt für Unternehmen im Aargau und in Zürich." },
  llmSummary: "Brand Architects ist eine Markenberatung mit gestalterischer und digitaler Umsetzung in Würenlos (Aargau) für Unternehmen im Aargau, in Zürich und darüber hinaus. Die Agentur klärt Positionierung und Botschaften und übersetzt sie in Corporate Design, Websites und KI-gestützte Content-Prozesse, mit denen das Team des Kunden im Alltag arbeitet. Geführt von Pascal Frey, seit über sieben Jahren, mit einem Netzwerk erfahrener Spezialisten.",
};

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) throw new Error("SANITY_WRITE_TOKEN fehlt (.env.local)");
  const tx = client.transaction();
  for (const doc of [...faqs, ...services, ...pages, home, siteSettings]) tx.createOrReplace(doc as never);
  const res = await tx.commit();
  console.log(`✓ ${res.results.length} Dokumente geschrieben. Jetzt im Studio prüfen: /studio`);
}
main().catch((e) => { console.error(e); process.exit(1); });
