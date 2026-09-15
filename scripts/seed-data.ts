/**
 * Inhalte für den Seed (scripts/seed.ts) und für die lokale Vorschau ohne Sanity (lib/content/mock.ts).
 * Website-Texte aus docs/briefings/briefing-3-1.md; Redaktionsvorschläge sind in docs/SEITEN-REVIEW.md mit ◐ markiert.
 * Cases stehen bewusst nicht hier – die legt Pascal im Studio an (Bilder, Freigaben).
 */
import { randomUUID } from "node:crypto";

export const L = "de";
const p = (text: string) => ({ _type: "block", _key: randomUUID().slice(0, 8), style: "normal", markDefs: [], children: [{ _type: "span", _key: randomUUID().slice(0, 8), text, marks: [] }] });
const h2 = (text: string) => ({ ...p(text), style: "h2" });
const bullets = (items: string[]) => items.map((text) => ({ ...p(text), listItem: "bullet", level: 1 }));
const ref = (id: string) => ({ _type: "reference", _ref: id, _key: randomUUID().slice(0, 8) });
const key = <T extends object>(o: T) => ({ ...o, _key: randomUUID().slice(0, 8) });

export const faqs = [
  ["Muss unsere gesamte Marke verändert werden?", "Das hängt von Ihrer Ausgangslage ab. Wir prüfen, was funktioniert und was die heutige Leistung noch nicht vermittelt. Daraus ergibt sich der Umfang – oft ist er kleiner als erwartet."],
  ["Können Sie mit unserer bestehenden Webagentur zusammenarbeiten?", "Ja, sofern Aufgaben und Schnittstellen vereinbart sind. Positionierung, Inhalte und Gestaltung dienen als Grundlage für die technische Umsetzung."],
  ["Wer arbeitet an unserem Auftrag?", "Das legen wir vor der Beauftragung fest. Sie erhalten eine benannte Projektverantwortung und wissen, wer welche Leistung übernimmt."],
  ["Wie gross ist Brand Architects?", "Bewusst klein. Die Agentur wird von Pascal Frey geführt; für jeden Auftrag arbeiten wir mit erfahrenen Spezialisten aus unserem Netzwerk. Sie profitieren von der Erfahrung, nicht vom Apparat."],
  ["Was kostet ein Projekt?", "Das Honorar richtet sich nach Klärungsbedarf, Umfang und Anwendungen. Nach dem ersten Gespräch erhalten Sie einen Vorschlag mit Leistungen und Honorar. Wenn Budget und Vorhaben nicht zusammenpassen, sagen wir das im ersten Gespräch."],
  ["Wie lange dauert die Zusammenarbeit?", "Den Zeitplan stimmen wir auf Umfang, Kapazität und Ihre Entscheidungstermine ab. Die wesentlichen Schritte halten wir vor dem Start fest."],
  ["Arbeiten Sie nur im Aargau und in Zürich?", "Unser Einzugsgebiet ist der Aargau und Zürich; wir arbeiten weitgehend ortsunabhängig und treffen Sie dort, wo Entscheidungen anstehen. Aufträge aus der übrigen Schweiz sind willkommen, wenn die Aufgabe passt."],
  ["Was übernimmt KI bei Ihnen – und was nicht?", "KI beschleunigt Varianten, Entwürfe und wiederkehrende Inhalte. Strategie, Entscheidungen und Freigaben bleiben bei Menschen. Wo wir Prozesse für Sie bauen, legen wir fest, an welchen Stellen Ihr Team entscheidet."],
].map(([question, answer], i) => ({ _id: `faq-${L}-${i + 1}`, _type: "faq", language: L, question, answer, order: i + 1 }));

