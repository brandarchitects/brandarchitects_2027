# Sanity – Einrichtung und Pflege

Für Pascal (keine Sanity-Vorerfahrung) und für alle, die Inhalte pflegen.

## Was Sanity ist – in drei Sätzen
Sanity speichert die Inhalte der Website als strukturierte Dokumente in der Cloud («Content Lake»). Das **Studio** ist die Redaktionsoberfläche – sie läuft in dieser Website unter `/studio`, ist aber Code in diesem Repo (`sanity/`). Die Website liest die Inhalte per Abfrage (GROQ) und baut daraus Seiten.

Das Datenmodell («Schema») definieren wir im Code. Das ist der Grund, warum Sanity gut zum Vibe Coding passt: Claude Code kann Felder anlegen, und das Studio zeigt sie sofort.

## Einmalige Einrichtung (Pascal, ca. 20 Minuten)

**Stand 15.09.2026:** Schritte 1, 2, 4 und 5 sind über die Vercel-Sanity-Integration erledigt (Projekt angelegt, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_WRITE_TOKEN`, `SANITY_API_READ_TOKEN` in Vercel gesetzt). Offen: 3 (CORS), 6 (Seed), 7 (Webhook) sowie von Hand `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SITE_URL`, `SANITY_REVALIDATE_SECRET`, `CONTACT_TO`, `CONTACT_FROM`.

1. **Konto und Projekt:** https://www.sanity.io → Sign up (mit GitHub oder Google) → «Create new project» → Name `brandarchitects`, Dataset `production`, Region **EU**. Free-Plan.
2. **Projekt-ID notieren:** Manage → Project → API → *Project ID*.
3. **CORS-Origins eintragen** (damit das Studio auf brandarchitects.ch und localhost läuft): Manage → API → CORS origins → `http://localhost:3000` und `https://brandarchitects.ch` (mit «Allow credentials»). Später auch die Vercel-Preview-Domain `https://*.vercel.app` bzw. die konkrete.
4. **Schreib-Token für das Seed-Skript:** Manage → API → Tokens → «Add API token», Name `seed`, Rolle **Editor**. Wert nur in `.env.local` – nie committen, nie in Vercel als NEXT_PUBLIC.
5. **Umgebungsvariablen setzen:** lokal in `.env.local`, in Vercel unter Settings → Environment Variables (siehe `.env.example`).
6. **Erstbefüllung ohne lokale Umgebung:** In Vercel → Settings → Environment Variables eine Variable `SEED_ON_BUILD` = `1` (Config, Production) anlegen → Deployments → Redeploy. Der Build führt `scripts/seed.ts` aus und legt Startseite, vier Leistungen, Seiten, FAQ und Website-Einstellungen mit den Briefing-Texten an (Build-Log zeigt «✓ N Dokumente geschrieben»). **Danach die Variable `SEED_ON_BUILD` wieder löschen**, sonst überschreibt jeder Deploy die Studio-Änderungen mit den Seed-Texten. Idempotent (mehrfach ausführbar). Lokal alternativ `npm run seed` mit Token in `.env.local`.
7. **Webhook für Revalidation:** Manage → API → Webhooks → Create:
   - URL `https://brandarchitects.ch/api/revalidate`
   - Dataset `production`, Trigger on: create, update, delete
   - Filter: leer · Projection: `{ "_type": _type }`
   - HTTP method POST · Secret: derselbe Wert wie `SANITY_REVALIDATE_SECRET` in Vercel
8. **Weitere Nutzer:** Manage → Members → Invite (Rolle Editor).

## Studio bedienen
- **Startseite:** ein Dokument; die Modulreihenfolge ist fix, die Texte editierbar.
- **Arbeiten (Cases):** ein Dokument pro Projekt. Pflichtfelder folgen der Case-Struktur des Briefings. Ein Case erscheint erst, wenn «Materialnutzung geklärt» gesetzt ist. «Auf der Startseite zeigen» + Reihenfolge steuern Modul 2 (max. 2).
- **Leistungen:** vier Dokumente. URL-Namen nicht ändern (`markenstrategie-positionierung`, `corporate-design-rebranding`, `digital-branding-webdesign`, `ki-branding-marketing`) – die Startseite erkennt die KI-Leistung am Slug.
- **Seiten:** Standortbestimmung, Zusammenarbeit, Über uns, Impressum, Datenschutz. Slugs fix.
- **FAQ:** eigene Dokumente; auf Seiten/Leistungen per Referenz eingebunden. Reine Textantworten (werden auch als FAQ-Schema für Google ausgegeben).
- **Website-Einstellungen:** Firmendaten, E-Mail, LinkedIn, Standard-SEO, Kurzbeschreibung für `/llms.txt`.
- **Publish:** Änderungen sind erst nach «Publish» live. Der Webhook aktualisiert die Website in Sekunden.
- **Vision (Tab im Studio):** GROQ-Abfragen testen – hilfreich beim Entwickeln.

## Bilder
Im Studio hochladen (Drag & Drop). Immer **Alternativtext** und **Legende** ausfüllen – beides Pflicht, aus gutem Grund (Barrierefreiheit, SEO, Briefing Kap. 8.9). Hotspot setzen, wenn das Bild beschnitten wird. Sanity liefert die Bilder über sein CDN, `next/image` optimiert Grösse und Format.

## Schema ändern (mit Claude Code)
1. Feld in `sanity/schemaTypes/<typ>.ts` ergänzen
2. `npm run typegen` (Typen), Abfrage in `lib/content/queries.ts` erweitern, Typ in `lib/content/types.ts` ergänzen
3. Komponente anpassen
4. Studio neu laden – Feld ist da

## Sprache 2
Siehe `docs/I18N.md`. Kurz: im Studio hat jedes Dokument ein Übersetzungs-Menü (Plugin document-internationalization); die Sprache muss in `sanity.config.ts` und `i18n/routing.ts` aktiviert sein.

## Free-Plan – was du wissen musst
Hart limitiert (keine Überraschungskosten): u. a. 2 Datasets, begrenzte API-Requests pro Monat. Für diese Website reichlich – weil die Website statisch ist und nur nach Publish neu liest. Nicht tun: `revalidate = 60` o. ä. auf Seiten setzen (das erzeugt laufend Requests). Wenn Kundenprojekte dazukommen: pro Kunde ein eigenes Sanity-Projekt.

## Export / Backup
`npx sanity dataset export production backup.tar.gz` – enthält alle Dokumente und Bilder. Gelegentlich ausführen; Sanity hält zusätzlich eine Versionshistorie pro Dokument.
