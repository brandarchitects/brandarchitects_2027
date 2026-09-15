# Design-Spec v2 – brandarchitects.ch

**Stand:** 15.09.2026 · **Version:** 2 (ersetzt v1) · **Grundlage:** «Brand Architects — AI Website Design & Build Prompt» (Pascal, 15.09.2026), Rückmeldung zu v1 («stärkere Fonts, bessere Micro-Animationen, spannendere Struktur, Brand-Video-Reel, Cases prominent»), Relaunch-Prototyp «Delta» als Referenz für Haltung – nicht für Code, Briefing 3.1 Kap. 8.9, Struktur 1.3 Kap. 6
**Status:** Umgesetzt auf Branch `design/v1` (Vorschau-URL aus Vercel, zeigt Demo-Inhalte – siehe Kap. 4). Entscheid durch Pascal Frey: ☐ offen
**Regel:** Dieses Dokument enthält Entscheide, keine Optionen. `[offen – Pascal]` markiert, was nur er entscheiden kann.

## 1. Haltung

**Drei Adjektive:** kräftig · editorial · präzis.
**Die eine mutige Stelle:** die **Headline in Vermillon**. Eine schwere, breite Grotesk (Archivo, Gewicht 740, Breite 116) trägt jede Seite; im Hero steht der letzte Satz in Vermillon und die Zeilen kommen einzeln aus einer Maske hoch. Dasselbe Rot sitzt sonst nur an wenigen Stellen: Ziffern der Leistungs- und Situationslisten, Wortmarken-Punkt, Fokusring, Label «Ergänzend».
**Zweiter Zug:** Bewegung, die Ordnung schafft. Das Brand Reel weitet sich beim Scrollen vom Seitenrand auf die volle Breite; Sektionen erscheinen beim Einscrollen; die Zahlenzeile zählt einmal hoch. Alles unter einer Sekunde, nichts wiederholt sich, nichts blockiert.
**Dritter Zug:** die Arbeit gross. Erste Fallkachel volle Breite (16:10), zweite versetzt auf sieben Spalten. Der dunkle Schluss (Kontakt + Footer auf Tinte) bleibt aus v1.
**Was die Website nicht ist:** kein Produkt-UI, keine drei gleichen Karten, keine Pillen, keine Verläufe, keine Schatten, keine Illustrationen, kein Porträt im Hero, keine Logowand, kein Scroll-Hijacking, kein Loader.

## 2. Tokens

### Farbe (app/globals.css → `@theme`)
| Token | Wert | Verwendung | Kontrast |
|---|---|---|---|
| `ink` | #121212 | Text, starke Linien, Schaltflächen, dunkle Flächen, Reel-Rahmen | auf paper 17.5:1 |
| `ink-soft` | #2a2a28 | Nebentext auf paper-2, Hover auf Tinte-Schaltflächen | – |
| `paper` | #f7f6f2 | Grundfläche (warmes Off-White) | – |
| `paper-2` | #ecebe5 | zweite Fläche: Standortbestimmung, Bildhintergrund | Text ink 15.6:1 |
| `muted` | #5f5e5a | Nebentext, Labels | auf paper 6.4:1 |
| `line` | #d6d3ca | Haarlinien | dekorativ |
| `accent` | #d9451c | **Vermillon**: Hero-Schluss-Satz, Listenziffern, Wortmarken-Punkt, Fokusring, Listenstriche | auf paper 4.0:1 – nur für Text ≥ 24 px und Grafik, nie für Lesegrössen |
| `accent-deep` | #b4360f | Vermillon für kleinen Text: Label «Ergänzend», Karten-Hover «Case ansehen», Link-Hover | auf paper 5.6:1 |
| `accent-on-ink` | #f0602f | Akzent auf dunklen Flächen | auf ink 5.7:1 |
| `error` / `success` | #a3271c / #2f6b3a | Formularzustände | ≥ 5:1 |