export const steps = [
  { title: "Verstehen", text: "Angebot, Kundenfragen, Ausgangslage, Veränderung klären." },
  { title: "Entscheiden", text: "Markenrichtung und Botschaften begründen und abstimmen." },
  { title: "Gestalten", text: "Die Richtung an konkreten Anwendungen entwickeln und beurteilen." },
  { title: "Einführen", text: "Inhalte, Regeln, Vorlagen und Tools übergeben, so dass es ohne uns läuft." },
].map((s) => key({ _type: "processStep", ...s }));

export const services = [
  { id: "markenstrategie-positionierung", title: "Markenstrategie & Positionierung", order: 1, topic: "brand",
    headline: "Eine klare Richtung für Ihre Marke.", seoTitle: "Markenstrategie und Positionierung",
    whatItTakes: [p("Vorhandene Kundenkenntnisse, Zugang zu den Personen, die entscheiden, und – wo nötig – vereinbarte Gespräche mit Kunden. Der Verkauf bringt seine Fragen und Einwände ein.")],
    teaser: "Wir klären, für wen Ihr Unternehmen die richtige Wahl ist und weshalb. Daraus entstehen Richtung und Botschaften für Ihren Auftritt.",
    forWhom: "Für Unternehmen, deren Auftritt nicht mehr erzählt, was das Geschäft heute ist.",
    triggers: ["Eine Nachfolge", "Ein Wachstumsschritt", "Ein neues Angebot", "Das Gefühl, im Wettbewerb austauschbar geworden zu sein"],
    youGet: [p("Sie erhalten eine Positionierung, die trägt: wofür Sie stehen, wen Sie gewinnen wollen, warum man Sie wählt – verdichtet auf Botschaften, die Ihr Team im Alltag verwenden kann."), p("Dazu ein Briefing für die Umsetzung in Sprache, Gestaltung und digitale Anwendungen.")] },
  { id: "corporate-design-rebranding", title: "Corporate Design & Rebranding", order: 2, topic: "brand",
    headline: "Ein Auftritt, der Ihr Unternehmen heute zeigt.", seoTitle: "Corporate Design und Rebranding",
    whatItTakes: [p("Eine geklärte Markenrichtung oder die Bereitschaft, sie zu Beginn festzulegen. Zugang zu den vorhandenen Gestaltungsmitteln und Anwendungen. Für die Einführung: benannte Ansprechpersonen im Marketing und bei bestehenden Umsetzungspartnern.")],
    teaser: "Wir übersetzen diese Richtung in Sprache und Gestaltung – ohne das Vertraute zu verspielen. Was bleibt und was sich verändert, entscheidet die Aufgabe.",
    forWhom: "Für Firmen, deren Erscheinungsbild dem Niveau ihrer Arbeit hinterherhinkt – oder deren Marke einen Schritt machen muss, ohne das Vertraute zu verspielen.",
    triggers: ["Gewachsener Wildwuchs", "Ein Auftritt, der Kunden und Bewerber zweifeln lässt", "Eine Repositionierung, Fusion oder Übernahme"],
    youGet: [p("Sie erhalten eine visuelle Identität als System und einen geführten Übergang: was bleibt, was sich ändert, in welcher Reihenfolge – so etappiert, dass das Tagesgeschäft weiterläuft.")] },
  { id: "digital-branding-webdesign", title: "Digital Branding & Webdesign", order: 3, topic: "web",
    headline: "Ihre Marke. Digital verständlich und erlebbar.", seoTitle: "Digital Branding und Webdesign",
    whatItTakes: [p("Klarheit über Angebot und Inhalte oder die Bereitschaft, sie mit uns zu ordnen. Vor dem Start legen wir fest, wer Inhalte liefert, wer entwickelt, wer pflegt und wer die Website später betreibt – auch bei einer bestehenden Webagentur.")],
    teaser: "Wir entwickeln Websites und digitale Auftritte, die Ihr Angebot verständlich machen und Kunden zum nächsten Schritt führen.",
    forWhom: "Für Unternehmen, deren Website nicht mehr zeigt, was das Angebot heute ist.",
    triggers: ["Überholte Website", "Unklare Angebotsdarstellung", "Uneinheitlicher digitaler Auftritt"],
    youGet: [p("Sie erhalten eine Website, auf der Kunden Ihr Angebot verstehen und den passenden nächsten Schritt finden – von der Inhaltsstruktur über die Gestaltung bis zur vereinbarten Entwicklung."), p("Eine vorhandene Markenstrategie kann die Grundlage bilden; eine neue ist keine Voraussetzung. Design, Entwicklung und Pflege werden klar getrennt.")] },
  { id: "ki-branding-marketing", title: "KI für Branding & Marketing", order: 4, topic: "ai",
    headline: "Marke im Alltag: Prozesse und Tools mit KI.", seoTitle: "KI für Branding und Marketing",
    whatItTakes: [p("Eine konkrete, wiederkehrende Aufgabe und Ihre Markenregeln. Vor der Beauftragung klären wir Zugänge, Schnittstellen, Prüfung, Verantwortliche und die Betreuung nach der Übergabe. Wir unterscheiden Prototyp, Pilot und produktive Lösung.")],
    teaser: "Content-Prozesse, digitale Produkte und Abläufe, mit denen Ihr Team markenkonsistente Inhalte selbst erzeugt.",
    forWhom: "Für Unternehmen, die wiederkehrende Inhalte brauchen, die zur Marke passen – mit einem Ablauf, den das eigene Team beherrscht.",
    triggers: ["Wiederkehrende Content-Aufgaben", "Eine digitale Produktidee für Marketing oder Kundenerlebnis", "Uneinheitliche Bildwelten und Varianten"],
    youGet: [p("Wir entwickeln Content-Prozesse mit KI, agentische Abläufe und digitale Produkte für Branding und Marketing. Dabei legen wir fest, welche Schritte die Technik übernimmt und wo Ihr Team entscheidet."), p("Vier Felder: KI in der Markenentwicklung mitgedacht (Bildwelten, Varianten, Konsistenzprüfung) · Content-Erstellungsprozesse mit KI · Agentische Prozesse für Branding und Marketing · KI-gestützte Software- und Produktentwicklung.")],
    ctaLabel: "KI-Aufgabe besprechen" },
].map((s) => ({
  _id: `service-${L}-${s.id}`, _type: "service", language: L, title: s.title, headline: s.headline, slug: { _type: "slug", current: s.id }, order: s.order,
  teaser: s.teaser, forWhom: s.forWhom, triggers: s.triggers, youGet: s.youGet, whatItTakes: s.whatItTakes, ctaLabel: s.ctaLabel ?? "Projekt besprechen", contactTopic: s.topic,
  seo: { _type: "seo", title: `${s.seoTitle} – Brand Architects` },
  questions: s.id === "ki-branding-marketing" ? [ref(`faq-${L}-8`)] : [ref(`faq-${L}-1`), ref(`faq-${L}-2`)],
}));

