# brandarchitects.ch – Website 2027

Website der Brand Architects Design GmbH. Next.js 16 (App Router) · Sanity CMS · next-intl · Tailwind v4 · Vercel.

**Neu hier?** → [docs/ONBOARDING.md](docs/ONBOARDING.md) (15 Minuten bis zum laufenden Projekt).
**Mit Claude Code arbeiten?** → [CLAUDE.md](CLAUDE.md) wird automatisch gelesen.

## Schnellstart

```bash
cp .env.example .env.local     # Werte eintragen (siehe docs/SANITY.md)
npm install
npm run dev                    # http://localhost:3000  ·  Studio: http://localhost:3000/studio
```

## Befehle

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklung |
| `npm run build` | Produktions-Build – muss vor jedem Commit grün sein |
| `npm run lint` / `npm run typecheck` | Codequalität / Typen |
| `npm run seed` | Sanity mit den Website-Texten aus dem Briefing befüllen (einmalig, idempotent) |
| `npm run typegen` | TypeScript-Typen aus den Sanity-Schemas erzeugen |

## Dokumentation (docs/)

| Datei | Inhalt |
|---|---|
| `ONBOARDING.md` | Einstieg für neue Personen: Konten, Setup, erster Deploy |
| `ARCHITECTURE.md` | Wie das Projekt aufgebaut ist und warum; Datenfluss; wo was liegt |
| `DECISIONS.md` | Architektur-Entscheide mit Begründung (ADR) |
| `SANITY.md` | Sanity einrichten, Studio bedienen, Inhalte pflegen, Webhook |
| `I18N.md` | Mehrsprachigkeit: wie es gebaut ist, wie Sprache 2 dazukommt |
| `SEO.md` | SEO- und LLM-Sichtbarkeits-Konzept, Prüfliste |
| `CONTENT-RULES.md` | Sprache, Sperrliste, Referenzregeln (aus Briefing 3.1) |
| `PHASES.md` | Bauplan in Phasen, Stand, offene Punkte |
| `REDIRECTS.md` | Inventar alter URLs → neue Ziele |
| `briefing-3-1.md` | Inhaltliches Briefing (verbindlich) |
| `struktur-1-3.md` | Struktur-Briefing: Module, Formular, Abnahme |
| `tech-briefing.md` | Technisches Briefing (Ausgangsdokument) |

## Deployment

GitHub `main` → Vercel Produktion. Jeder Branch bekommt automatisch eine Vorschau-URL. Umgebungsvariablen in Vercel gemäss `.env.example`.