Entscheid: ein warmes Rot statt des Messings aus v1 – es hält der schweren Schrift stand und ist die Farbe des Prototyps, den Pascal als Richtung genannt hat. Für kleinen Text immer `accent-deep`. Kein Verlauf, kein zweiter Akzent.

### Schrift
- **Familie:** Archivo Variable (Omnibus-Type), Achsen wght 100–900, wdth 62–125. Lizenz SIL OFL 1.1, Dateien `app/fonts/`, geladen über `next/font/local`, `display: swap`. Eine Familie, kein Monospace.
- **Entscheid v2:** deutlich schwerere und breitere Schnitte für Headlines (740/116 statt 600/112). Die Breitenachse bleibt die Handschrift: Labels schmal (82), Headlines breit (108–116). `[offen – Pascal]`: bleibt Archivo oder kommerzielle Schrift? Wechsel = Dateien in `app/fonts/` und zwei Zeilen in `layout.tsx`.
- **Skala** (fluid, `clamp`), Utilities in globals.css:

| Utility | Grösse | Zeile | Laufweite | Gewicht | Breite | Einsatz |
|---|---|---|---|---|---|---|
| `display` | 48–116 px | 0.94 | −0.035em | 740 | 116 | Hero-H1 (Zeilen maskiert) |
| `h1` | 40–80 px | 0.98 | −0.03em | 700 | 112 | Seiten-H1, Kontaktabschluss, Standortbestimmung |
| `h2` | 30–50 px | 1.04 | −0.024em | 680 | 108 | Sektionstitel, Leistungszeilen, grosse Fallkachel, Agentur-Aussage |
| `h3` | 20–24 px | 1.2 | −0.01em | 600 | 102 | Kacheln, Situationen, Schritte, FAQ |
| `stat` | 48–104 px | 0.9 | −0.04em | 700 | 112 | Zahlenzeile (tabular) |
| `lead` | 19–23 px | 1.42 | −0.005em | 400 | 100 | Einleitungen |
| Body | 17 px | 1.55 | 0 | 400 | 100 | Fliesstext |
| `body-sm` | 15 px | 1.5 | 0 | 400 | 100 | Legenden, Hinweise |
| `label` | 12 px | 1.2 | +0.08em, Versalien | 500 | 82 | Sektionslabels, Herkunft, Kachelzeile |
| `index` | 44–80 px | 0.9 | −0.04em | 300 | 70 | Sektions- und Leistungsziffern (Vermillon) |
| `index-sm` | 24 px | 1 | −0.03em | 300 | 72 | Situations- und Menüziffern |
| `wordmark` | 18 px | 1 | −0.02em | 700 | 116 | Wortmarke, Punkt in Vermillon |

- Zeilenlänge Fliesstext: `--max-width-measure: 64ch`. Text immer linksbündig. Hero-H1 ohne Breitenlimit – der Satz bestimmt die Zeile.

### Abstände
4-px-Basis (Tailwind). Fluid: `--spacing-section: clamp(5rem, 3.5rem + 6vw, 9rem)` zwischen Sektionen, `--spacing-group: clamp(2.5rem, 2rem + 2vw, 4rem)` zwischen Kopf und Inhalt. Der Hero endet vor dem Reel; das Reel füllt auf dem Desktop rund 60 % der Höhe.

### Raster
12 Spalten, Gutter 24 px, Max-Breite 1440 px, Seitenrand `clamp(1.25rem, 4vw, 4rem)`. Zweiteilung im Innern: **Spalten 1–3 Label/Ziffer, Spalten 4–12 Inhalt** – Seitenkopf, Leistungs-, Fall- und Kontaktseite folgen ihr. Hero (Text rechts), Reel (volle Breite) und die versetzte zweite Fallkachel (Spalten 6–12) brechen sie bewusst.

### Radius, Linien, Schatten
Radius 0 überall. Linien: `line` 1 px als Haarlinie, `ink` 1 px als Sektionsstart. Keine Schatten.

