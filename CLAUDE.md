@AGENTS.md

# CLAUDE.md – brandarchitects.ch (Website 2027)

Website der Brand Architects Design GmbH, Würenlos. Next.js 16 (App Router) · Sanity · next-intl · Tailwind v4 · Vercel.
Pascal Frey (Inhaber, Creative Director) ist kein Entwickler: erkläre Entscheide in einem Satz, frag bei Unklarheit statt zu raten, liefere Vorschauen (Preview-URL, Screenshot), keine Beschreibungen von Gestaltung.

## Zuerst lesen
- `docs/PHASES.md` – wo wir stehen, was als Nächstes kommt
- `docs/ARCHITECTURE.md` – wie das Projekt aufgebaut ist
- `docs/briefings/briefing-3-1.md` – Inhalte, Sitemap, Website-Texte, Abnahmekriterien (inhaltlich verbindlich)
- `docs/briefings/struktur-1-3.md` – Module, Formular, Abnahmeliste
- `docs/CONTENT-RULES.md` – Sprache, Sperrliste, Referenzregeln
- `docs/SEO.md`, `docs/I18N.md`, `docs/SANITY.md` – je nach Aufgabe
- `docs/design-spec.md` – sobald vorhanden (Phase 3): gestalterisch verbindlich

Was dort nicht steht, wird nicht erfunden: keine Kennzahlen, Kundennamen, Zitate, Platzhalter auf fertigen Seiten. Fehlendes im Abschlussbericht auflisten.

## Befehle
```
npm run dev          # http://localhost:3000, Studio /studio
npm run build        # vor jedem Commit grün
npm run lint         # vor jedem Commit grün
npm run typecheck
npm run typegen      # nach Schema-Änderungen
npm run seed         # Sanity-Erstbefüllung (braucht SANITY_WRITE_TOKEN)
```

## Regeln
1. **Server-Komponenten sind Standard.** `'use client'` nur für Mobile-Navigation, Formular, künftige Motion-Wrapper. Jedes neue `'use client'` wird im Commit begründet. Keine Client-Komponente, die nur Daten anzeigt.
2. **Inhalte nur über `lib/content/`.** Kein Template ruft Sanity direkt. Neue Daten: Schema → `typegen` → `queries.ts` → `types.ts` → Komponente.
3. **Sitemap 1:1** aus Briefing Kap. 8.2. Keine zusätzlichen Seiten, keine Ortsseiten, kein Blog.
4. **UI-Texte aus `messages/<locale>.json`** (Buttons, Labels, Fehlermeldungen). Nichts Übersetzbares hart im JSX – Ausnahme: Überschriften-Fallbacks, die aus Sanity kommen sollten, sind als TODO markiert.
5. **Links nur über `Link` aus `i18n/navigation.ts`**, nie `next/link`. `generateMetadata` immer über `buildMetadata()` aus `lib/seo/metadata.ts` (Canonical, hreflang, OG).
6. **Jedes Sanity-Dokument trägt `language`**; jede GROQ-Abfrage filtert `language == $locale`.
7. **Module wiederverwenden** (`components/modules/`). Keine Seite bekommt ein Sonderlayout, das nur dort existiert. Neue Module nur, wenn das Struktur-Briefing sie kennt oder Pascal es entscheidet.
8. **Sprache:** Schweizer Hochdeutsch, `ss`, Sie. Sperrliste aus `docs/CONTENT-RULES.md` – Prüfbefehl dort vor jedem Commit ausführen.
9. **Personen/Arbeitgeber:** kein Swisscom-Bezug, nirgends. Pascal Frey nur an den Stellen aus Briefing Kap. 4.3.
10. **Cases:** Pflichtfelder im Schema; `materialCleared` steuert Sichtbarkeit. JvM-Projekte ausgeschlossen. Keine Case-Texte erfinden.
11. **Formular:** Verhalten wie in `app/api/contact/route.ts` dokumentiert; ohne JavaScript funktionsfähig; keine Formularinhalte in Logs/Analytics; keine Antwortfrist im Text.
12. **SEO:** Metadata, JSON-LD, Sitemap, llms.txt sind Teil jeder inhaltlichen Änderung – `docs/SEO.md` Prüfliste. Keine Inhalte nur für Bots.
13. **Barrierefreiheit:** tastaturbedienbar, sichtbarer Fokus, Kontrast ≥ 4.5:1, eine H1 pro Seite, `prefers-reduced-motion` respektiert.
14. **Performance:** keine UI-Bibliotheken (kein shadcn, kein MUI), keine Icon-Fonts, keine externen Skripte ausser Vercel Analytics. Kein zeitbasiertes `revalidate` auf Seiten (Sanity-Quota) – Invalidierung läuft über den Webhook.
15. **Sanity-Quota schonen:** keine Abfragen in Client-Komponenten, keine Abfragen pro Request in Layouts ausser `getSiteSettings` (getaggt).
16. **Dokumentieren:** Jede Datei beginnt mit einem Kommentar, der sagt, was sie tut und warum. Neue Entscheide → `docs/DECISIONS.md`. Phase erledigt → `docs/PHASES.md`. Neuer Platzhalter → Liste in `docs/PHASES.md`.
17. **Git:** Branch pro Phase (`phase/3-design`), kleine Commits, sprechende Nachrichten auf Deutsch. `main` = Produktion, Merge nach Abnahme. Keine Secrets, keine `.env.local`.
18. **Abschluss jeder Session:** Bericht – was gebaut, was offen, Preview-URL, fehlende Inhalte, neue `'use client'`, geänderte Doku.

## Nicht tun
- Kein CMS-Ersatz, keine Datenbank, kein Auth, kein Newsletter, kein Chatbot, keine Suche, kein Portfoliofilter.
- Kein Code aus dem alten Prototyp `brandarchitects` (Astro).
- Keine Abhängigkeiten ohne Grund im Commit. Keine Design-Entscheide vor `docs/design-spec.md`.
- Keine Texte «verbessern», die im Briefing als Website-Text markiert sind. Vorschläge in den Bericht.
