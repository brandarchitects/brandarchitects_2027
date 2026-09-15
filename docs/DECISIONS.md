# Architektur-Entscheide (ADR)

Format: Kontext → Entscheid → Konsequenzen. Neue Entscheide unten anfügen, alte nicht löschen (Geschichte ist nützlich).

## ADR-001 · Next.js statt Astro (15.09.2026)
**Kontext:** Prototyp war Astro. Anforderungen: anspruchsvolle Gestaltung, Sanity, Mehrsprachigkeit, Vibe Coding mit Claude Code.
**Entscheid:** Next.js 16 App Router. Astro geprüft und verworfen.
**Konsequenzen:** React auf jeder Seite (~90 KB) – tolerierbar mit Server-Komponenten-Disziplin (CLAUDE.md Regel 1). Gewinn: kanonisches Sanity-Tooling, breiteres Ökosystem für Bewegung/Interaktion, etabliertes i18n-Muster. Lighthouse-Ziel Performance ≥ 90 statt ≥ 95.

## ADR-002 · Sanity ab Tag 1, Free-Plan (15.09.2026)
**Kontext:** CMS war als «später» angedacht. Pascal will Sanity zudem als Lernfall für Kundenprojekte.
**Entscheid:** Sanity von Beginn an, Studio im selben Repo unter `/studio`. Free-Plan (hart limitiert, keine Überraschungskosten).
**Konsequenzen:** Ein Konto mehr, dafür kein Nachbau eines CMS-Datenmodells und kein Migrationsprojekt. Portable Text als Rich-Text-Format. Free-Quota: API-Requests schonen → Revalidation per Webhook, nicht per Intervall.

## ADR-003 · Mehrsprachigkeit ab Tag 1, Launch nur DE (15.09.2026)
**Kontext:** EN soll später schlank dazukommen; Locale-Routing nachträglich ist teuer.
**Entscheid:** `app/[locale]/` mit next-intl, `localePrefix: 'as-needed'` (DE ohne Präfix). Sanity: Dokument-Lokalisierung (`language`-Feld, Plugin document-internationalization). UI-Strings in `messages/`.
**Konsequenzen:** Sprache 2 = Config-Eintrag + Übersetzungsdatei + übersetzte Dokumente (docs/I18N.md). Pfad-Übersetzung (`/work/`) bewusst nicht am Start.

## ADR-004 · Kein Datenbank-Speicher für Anfragen (15.09.2026)
**Entscheid:** Formular → E-Mail via Resend. Die Mail ist der Datensatz.
**Konsequenzen:** Keine Datenbank, kein Login, keine Backups. Messung (Briefing Kap. 10) über eine manuelle Anfragen-Liste.

## ADR-005 · Vercel Web Analytics, cookielos (15.09.2026)
**Entscheid:** Vercel Web Analytics statt Plausible/PostHog.
**Konsequenzen:** Kein Cookie-Banner nötig (solange nichts anderes Cookies setzt – Endfassung Datenschutz prüfen). Wechsel jederzeit möglich.

## ADR-006 · KI-Crawler zugelassen (15.09.2026)
**Entscheid:** robots.txt erlaubt alle Crawler inkl. GPTBot, ClaudeBot, PerplexityBot; zusätzlich `/llms.txt`.
**Konsequenzen:** Inhalte können in KI-Antworten erscheinen – gewollt (LLM-Sichtbarkeit). Umkehrbar in `app/robots.ts`.

## ADR-007 · Kein Code aus dem Prototyp (15.09.2026)
**Entscheid:** Prototyp `brandarchitects` (Astro) wird nicht weitergeführt; nur Inhalte und Erkenntnisse übernommen.

## ADR-008 · Hero-Einordnung nach Strategie 2.2 (15.09.2026)
**Kontext:** Briefing 3.1 («Markenberatung und Design für Unternehmen mit Substanz – im Aargau, in Zürich und darüber hinaus») und Strategie 2.2 / Struktur 1.3 («Markenstrategie, Design und Webdesign für etablierte Schweizer Unternehmen») nennen unterschiedliche Einordnungszeilen. Beide sind inhaltlich korrekt.
**Entscheid (Pascal):** Fassung 2.2, weil klarer. Regionale Einordnung bleibt über Title, Schema, Über uns und FAQ.
**Konsequenzen:** `scripts/seed.ts` → `heroKicker` angepasst; im Studio jederzeit änderbar.

## ADR-009 · Formular: keine Budgetfrage, Interessenfelder als Mehrfachauswahl (15.09.2026)
**Kontext:** Briefing 3.1 sieht ein Budgetrahmen-Feld vor, Struktur 1.3 zum Start nicht. Das bisherige Feld «Thema» war eine Einfachauswahl.
**Entscheid (Pascal):** Kein Budgetfeld zum Start. Statt «Thema» ein Feld «Interessenfelder» mit Mehrfachauswahl (Markenprojekt · Website und Digital Branding · KI und digitale Produkte · Standortbestimmung · Noch offen) und kurzem Begleittext, der den Nutzen der Auswahl erklärt.
**Konsequenzen:** `lib/schemas/contact.ts` (`topics` Array), `components/forms/ContactForm.tsx` (Checkbox-Gruppe, funktioniert ohne JavaScript), `app/api/contact/route.ts` (Mail listet alle Felder), `messages/de.json`. Vorbelegung `?thema=` hakt ein Feld an. Analytics-Event trägt die gewählten Schlüssel, keine Inhalte. Budgetkategorien folgen nach Kalkulation (Briefing Kap. 12.4).