## 3. Module (components/modules)
1. **Header:** sticky, Papier, Haarlinie. Wortmarke typografisch mit Vermillon-Punkt, bis das Logo vorliegt. Nav-Links mit aufbauendem Unterstrich; CTA als Tinte-Schaltfläche. Mobil: vollflächiges Tinte-Menü mit Ziffern, Escape schliesst, Scroll gesperrt.
2. **Hero:** Label → Display-H1, satzweise in Zeilen zerlegt, jede Zeile steigt aus einer Maske (900 ms, Versatz 120 ms), letzter Satz Vermillon → Einleitung und Aktionen in Spalten 7–12. Kein Bild im Hero; darunter folgt das Reel – nach Einordnung, H1, Erklärung und Aktionen, wie Struktur 1.3 Kap. 4 verlangt (keine Videosequenz vor der Erklärung).
3. **Brand Reel (neu, `Reel.tsx`):** Video 16:7 auf Tinte, stumm, Schleife, `playsInline`, pausiert ausserhalb des Viewports. Startet am Seitenrand und weitet sich beim Scrollen auf die volle Breite (CSS `animation-timeline: scroll()`, ohne Unterstützung: volle Breite). Bei reduced-motion: Poster und Bedienelemente statt Autoplay. Aktuell Platzhalter-Reel (kinetische Typografie mit Briefing-Sätzen) – `[offen – Pascal]`: echtes Reel liefern (WebM/MP4 ≤ 4 MB, 16:7).
4. **Projektkachel:** Bild 16:10 (Hotspot-Beschnitt, Hover-Zoom 1.02 in 600 ms), darunter Label «Kunde · Herkunft · Jahr», Aufgabe als Titel (`h2` auf der grossen Kachel, sonst `h3`), Beitrag. Hover blendet «Case ansehen» in `accent-deep` ein. Startseite: erste Kachel volle Breite, zweite versetzt 7 Spalten; Übersicht: erste volle Breite, dann 7/5 im Wechsel, die schmale 6 rem tiefer.
5. **Zahlenzeile (neu, Startseite):** drei belegbare Grössen aus dem Briefing (20+ Jahre Markenarbeit, 7+ Jahre Brand Architects, 4 Schritte), `stat`, zählen einmal in 1 s hoch. Inhalt aus `home.stats` (Studio). Keine erfundenen Kennzahlen.
6. **Bild mit Legende:** ungeschnitten auf `paper-2`, Legende `body-sm` unter Haarlinie in Lesebreite. Fallseite-Bilder dürfen breiter laufen als der Text.
7. **Leistungsmodul:** Zeile – Ziffer in Vermillon (2 Sp.), Bereich als `h2` (4 Sp.), Anlass/Ergebnis (5 Sp.), Pfeil. Die ergänzende KI-Zeile mit Label «Ergänzend» in `accent-deep`, Ziffer «+» gedämpft.
8. **Sektionskopf:** Haarlinie, Ziffer 01–06, Label, Titel – ordnet die Startseite wie ein Inhaltsverzeichnis. Standortbestimmung trägt die Ziffer 04 gross in Vermillon auf `paper-2`.
9. **Prozessschritt:** vierspaltiger Ledger, Ziffer, Titel, Text, optional «Ihre Mitwirkung».
10. **Zitat / FAQ:** wie v1 – starke Haarlinie und `lead` mit «»; FAQ als native `details`, Plus dreht sich zu ×.
11. **Kontaktabschluss + Formular:** Abschluss auf Tinte, `h1` links, Text und CTA rechts, E-Mail als gleichwertiger Weg. Formular: Felder als Linien, Fokus wandert zum Akzent, Interessenfelder als Kästchen mit Häkchen; Erfolg als Lead unter starker Linie; Fehler in `error`.
12. **Footer:** auf Tinte, drei Spalten (Firma/Adresse · Hauptseiten · Rechtliches).

Zustände aller Interaktionselemente: default · hover · active (1 px nach unten) · focus-visible (2 px Akzentring, Offset 3 px) · disabled (50 %) · loading (Text «Wird gesendet …») · error · success.

