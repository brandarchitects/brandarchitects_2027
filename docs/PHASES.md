# Bauplan und Stand

Reihenfolge nach Risiko (siehe docs/briefings/tech-briefing-v2.md Kap. 6). Eine Phase = ein Branch. Status hier nachführen.

| Phase | Ziel | Status | Bemerkung |
|---|---|---|---|
| 0 – Fundament | Repo, Next.js 16, next-intl, Sanity-Schema + Studio, Content-API, alle Routen, Formular-Endpunkt, SEO-Endpunkte, Doku | ✅ 15.09.2026 | Gestaltung = bewusst roh (Tokens als Platzhalter) |
| 1 – Sanity live + Seed | Sanity-Projekt (Pascal), env in Vercel, Seed, Webhook, erster Deploy zeigt Inhalte | ✅ 15.09.2026 | Vercel-Projekt verknüpft, Sanity über Vercel-Integration, Seed per SEED_ON_BUILD, CORS, Webhook getestet. Live: https://brandarchitects2027.vercel.app |
| 2 – Formular scharf | Resend-Konto direkt auf resend.com (nicht Vercel-Integration: verlangt Domain in Vercel und Bezahlplan für EU-Region), Domain verifiziert, API-Key in Vercel, Test-Anfrage im Postfach; ohne-JS-Pfad getestet | ☐ | braucht DNS-Zugriff; Region us-east-1 (Free) akzeptiert, siehe ADR-011 |
| 2b – Seiten-Review | Jede Seite gegen Briefing 3.1 (Texte) und Struktur 1.3 (Gefässe/Module) prüfen; Bericht → Korrekturen in Seed/Studio und Templates | ◐ 15.09.2026 | Durchgang 1 erledigt: `docs/SEITEN-REVIEW.md`. Code- und Gefäss-Befunde umgesetzt; Redaktionsvorschläge (◐) und Pascal-Liste offen. Seed läuft automatisch (ADR-013) |
| 3 – Design-System | `docs/design-spec.md` → Tokens, Schrift (next/font/local), alle 10 Module gestaltet, Motion sparsam | ◐ v2 gebaut 15.09.2026 | Grundlage: Pascals «AI Design & Build Prompt» (ADR-014); v1 abgelehnt, v2 nach Prototyp-Referenz (ADR-015): Vermillon, schwere Schnitte, Reel, Reveals, Cases gross. Branch `design/v1`, Vorschau zeigt Demo-Inhalte. Spec `docs/design-spec.md` v2. **Abnahme durch Pascal offen**, dann Merge nach main |
| 4 – Leitcases | Geberit + TrustWork im Studio mit Bildern; Fallseiten-Template final | ☐ | Case-Inventar, Freigaben |
| 5 – Inhalte final | Alle Seiten mit finalen Texten, Impressum/Datenschutz Endfassung, OG-Bilder | ☐ | |
| 6 – SEO-Abnahme | Prüfliste docs/SEO.md; Redirects; Rich-Results-Test | ☐ | |
| 7 – Abnahme | Briefing Kap. 11 + Struktur Kap. 10; Lighthouse; Tastatur; Playwright-Smoke | ☐ | |
| 8 – Zukunftstest | EN-Dummy aktivieren, prüfen, wieder deaktivieren | ☐ | docs/I18N.md |
| 9 – Go-Live | Domain auf Vercel, www-Redirect, Search Console, Sitemap | ☐ | DNS |
| 10 – Nach Launch | Google Business Profile, Anfragen-Liste, Messung | ☐ | |

## Bekannte Platzhalter (vor Launch entfernen)
- `app/opengraph-image.tsx`: System-Grotesk statt Archivo (Satori liest kein woff2); Farben nach Spec
- Wortmarke typografisch in Header/Footer, bis Logo (SVG) vorliegt
- Brand Reel: `public/media/reel-placeholder.webm` + `reel-poster.jpg` (kinetische Typografie) – durch echtes Reel ersetzen
- Platzhalter-Cases Geberit/TrustWork/Socar (`scripts/mock-cases.ts`, `public/design-study/*.svg`) nur in Vorschau/`CONTENT_MOCK=1`; Production zeigt Cases erst, wenn sie im Studio publiziert sind
- `lib/content/index.ts`: Vorschau-Deployments lesen Mock statt Sanity (ADR-015) – entfernen, sobald echte Cases publiziert sind
- Sanity: Impressum/Datenschutz enthalten «PLATZHALTER»-Text (Seed)
- `siteSettings.email` leer (Seed) – im Studio setzen
- `next.config.ts` → `redirects()` leer
- `components/modules/Header.tsx`: Sprachschalter erst mit Sprache 2
- Seed: Redaktionsvorschläge (◐ in `docs/SEITEN-REVIEW.md`) – von Pascal freigeben oder im Studio ändern

## Offene technische Punkte
- Vercel: `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SITE_URL`, `CONTACT_TO`, `SANITY_REVALIDATE_SECRET` gelten nur für Production. Vor Phase 3 (Design-Branches mit Preview-URLs) auf Preview erweitern; Code hat Rückfallwerte, daher nicht blockierend.

## Offene Entscheide (Pascal)
- Zweite Sprache: EN oder FR?
- Schrift mit Web-Lizenz
- DNS/Registrar von brandarchitects.ch, heutiges Mail-Setup
