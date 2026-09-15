# Onboarding – in 15 Minuten arbeitsfähig

Für alle, die dieses Projekt übernehmen: Entwickler, Freelancer, oder Pascal selbst nach längerer Pause.

## 1. Was das ist
Die Agentur-Website von Brand Architects. Inhalte kommen aus **Sanity** (CMS), die Website ist eine **Next.js**-App auf **Vercel**. Gebaut wird mit **Claude Code** («Vibe Coding») – deshalb ist alles ausführlich dokumentiert und in `CLAUDE.md` stehen die Regeln, die die KI beim Bauen einhält.

## 2. Konten, die du brauchst
| Konto | Wofür | Zugang über |
|---|---|---|
| GitHub `brandarchitects` | Code | Pascal lädt dich ein |
| Vercel Team «Brand Architects' projects» | Hosting, Umgebungsvariablen, Logs | Pascal lädt dich ein |
| Sanity-Projekt «brandarchitects» | Inhalte, Studio | Pascal lädt dich ein (Rolle Editor oder Admin) |
| Resend | E-Mail-Versand des Formulars | nur bei Bedarf |

## 3. Lokal starten
```bash
git clone https://github.com/brandarchitects/brandarchitects_2027.git
cd brandarchitects_2027
npm install
cp .env.example .env.local   # Werte: Vercel → Settings → Environment Variables (oder von Pascal)
npm run dev
```
- Website: http://localhost:3000
- Studio: http://localhost:3000/studio (Login mit Sanity-Konto)

Ohne Sanity-Werte baut die Site trotzdem, zeigt aber leere Seiten («Rohbau»).

## 4. Wie ein Inhalt auf die Seite kommt
1. Redaktion ändert etwas im Studio und klickt **Publish**
2. Sanity ruft den Webhook `/api/revalidate` auf
3. Next.js baut die betroffenen Seiten neu (ISR) – nach wenigen Sekunden live

Kein Deploy nötig. Deploys braucht es nur bei Code-Änderungen.

## 5. Wie eine Code-Änderung live geht
1. Branch anlegen (`git checkout -b feature/xyz`)
2. Ändern, `npm run build` und `npm run lint` müssen grün sein
3. Push → Vercel erstellt eine Vorschau-URL (im PR verlinkt)
4. Prüfen, mergen nach `main` → Produktion

## 6. Wo was liegt
Siehe `ARCHITECTURE.md`. Kurz: Seiten in `app/[locale]/`, Bausteine in `components/`, Inhalte-Zugriff in `lib/content/`, Sanity-Schemas in `sanity/schemaTypes/`, UI-Texte in `messages/`.

## 7. Häufige Aufgaben
| Aufgabe | Wo |
|---|---|
| Text auf einer Seite ändern | Studio → Seiten / Startseite / Leistungen |
| Neuen Case anlegen | Studio → Arbeiten → Neu; alle Pflichtfelder; `Materialnutzung geklärt` setzen, sonst erscheint er nicht |
| Case auf Startseite | Studio → Case → «Auf der Startseite zeigen» + Reihenfolge (max. 2 werden gezeigt) |
| Button-Beschriftung / Fehlermeldung | `messages/de.json` |
| Neues Feld im CMS | `sanity/schemaTypes/…` → `npm run typegen` → `lib/content/queries.ts` → Komponente |
| Alte URL umleiten | `next.config.ts` → `redirects()`; Inventar in `docs/REDIRECTS.md` |
| Zweite Sprache | `docs/I18N.md` |
| Formular kommt nicht an | Vercel → Logs → `contact:` Fehler; Resend-Dashboard; `CONTACT_TO` prüfen |

## 8. Wenn etwas kaputt ist
- Build rot auf Vercel: Build-Log lesen; lokal `npm run build` reproduzieren
- Seite zeigt alte Inhalte: Webhook prüfen (Sanity → Manage → API → Webhooks → Attempts)
- Studio lädt nicht: `NEXT_PUBLIC_SANITY_PROJECT_ID` und CORS-Origin in Sanity Manage prüfen