## 4. Bild- und Demo-Inszenierung
Kacheln 16:10 mit Sanity-Hotspot. Fallseite: Hauptbild und Anwendungsbilder ungeschnitten in ihrem Format. Legende immer sichtbar. Hintergrund `paper-2` als Ladefläche, LQIP aus Sanity. Kein Geräte-Mockup.
**Design-Demo (ADR-015):** Solange keine freigegebenen Cases im Studio liegen, zeigen Vorschau-Deployments (Vercel Preview) und `CONTENT_MOCK=1` die Seed-Inhalte plus drei Platzhalter-Cases Geberit, TrustWork, Socar (`scripts/mock-cases.ts`, Texte aus dem Prototyp, mit `[PLATZHALTER]`-Marken) und Keyvisual-Platzhalter (`public/design-study/*.svg`, dunkle Fläche, Kunde als Wort, Vermerk «wird durch Projektbild ersetzt»). Production liest immer Sanity; die Platzhalter werden nie nach Sanity geschrieben.

## 5. Bewegung (components/motion/MotionLayer.tsx + globals.css)
- **Prinzip:** jede Bewegung hat einen Zweck (Eintritt, Orientierung, Rückmeldung). Einmalig, kurz, unterbrechbar. Ohne JavaScript ist alles sichtbar (Klasse `html.js` schaltet die Reveals erst frei).
- **Micro (160 ms, ease-out):** Schaltflächen-Farbe, Pfeil rückt 4 px, Link-Unterstreichung wechselt zum Akzent, Formularfokus.
- **Kontext (300 ms):** Nav-Unterstrich, FAQ-Plus-Rotation, Menü, Karten-Hover «Case ansehen».
- **Bild-Hover:** 600 ms Zoom 1.02.
- **Hero:** Zeilen steigen aus einer Maske (900 ms, Versatz 120 ms), Einleitung und Aktionen folgen mit 480 ms.
- **Reveal:** `[data-reveal]` – 20 px aufsteigen und einblenden, 700 ms, beim Erreichen von 12 % Sichtbarkeit, pro Element einmal; Listen mit 80–90 ms Versatz.
- **Reel:** Rahmen weitet sich scrollgetrieben über die ersten 55 vh (nur CSS, `@supports (animation-timeline: scroll())`).
- **Zahlen:** Count-up 1 s, cubic ease-out, einmal.
- **reduced-motion:** alle Animationen und Transitionen auf 0, `scroll-behavior: auto`, Reel ohne Autoplay mit Bedienelementen, alle Sektionen sofort sichtbar.

## 6. Zustände (global)
Fokusring 2 px `accent` (auf Tinte `accent-on-ink`), Offset 3 px. Fehlertext `error`, Erfolgstext unter starker Linie. Disabled 50 % ohne Hover. Ladezustand über Text, nicht über Spinner.

## 7. Nicht tun
Keine Verläufe · keine Schatten · keine Radien · keine Pillen · keine identischen Karten · keine ALL-CAPS-Titel (Versalien nur für 12-px-Labels) · kein «→» an jedem Link · keine Icons ausser Pfeil, Plus, Menü · keine Illustrationen, keine Stock-Fotos, kein Team-Bild · keine Zentrierung von Fliesstext · kein Vermillon auf Fliesstext in Lesegrösse (dort `accent-deep`) · keine Reveals auf Header, Footer, Formular.

## 8. Offen – Pascal
- Abnahme v2 auf der Vorschau-URL, mobil zuerst
- Brand Reel: echtes Video (16:7, stumm, ≤ 4 MB) ersetzt `public/media/reel-placeholder.webm` und `reel-poster.jpg`
- Bilder und Freigaben Geberit / TrustWork / Socar; Jahr, Rolle, Ergebnis der Platzhalter-Cases bestätigen, dann im Studio anlegen
- Schrift: Archivo (OFL) behalten oder kommerzielle Schrift lizenzieren
- Logo als SVG (ersetzt die typografische Wortmarke)
- OG-Bild: Archivo als TTF einbetten (Satori liest kein woff2) – bis dahin System-Grotesk in den Spec-Farben
