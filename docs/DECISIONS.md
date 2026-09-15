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
