# Bauplan und Stand

Reihenfolge nach Risiko (siehe docs/briefings/tech-briefing-v2.md Kap. 6). Eine Phase = ein Branch. Status hier nachführen.

| Phase | Ziel | Status | Bemerkung |
|---|---|---|---|
| 0 – Fundament | Repo, Next.js 16, next-intl, Sanity-Schema + Studio, Content-API, alle Routen, Formular-Endpunkt, SEO-Endpunkte, Doku | ✅ 15.09.2026 | Gestaltung = bewusst roh (Tokens als Platzhalter) |
| 1 – Sanity live + Seed | Sanity-Projekt (Pascal), env in Vercel, Seed, Webhook, erster Deploy zeigt Inhalte | ✅ 15.09.2026 | Vercel-Projekt verknüpft, Sanity über Vercel-Integration, Seed per SEED_ON_BUILD, CORS, Webhook getestet. Live: https://brandarchitects2027.vercel.app |
| 2 – Formular scharf | Resend-Konto direkt auf resend.com (nicht Vercel-Integration: verlangt Domain in Vercel und Bezahlplan für EU-Region), Domain verifiziert, API-Key in Vercel, Test-Anfrage im Postfach; ohne-JS-Pfad getestet | ☐ | braucht DNS-Zugriff; Region us-east-1 (Free) akzeptiert, siehe ADR-011 |
| 2b – Seiten-Review | Jede Seite gegen Briefing 3.1 (Texte) und Struktur 1.3 (Gefässe/Module) prüfen: fehlende Texte, falsche Fassungen, fehlende oder überzählige Module, Reihenfolge; Bericht → Korrekturen in Seed/Studio und Templates | ◐ 15.09.2026 | Entscheid Pascal: parallel zu Design, damit Struktur-Erkenntnisse aus dem Design früh einfliessen |
| 3 – Design-System | `docs/design-spec.md` (swiss-design-brief) → Tokens, Schrift (next/font/local), alle 10 Module gestaltet, Motion sparsam | ◐ Start 15.09.2026 | **Startet jetzt**, parallel zu Phase 2 (Entscheid Pascal: Design kann Aufbau und Struktur beeinflussen, deshalb früh). Exploration im Claude-Projekt «BrandArchitects_Design» (docs/design/design-projekt-briefing.md); Abnahme durch Pascal |
| 4 – Leitcases | Geberit + TrustWork im Studio mit Bildern; Fallseiten-Template final | ☐ | Case-Inventar, Freigaben |
| 5 – Inhalte final | Alle Seiten mit finalen Texten, Impressum/Datenschutz Endfassung, OG-Bilder | ☐ | |
| 6 – SEO-Abnahme | Prüfliste docs/SEO.md; Redirects; Rich-Results-Test | ☐ | |
| 7 – Abnahme | Briefing Kap. 11 + Struktur Kap. 10; Lighthouse; Tastatur; Playwright-Smoke | ☐ | |
| 8 – Zukunftstest | EN-Dummy aktivieren, prüfen, wieder deaktivieren | ☐ | docs/I18N.md |
| 9 – Go-Live | Domain auf Vercel, www-Redirect, Search Console, Sitemap | ☐ | DNS |
| 10 – Nach Launch | Google Business Profile, Anfragen-Liste, Messung | ☐ | |

## Bekannte Platzhalter (vor Launch entfernen)
- `app/globals.css`: Design-Tokens (Farben, Schrift, Abstände)
- `app/opengraph-image.tsx`: Gestaltung des Standardbilds
- `public/fonts/`: lizenzierte Schriftdateien fehlen; Layout nutzt System-Schrift
- Sanity: Impressum/Datenschutz enthalten «PLATZHALTER»-Text (Seed)
- `siteSettings.email` leer (Seed) – im Studio setzen
- `next.config.ts` → `redirects()` leer
- `components/modules/Header.tsx`: Sprachschalter erst mit Sprache 2

## Offene technische Punkte
- Vercel: `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SITE_URL`, `CONTACT_TO`, `SANITY_REVALIDATE_SECRET` gelten nur für Production. Vor Phase 3 (Design-Branches mit Preview-URLs) auf Preview erweitern; Code hat Rückfallwerte, daher nicht blockierend.

## Offene Entscheide (Pascal)
- Zweite Sprache: EN oder FR?
- Schrift mit Web-Lizenz
- DNS/Registrar von brandarchitects.ch, heutiges Mail-Setup
