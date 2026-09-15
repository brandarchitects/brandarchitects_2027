# Architektur

## Überblick

```
Redaktion ──(Studio /studio)──▶ Sanity Content Lake ──(GROQ, lib/content)──▶ Next.js (Vercel) ──▶ Besucher
                                        │                                       ▲
                                        └── Webhook /api/revalidate ────────────┘  (Seiten neu bauen nach Publish)

Besucher ──(POST /api/contact)──▶ Route Handler ──▶ Resend ──▶ Postfach
Besucher ──(Events)──▶ Vercel Web Analytics (cookielos)
```

## Prinzipien
1. **Inhalte nur über `lib/content/`.** Kein Template spricht direkt mit Sanity. Wechselt die Quelle, ändert sich eine Datei.
2. **Server-Komponenten sind Standard.** `'use client'` nur bei echter Interaktion (Mobile-Nav, Formular). Hält die Site schnell.
3. **Ein Dokument, viele Ansichten.** Ein Case speist Karte, Startseite und Fallseite.
4. **UI-Text ≠ Inhalt.** Buttons/Labels in `messages/<locale>.json`; redaktionelle Inhalte in Sanity. Beides pro Sprache.
5. **Statisch, mit gezielter Invalidierung.** Seiten werden beim Build erzeugt; Sanity-Publish invalidiert per Tag (kein Zeit-Intervall → schont Sanity-Free-Quota).

## Ordner
| Pfad | Inhalt |
|---|---|
| `app/[locale]/` | Alle Seiten der Sitemap (Briefing Kap. 8.2). `_page-template.tsx` = gemeinsames Template für «page»-Dokumente |
| `app/api/contact/` | Formular-Endpunkt (Zod, Honeypot, Resend) |
| `app/api/revalidate/` | Sanity-Webhook |
| `app/studio/` | Sanity Studio (eigenes Root-Layout, noindex) |
| `app/sitemap.ts`, `robots.ts`, `llms.txt/`, `opengraph-image.tsx` | SEO-Endpunkte |
| `components/modules/` | Die 10 Module aus dem Struktur-Briefing (Header, Hero, ProjectCard, FigureImage, ServiceModule, ProcessSteps, QuoteBlock, Faq, ContactClose, Footer) |
| `components/forms/` | Kontaktformular (Client) |
| `components/portable-text/` | Rendering von Rich Text aus Sanity |
| `lib/content/` | `index.ts` (öffentliche API), `queries.ts` (GROQ), `types.ts` |
| `lib/seo/` | Metadata-Builder, JSON-LD |
| `lib/schemas/` | Zod-Validierung |
| `lib/image.ts` | Bild-Abstraktion (Sanity-CDN → next/image) |
| `sanity/` | Schemas, Client, Studio-Struktur. `sanity.config.ts` im Root |
| `i18n/` | Routing, Request-Config, Navigation (next-intl) |
| `proxy.ts` | Sprach-Auflösung (Next.js 16 «proxy», früher middleware) |
| `messages/` | UI-Texte pro Sprache |
| `scripts/seed.ts` | Erstbefüllung von Sanity aus dem Briefing |
| `docs/` | Diese Dokumentation + Briefings |

## Rendering pro Route
| Route | Modus | Grund |
|---|---|---|
| Startseite, Arbeiten, Leistungen, page-Seiten, Fallseiten | Statisch (SSG) + Tag-Revalidation | Schnell, günstig |
| `/kontakt/` | Dynamisch | liest `?thema=` und `?status=` |
| `/api/*` | Dynamisch | Serverlogik |
| `/studio` | Statisch (Client-App) | Sanity Studio läuft im Browser |
| `/llms.txt` | Statisch, 1 h Revalidation | Zusammenfassung für KI-Systeme |

## Datenschutz
- Formulardaten: nur Durchleitung an Resend → Postfach; keine Speicherung, kein Logging von Inhalten
- Analytics: cookielos, keine Formularinhalte
- Sanity: EU-Dataset wählen (Projekt-Einstellung) – Inhalte sind ohnehin Veröffentlichungsinhalte
- Schriften/Bilder: keine Fremd-CDNs ausser Sanity-CDN (Bilder)

## Kosten (laufend)
Vercel Pro (vorhanden) · Sanity Free · Resend Free · Vercel Web Analytics (im Plan). Zusätzlich: CHF 0.
