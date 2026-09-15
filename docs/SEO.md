# SEO und LLM-Sichtbarkeit

Ziel: Sichtbar bei Google *und* in KI-Antworten (ChatGPT, Perplexity, Google AI Overviews, Claude) – ohne dass die Texte für Menschen schlechter werden. Grundsatz: **Was für LLMs gut ist, ist klarer Text mit klarer Struktur. Das ist dasselbe, was für Leser gut ist.** Keine Keyword-Stopfung, keine unsichtbaren Texte, keine Tricks.

## Was das Fundament (Phase 0) liefert
| Element | Umsetzung | Datei |
|---|---|---|
| Title / Description pro Seite | aus Sanity `seo`-Feld, Fallback aus Dokument; Vorgaben Briefing Kap. 8.10 | `lib/seo/metadata.ts` |
| Canonical, hreflang, x-default | automatisch für alle Sprachen | `lib/seo/metadata.ts` |
| Open Graph / Twitter Cards | pro Seite; Standardbild generiert | `app/opengraph-image.tsx` |
| Sitemap | alle Sprachen, Cases, Leistungen | `app/sitemap.ts` |
| robots.txt | alle Crawler erlaubt (inkl. KI-Bots), Studio/API gesperrt | `app/robots.ts` |
| Schema.org JSON-LD | Organization + ProfessionalService (areaServed Aargau, Zürich; Adresse Würenlos) + WebSite global; FAQPage wo FAQ sichtbar; CreativeWork + Breadcrumb pro Case | `lib/seo/jsonld.tsx` |
| llms.txt | maschinenlesbare Zusammenfassung aus denselben Inhalten | `app/llms.txt/route.ts` |
| Saubere URLs | Trailing Slash, keine Parameter ausser `/kontakt/?thema=` | `next.config.ts` |
| Semantik | eine H1 pro Seite, echte Überschriften-Hierarchie, `<article>`, `<dl>` für Fakten, `<figure>` mit Legende | Komponenten |
| Performance | statische Seiten, next/image (AVIF/WebP), keine externen Skripte ausser Analytics | – |
| Bilder | Alt-Text und Legende Pflichtfelder im CMS | Sanity-Schema |

## LLM-Optimierung – was wirklich zählt
Die Evidenz zu «GEO» ist jung; belastbar sind diese Punkte, und alle verbessern auch die Lesbarkeit:
1. **Direkte Antworten in den ersten Sätzen.** Jede Seite beantwortet ihre Käuferfrage (Passung · Kompetenz · Verlässlichkeit) oben, nicht unten. Das Briefing ist so geschrieben – beibehalten.
2. **Entitäten konsistent.** Firmenname, Ort, Leistungen, Gründer heissen überall gleich (Website, Schema.org, LinkedIn, Google Business Profile). `siteSettings` ist die eine Quelle.
3. **FAQ als echte Fragen mit vollständigen Antworten.** Werden als FAQPage ausgegeben und in `/llms.txt` gelistet. Antworten müssen für sich allein stehen (kein «siehe oben»).
4. **Cases mit klarer Struktur.** Situation → Frage → Auftrag → Entscheid → Ergebnis ist genau die Struktur, die Sprachmodelle gut zitieren. Ergebnisse konkret, mit sauberer Zuordnung.
5. **Crawler zulassen.** robots.txt erlaubt GPTBot, ClaudeBot, PerplexityBot, Google-Extended. Entscheid ADR-006.
6. **Aktualität.** «Aktuell»-Sektion oder Entscheidungsratgeber erst, wenn regelmässig gepflegt (Briefing). Veraltete Inhalte schaden mehr als fehlende.
7. **Nichts Verstecktes.** Keine Texte nur für Bots. Was ein Modell liest, liest auch ein Mensch.

## Regionale Sichtbarkeit (ohne Ortsseiten)
- Title der Startseite trägt «Aargau & Zürich»; Hero-Einordnung nennt die Region
- ProfessionalService-Schema mit `areaServed` und Adresse Würenlos
- Google Business Profile als Service-Area-Business (Pascal, nach Launch)
- Keine Ortsseiten («Branding Agentur Baden», …) – Entscheid im Briefing

## Vor dem Launch (Phase 6) prüfen
- [ ] Jede Seite: Title 50–60 Zeichen, Description 120–160, keine Sperrlisten-Begriffe
- [ ] Rich-Results-Test (search.google.com/test/rich-results) für Startseite, eine Leistungsseite, einen Case, Zusammenarbeit (FAQ)
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt` aufrufen und lesen
- [ ] Redirects aus `docs/REDIRECTS.md` einzeln testen
- [ ] Lighthouse mobil: Performance ≥ 90, SEO 100, Accessibility ≥ 95
- [ ] Search Console: Property anlegen, Sitemap einreichen
- [ ] OG-Bild pro Leitcase gesetzt
- [ ] hreflang nur für aktive Sprachen (bei nur DE: de-CH + x-default)

## Nach dem Launch
- Search Console: Indexierung, Suchanfragen, Core Web Vitals monatlich
- Anfragen-Liste: Thema, Region, Einstiegsseite (Briefing Kap. 10)
- Nach 6 Monaten: Titles/Descriptions anhand echter Suchanfragen nachschärfen
- Tiefen-Audit mit `seo-deep-audit` (Claude-Skill) nach Launch

## Rechtliches (Datenschutz)
Eingesetzte Dienste, die in der Datenschutzerklärung stehen müssen: Vercel (Hosting, USA/EU), Resend (E-Mail-Versand Formular), Vercel Web Analytics (cookielos, keine Personendaten), Sanity (CMS, Bilder-CDN). Kein Cookie-Banner nötig, solange keine Cookies gesetzt werden – Endfassung juristisch prüfen lassen.