export const pages = [
  // Standortbestimmung (Briefing 3.1 Kap. 5.3 + 8.5, Struktur 1.3 Kap. 5.4). H1 nach 1.3.
  { id: "standortbestimmung", title: "Klarheit vor dem neuen Auftritt.", seoTitle: "Standortbestimmung vor dem Relaunch", topic: "assessment", cta: "Standortbestimmung besprechen",
    intro: "Bevor Sie Ihren Auftritt erneuern, klären wir, was sich an Ihrer Marke tatsächlich ändern muss. Sie erhalten eine begründete Empfehlung und ein Briefing für die nächsten Schritte – auch dann nutzbar, wenn Sie die Umsetzung mit einem anderen Partner angehen.",
    body: [
      h2("Die Kernfrage"), p("Was muss sich ändern, damit der Auftritt das heutige Unternehmen angemessen vermittelt?"),
      h2("Für wen sinnvoll"), p("Für Unternehmen vor einem Marken- oder Website-Relaunch, bei denen offen ist, ob die Marke erhalten, geschärft oder neu entwickelt werden soll."),
      h2("Was wir prüfen"), p("Ein Gespräch mit den Zuständigen. Die Sichtung von Website, Offerte und weiteren Kontaktpunkten. Drei relevante Wettbewerber. Ihre vorhandenen Kundenkenntnisse."),
      h2("Was Sie erhalten"), ...bullets(["Eine schriftliche Einschätzung der wichtigsten Unklarheiten", "Eine begründete Empfehlung: erhalten, schärfen oder neu entwickeln", "Ein priorisiertes Briefing mit den nächsten Schritten", "Eine Besprechung der offenen Entscheidungen"]),
      p("Die Standortbestimmung kann zeigen, dass ein kleinerer Eingriff genügt. Das Ergebnis ist ohne weitere Beauftragung nutzbar."),
      h2("Was Sie beitragen"), p("Unterlagen zu Angebot und Auftritt, eine Ansprechperson und Zeit für Klärung und Entscheide."),
      h2("Umfang und Honorar"), p("Ein klar begrenzter Beratungsauftrag mit schriftlichem Ergebnis. Umfang und Honorar vereinbaren wir vor Beginn. Ein kostenloses Erstgespräch klärt zuvor Aufgabe, Passung und Budgetrahmen."),
      h2("Grenzen"), p("Wir ordnen vorhandene Daten ein. Neue Kundeninterviews oder Marktforschung vereinbaren wir bei Bedarf als Zusatz."),
    ] },
  // Zusammenarbeit (3.1 Kap. 8.6, 1.3 Kap. 5.5). H1 nach 1.3. Schritte kommen im Template direkt nach der Einführung.
  { id: "zusammenarbeit", title: "So wird aus einer Markenfrage ein klarer Auftrag.", seoTitle: "Zusammenarbeit und Projektablauf", topic: "open", cta: "Projekt besprechen", withSteps: true, withFaq: true,
    intro: "Zu Beginn legen wir fest, welche Frage zu lösen ist, wer am Projekt arbeitet und wann Entscheidungen anstehen. Das Team richtet sich nach Ihrer Aufgabe. Sie wissen, welche Ergebnisse Sie erhalten und was wir dafür von Ihnen brauchen.",
    body: [
      h2("Wer an Ihrem Auftrag arbeitet"), p("Brand Architects ist bewusst keine grosse Agentur. Für jeden Auftrag stellen wir das Team aus erfahrenen Spezialisten zusammen, die genau diese Aufgabe beherrschen. Sie wissen vor dem Start, wer an Ihrem Projekt arbeitet."),
      p("Vor der Beauftragung benennen wir Projektverantwortung, Mitwirkende, Zeitplan und Abnahmen."),
      h2("Ihre Mitwirkung"), p("Sie bringen Ihr Wissen über Angebot und Kunden ein, treffen die Entscheide an den vereinbarten Punkten und geben Zwischenergebnisse frei."),
      h2("Schnittstellen"), p("Wir arbeiten mit Ihrem internen Marketing und, wo vorhanden, mit Ihrer bestehenden Webagentur zusammen. Aufgaben und Schnittstellen vereinbaren wir zu Beginn."),
      h2("Zeitrahmen"), p("Ein fokussiertes Corporate-Design-Projekt dauert typischerweise zwei bis drei Monate, ein Rebranding mit Strategie-Anteil drei bis sechs. Beides klären wir vor der Offerte, nicht danach."),
      h2("Übergabe"), p("Am Ende erhalten Sie Inhalte, Regeln, Vorlagen und Tools so, dass Ihr Team damit arbeitet – auch ohne uns."),
      h2("Wie wir mit KI arbeiten"), p("KI beschleunigt Varianten, Entwürfe und wiederkehrende Inhalte. Strategie, Entscheidungen und Freigaben bleiben bei Menschen. Wo wir Prozesse für Sie bauen, legen wir fest, an welchen Stellen Ihr Team entscheidet."),
    ] },
  // Über uns (3.1 Kap. 4.3 Website-Text, 1.3 Kap. 5.6). Reihenfolge: Leistungen → Organisation → Gründerhinweis → Region → Abgrenzung.
  { id: "ueber-uns", title: "Brand Architects.", seoTitle: "Über Brand Architects", topic: "open", cta: "Projekt besprechen",
    intro: "Brand Architects verbindet Markenberatung, Design und digitale Umsetzung – seit über sieben Jahren, mit 20 Jahren Erfahrung aus führenden Agenturen und grossen Schweizer Marken. Ergänzend bauen wir Content-Prozesse und Tools mit KI, mit denen Ihr Team markenkonsistente Inhalte selbst erzeugt.",
    body: [
      h2("Wie wir organisiert sind"), p("Für jeden Auftrag stellen wir das Team aus erfahrenen Spezialisten zusammen, die genau diese Aufgabe beherrschen. Aufgaben und Zuständigkeiten werden vor der Beauftragung festgelegt. Direkt, ohne Apparat."),
      h2("Gründung"), p("Brand Architects wurde vor über sieben Jahren von Pascal Frey gegründet, zuerst als Einzelfirma, seit 2023 als GmbH. Er bringt über 20 Jahre Erfahrung in Markenentwicklung und Design ein – u. a. bei Jung von Matt/Limmat und in der Markenführung grosser Schweizer Unternehmen. Für jeden Auftrag arbeitet er mit erfahrenen Spezialisten aus seinem Netzwerk."),
      h2("Wo wir arbeiten"), p("Brand Architects Design GmbH, 5436 Würenlos. Unser Einzugsgebiet ist der Aargau und Zürich. Wir arbeiten weitgehend ortsunabhängig und treffen Sie dort, wo Entscheidungen anstehen."),
      h2("Was wir bewusst nicht machen"), p("Kampagnen-Feuerwerk, Mediaplanung, Social-Media-Betreuung, Hosting – und alles, was nach dem zwanzigsten Logo-Entwurf ohne Strategie verlangt."),
    ] },
  // Übersichten und Kontakt: nur redaktionelle Rahmentexte (Struktur 1.3 Kap. 5.1, 5.3, 5.7)
  { id: "arbeiten", title: "Ausgewählte Arbeiten.", seoTitle: "Arbeiten und Markenprojekte", topic: "open", cta: "Ähnliches Projekt besprechen", ctaTitle: "Steht bei Ihnen eine ähnliche Aufgabe an?",
    intro: "Die Fälle zeigen eigene Brand-Architects-Projekte und ausgewählte Arbeiten, an denen Pascal Frey in früheren Agenturen beteiligt war. Herkunft, Jahr und Rolle sind pro Projekt gekennzeichnet." },
  { id: "leistungen", title: "Markenstrategie, Design und digitale Auftritte.", seoTitle: "Markenstrategie, Design und digitale Auftritte", topic: "open", cta: "Projekt besprechen",
    intro: "Wir klären, wofür Ihr Unternehmen heute gewählt werden soll, und übersetzen diese Richtung in Sprache, Gestaltung und digitale Auftritte. Ergänzend entwickeln wir Content-Prozesse und Tools mit KI. Jeder Bereich ist einzeln beauftragbar; keiner setzt den anderen voraus.",
    body: [h2("Noch offen, was sich ändern muss?"), p("Mit einer Standortbestimmung prüfen wir Ihren heutigen Auftritt und die anstehende Veränderung. Sie erhalten eine begründete Empfehlung: was bleiben kann, was geschärft werden sollte und welche nächsten Schritte sinnvoll sind. Ein klar begrenzter Beratungsauftrag mit schriftlichem Ergebnis.")] },
  { id: "kontakt", title: "Was steht bei Ihrem Unternehmen an?", seoTitle: "Projekt besprechen", topic: "open",
    intro: "Beschreiben Sie kurz Ihre Aufgabe. Wir melden uns, um die Ausgangslage und einen sinnvollen nächsten Schritt zu besprechen.",
    body: [h2("Das erste Gespräch"), p("Im ersten Gespräch klären wir Ihre Aufgabe, die Passung und den Budgetrahmen. Es ist kostenlos und unverbindlich. Danach erhalten Sie einen Vorschlag mit Leistungen und Honorar – oder eine ehrliche Einschätzung, wenn Vorhaben und Budget nicht zusammenpassen.")] },
  { id: "impressum", title: "Impressum", body: [p("Brand Architects Design GmbH, [Strasse], 5436 Würenlos, Schweiz. [E-Mail]. Handelsregister: [UID]. Verantwortlich: Pascal Frey. — ENDFASSUNG DURCH PASCAL PRÜFEN, PLATZHALTER ERSETZEN.")] },
  { id: "datenschutz", title: "Datenschutzerklärung", body: [p("PLATZHALTER – Endfassung passend zu den eingesetzten Diensten (Vercel Hosting, Resend E-Mail-Versand, Vercel Web Analytics cookielos, Sanity) erstellen und juristisch prüfen lassen. Siehe docs/SEO.md → Rechtliches.")] },
].map((pg) => ({
  _id: `page-${L}-${pg.id}`, _type: "page", language: L, title: pg.title, slug: { _type: "slug", current: pg.id },
  intro: pg.intro, body: pg.body, ctaTitle: pg.ctaTitle, ctaLabel: pg.cta, contactTopic: pg.topic,
  steps: pg.withSteps ? steps : undefined, faqs: pg.withFaq ? faqs.map((f) => ref(f._id)) : undefined,
  seo: pg.seoTitle ? { _type: "seo", title: `${pg.seoTitle} – Brand Architects` } : undefined,
}));