## ADR-010 · Modul 7 Agentur-Text (15.09.2026)
**Kontext:** Briefing 3.1 (mit «seit über sieben Jahren», «20 Jahre Erfahrung», Netzwerk) und Struktur 1.3 (zwei Sätze ohne Zahlen) formulieren Modul 7 unterschiedlich.
**Entscheid (Pascal):** Beide Fassungen zulässig. Umgesetzt bleibt die Fassung 3.1 (Seed); Wechsel im Studio ohne Code möglich.

## ADR-011 · Resend: Free-Plan, Region USA, Einrichtung direkt statt Vercel-Integration (15.09.2026)
**Kontext:** Die Vercel-Integration für Resend verlangt eine bereits in Vercel hinterlegte Domain und für die EU-Region (eu-west-1) einen Bezahlplan (~USD 20/Monat). Das Formular versendet wenige Anfragen; Resend leitet nur durch, speichert nichts bei uns.
**Entscheid (Pascal):** Resend wird in Phase 2 direkt auf resend.com eingerichtet, Free-Plan, Region us-east-1. Vercel-Integration nicht verwendet.
**Konsequenzen:** Datenschutzerklärung nennt Resend (USA, Standardvertragsklauseln). Regionswechsel später gegen Aufpreis möglich. `RESEND_API_KEY` wird von Hand in Vercel gesetzt.

## ADR-012 · Design-Exploration startet parallel zu Phase 2, Seiten-Review davor (15.09.2026)
**Kontext:** Der Bauplan sah Design als Phase 3 nach dem Formular vor. Pascal: Gestaltung kann Aufbau und Struktur der Seiten verändern, und alle Seiten sollen nochmals auf Texte und Gefässe geprüft werden.
**Entscheid (Pascal):** Design-Runde 0 und 1 (Haltung, drei Richtungen) beginnen sofort im separaten Design-Projekt. Ein Seiten-Review (Phase 2b) prüft jede Seite gegen Briefing 3.1 und Struktur 1.3, bevor Inhalte finalisiert werden. Strukturänderungen aus dem Design werden über `docs/design-spec.md` und ggf. neue ADRs ins Code-Projekt übernommen; die Sitemap (Briefing Kap. 8.2) bleibt unverändert.
**Konsequenzen:** Phase 2 (Resend/DNS) läuft unabhängig weiter. Module bleiben Server-Komponenten mit Tokens, damit Design-Versionen als Branches vergleichbar sind.

## ADR-013 · Seed läuft bei jedem Build, schützt Studio-Änderungen (15.09.2026)
**Kontext:** Der Seed über `SEED_ON_BUILD=1` verlangte pro Inhaltsänderung im Code drei manuelle Schritte in Vercel und überschrieb Studio-Änderungen. Pascal: nicht haltbar.
**Entscheid:** `scripts/seed.ts` läuft vor jedem Build ohne Schalter. Es merkt sich pro Dokument die `_rev` nach dem Seed (Dokument `seedMeta`). Unveränderte Dokumente werden mit dem Seed-Stand aktualisiert, im Studio bearbeitete nur um fehlende Felder ergänzt. `SEED_MODE=replace|off` als bewusste Ausnahme.
**Konsequenzen:** Redaktion im Studio ist ab dem ersten Publish die Quelle für diesen Text; der Seed liefert Struktur und Ausgangstexte. Zwei Sanity-Requests pro Build (Quota unkritisch). Cases bleiben ausserhalb des Seeds.

## ADR-014 · Design v1 aus dem Design-&-Build-Prompt, Archivo Variable, Register als Handschrift (15.09.2026)
**Kontext:** Statt der geplanten Explorationsrunden im separaten Design-Projekt hat Pascal einen vollständigen «AI Website Design & Build Prompt» geliefert, der eine Kreativrichtung, Gestaltungsprinzipien und Selbstprüfung verlangt und Rückfragen ausschliesst.
**Entscheid:** Design v1 direkt im Code-Projekt auf Branch `design/v1`, dokumentiert in `docs/design-spec.md`. Schrift Archivo Variable (OFL, selbst gehostet, Breiten- und Gewichtsachse) nach Specimen-Vergleich mit Schibsted Grotesk. Farbe: warmes Off-White, Tinte, ein flacher Messing-Akzent. Handschrift: typografisches Register (schmale Ziffern und Labels, breite Headlines), Haarlinien, dunkler Schluss (Kontakt + Footer auf Tinte). Radius 0, keine Schatten, keine Verläufe.
**Konsequenzen:** Alle Module und Seiten neu komponiert, ohne neues `'use client'`; UI-Bausteine `components/ui/` (SectionHead, Arrow). Lokale Vorschau ohne Sanity über `CONTENT_MOCK=1` (groq-js über Seed-Daten, zwei gekennzeichnete Designstudien). Abnahme durch Pascal auf der Vorschau-URL, danach Merge nach main. Schrift und Logo bleiben austauschbar (zwei Dateien, zwei Zeilen).