export const home = {
  _id: `home-${L}`, _type: "home", language: L,
  heroKicker: "Markenstrategie, Design und Webdesign für etablierte Schweizer Unternehmen",
  heroHeadline: "Ihr Unternehmen ist weiter. Jetzt muss Ihre Marke mit.",
  heroText: "Ihr Angebot hat sich verändert, Ihre Marke erzählt noch die alte Geschichte? Brand Architects klärt Ihre Positionierung und übersetzt sie in Sprache, Design und digitale Anwendungen. Damit Kunden verstehen, wofür sie Ihr Unternehmen heute wählen sollen.",
  workTitle: "Welche Aufgabe hinter dem Auftritt stand.",
  // Zahlenzeile: nur Grössen aus Briefing 3.1 (Kap. 0, 4.3, 8.3 Modul 6)
  stats: [key({ value: 20, suffix: "+", label: "Jahre Markenarbeit" }), key({ value: 7, suffix: "+", label: "Jahre Brand Architects" }), key({ value: 4, suffix: "", label: "Schritte bis zur Einführung" })],
  situationsTitle: "Was sich im Unternehmen verändert hat, soll im Markt ankommen.",
  situations: [
    key({ title: "Das Angebot ist gewachsen.", text: "Kunden sollen schneller verstehen, welche Leistung zu ihrer Aufgabe passt und was Ihr Unternehmen auszeichnet." }),
    key({ title: "Die Ausrichtung hat sich verändert.", text: "Neue Kunden oder neue Leistungen brauchen eine Geschichte, die den nächsten Schritt nachvollziehbar macht." }),
    key({ title: "Ein neuer Auftritt steht an.", text: "Vor der Gestaltung braucht es eine Entscheidung darüber, was die Marke vermitteln soll." }),
  ],
  servicesTitle: "Von der Markenfrage zur Anwendung.",
  aiLine: "KI für Branding & Marketing: Content-Prozesse, digitale Produkte und Abläufe, mit denen Ihr Team markenkonsistente Inhalte selbst erzeugt.",
  assessmentTitle: "Was muss sich an Ihrer Marke wirklich ändern?",
  assessmentText: "Mit einer Standortbestimmung prüfen wir Ihren heutigen Auftritt und die anstehende Veränderung. Sie erhalten eine begründete Empfehlung: was bleiben kann, was geschärft werden sollte und welche nächsten Schritte sinnvoll sind.",
  assessmentNote: "Ein klar begrenzter Beratungsauftrag mit schriftlichem Ergebnis. Umfang und Honorar vereinbaren wir vor Beginn.",
  collaborationTitle: "Klare Aufgaben. Vereinbarte Schritte. Benannte Verantwortliche.",
  collaborationText: "Zu Beginn legen wir fest, welche Frage zu lösen ist, wer am Projekt arbeitet und wann Entscheidungen anstehen. Das Team richtet sich nach Ihrer Aufgabe. Sie wissen, welche Ergebnisse Sie erhalten und was wir dafür von Ihnen brauchen.",
  steps,
  timeframe: "Ein fokussiertes Corporate-Design-Projekt dauert typischerweise zwei bis drei Monate, ein Rebranding mit Strategie-Anteil drei bis sechs. Beides klären wir vor der Offerte, nicht danach.",
  agencyTitle: "Über Brand Architects.",
  agencyText: "Brand Architects verbindet Markenberatung, Design und digitale Umsetzung – seit über sieben Jahren, mit 20 Jahren Erfahrung aus führenden Agenturen und grossen Schweizer Marken, und mit einem Team aus Spezialisten, das wir für jeden Auftrag zusammenstellen. Direkt, ohne Apparat.",
  contactTitle: "Was steht bei Ihrem Unternehmen an?",
  contactText: "Erzählen Sie uns, was sich verändert und wo Ihr heutiger Auftritt nicht mehr passt. Im ersten Gespräch klären wir die Aufgabe und besprechen einen sinnvollen nächsten Schritt.",
  seo: { _type: "seo", title: "Branding Agentur Aargau & Zürich – Markenberatung, Design, Digital | Brand Architects", description: "Ihr Unternehmen hat sich weiterentwickelt? Brand Architects schärft Positionierung, Design und digitalen Auftritt für Unternehmen im Aargau und in Zürich." },
};

export const siteSettings = {
  _id: `siteSettings-${L}`, _type: "siteSettings", language: L,
  companyName: "Brand Architects Design GmbH", brandName: "Brand Architects",
  tagline: "Markenberatung und Design – Aargau und Zürich",
  zip: "5436", city: "Würenlos", email: "", contactPerson: "Pascal Frey", areaServed: ["Aargau", "Zürich"],
  defaultSeo: { _type: "seo", title: "Branding Agentur Aargau & Zürich – Markenberatung, Design, Digital | Brand Architects", description: "Ihr Unternehmen hat sich weiterentwickelt? Brand Architects schärft Positionierung, Design und digitalen Auftritt für Unternehmen im Aargau und in Zürich." },
  llmSummary: "Brand Architects ist eine Markenberatung mit gestalterischer und digitaler Umsetzung in Würenlos (Aargau) für Unternehmen im Aargau, in Zürich und darüber hinaus. Die Agentur klärt Positionierung und Botschaften und übersetzt sie in Corporate Design, Websites und KI-gestützte Content-Prozesse, mit denen das Team des Kunden im Alltag arbeitet. Geführt von Pascal Frey, seit über sieben Jahren, mit einem Netzwerk erfahrener Spezialisten.",
};


/** Alle Seed-Dokumente in Schreibreihenfolge (FAQ zuerst, weil Leistungen und Seiten darauf verweisen). */
export const seedDocs = [...faqs, ...services, ...pages, home, siteSettings] as Array<{ _id: string; _type: string } & Record<string, unknown>>;
