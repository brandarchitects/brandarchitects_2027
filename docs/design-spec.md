# Design-Spec v1 – brandarchitects.ch

**Stand:** 15.09.2026 · **Version:** 1 · **Grundlage:** «Brand Architects — AI Website Design & Build Prompt» (Pascal, 15.09.2026), Briefing 3.1 Kap. 8.9, Struktur 1.3 Kap. 6, Design-Projekt-Briefing
**Status:** Umgesetzt auf Branch `design/v1` (Vorschau-URL aus Vercel). Entscheid durch Pascal Frey: ☐ offen
**Regel:** Dieses Dokument enthält Entscheide, keine Optionen. `[offen – Pascal]` markiert, was nur er entscheiden kann.

## 1. Haltung

**Drei Adjektive:** präzis · editorial · ruhig.
**Die eine mutige Stelle:** das typografische **Register**. Eine einzige Schrift, die ihre Breite wechselt – schmale, leichte Registerziffern (01–05) und Labels ordnen jede Seite wie ein gedrucktes Inhaltsverzeichnis, breite, kräftige Headlines tragen die Aussage. Kein Effekt, kein Bild, kein Farbspiel: Die Handschrift entsteht aus Schriftbreite, Haarlinien und Proportion.
**Zweiter Zug:** der dunkle Schluss. Kontaktabschluss und Footer stehen auf Tinte und bilden auf jeder Seite ein Ende, das man nicht übersieht.
**Was die Website nicht ist:** kein Produkt-UI, keine drei gleichen Karten, keine Pillen, keine Verläufe, keine Schatten, keine Illustrationen, kein Porträt im Hero, keine Logowand.

## 2. Tokens

### Farbe (app/globals.css → `@theme`)
| Token | Wert | Verwendung | Kontrast |
|---|---|---|---|
| `ink` | #121212 | Text, Linien stark, Schaltflächen, dunkle Flächen | auf paper 17.5:1 |
| `ink-soft` | #2a2a28 | Hover auf Tinte-Schaltflächen | – |
| `paper` | #f7f6f2 | Grundfläche (warmes Off-White, gibt der Tinte Temperatur) | – |
| `paper-2` | #ecebe5 | zweite Fläche: Standortbestimmung, Bildhintergrund | Text ink 15.6:1 |
| `muted` | #5f5e5a | Nebentext, Labels, Registerziffern | auf paper 6.4:1 |
| `line` | #d6d3ca | Haarlinien | dekorativ |
| `accent` | #8a5607 | **flaches Messing**: Labels «Ergänzend», Listenstriche, Link-Hover, Fokusring | auf paper 5.1:1 |
| `accent-on-ink` | #e0a63a | Akzent auf dunklen Flächen | auf ink 9.1:1 |
| `error` / `success` | #a3271c / #2f6b3a | Formularzustände | ≥ 5:1 |

Entscheid: warmer, flacher Akzent statt Digitalblau. Kein Metall-Effekt, kein Verlauf. Reines Schwarz/Weiss nur, wo Bilder es verlangen (Bildinhalte bleiben unangetastet).

### Schrift
- **Familie:** Archivo Variable (Omnibus-Type), Achsen wght 100–900, wdth 62–125. Lizenz SIL OFL 1.1, Dateien `app/fonts/`, geladen über `next/font/local`, `display: swap`. Eine Familie, kein Monospace.
- **Geprüft:** deutsche Headlines und Fliesstext in Endgrössen gegen Schibsted Grotesk (Specimen). Archivo gewählt wegen der Breitenachse (Register) und der Nähe zur Schweizer Grotesk-Tradition. `[offen – Pascal]`: bleibt Archivo oder kommerzielle Schrift? Wechsel = Dateien in `app/fonts/` und zwei Zeilen in `layout.tsx`.
- **Skala** (fluid, `clamp`), Utilities in globals.css:

| Utility | Grösse | Zeile | Laufweite | Gewicht | Breite | Einsatz |
|---|---|---|---|---|---|---|
| `display` | 44–100 px | 0.98 | −0.028em | 600 | 112 | Hero-H1 |
| `h1` | 36–68 px | 1.02 | −0.022em | 600 | 108 | Seiten-H1, Kontaktabschluss |
| `h2` | 28–42 px | 1.08 | −0.016em | 600 | 104 | Sektionstitel |
| `h3` | 20–24 px | 1.2 | −0.01em | 600 | 102 | Karten, Zeilen, Schritte |
| `lead` | 19–23 px | 1.42 | −0.005em | 400 | 100 | Einleitungen |
| Body | 17 px | 1.55 | 0 | 400 | 100 | Fliesstext |
| `body-sm` | 15 px | 1.5 | 0 | 400 | 100 | Legenden, Hinweise |
| `label` | 12 px | 1.2 | +0.08em, Versalien | 500 | 82 | Register-Labels, Herkunft |
| `index` | 44–80 px | 0.9 | −0.04em | 300 | 70 | Registerziffern |
| `index-sm` | 24 px | 1 | −0.03em | 300 | 72 | Zeilenziffern |

- Zeilenlänge Fliesstext: `--max-width-measure: 64ch` (≈ 60–70 Zeichen). Einleitungen im Hero `40ch`. Text immer linksbündig.

### Abstände
4-px-Basis (Tailwind). Fluid: `--spacing-section: clamp(5rem, 3.5rem + 6vw, 9rem)` zwischen Sektionen, `--spacing-group: clamp(2.5rem, 2rem + 2vw, 4rem)` zwischen Kopf und Inhalt, Elemente 0.5–2rem. Kein leerer Viewport: Der Hero endet spätestens nach 70 % der Höhe, das erste Projekt folgt direkt.

### Raster
12 Spalten, Gutter 24 px, Max-Breite 1440 px, Seitenrand `clamp(1.25rem, 4vw, 4rem)`. Feste Zweiteilung im Innern: **Spalten 1–3 Register/Label, Spalten 4–12 Inhalt** – Seitenkopf, Leistungsseite, Fallseite, Kontakt folgen ihr. Hero und Kontaktabschluss brechen sie bewusst (Asymmetrie: Text rückt in die rechte Hälfte).

### Radius, Linien, Schatten
Radius 0 überall. Linien: `line` 1 px als Haarlinie, `ink` 1 px als Sektionsstart. Keine Schatten.

## 3. Module (components/modules)
1. **Header:** sticky, Papier, Haarlinie. Wortmarke typografisch (Archivo, Breite 112) bis das Logo vorliegt. Nav-Links mit aufbauendem Unterstrich; CTA als Tinte-Schaltfläche. Mobil: Vollflächiges Tinte-Menü mit Registerziffern, Escape schliesst.
2. **Hero:** Label → Display-H1 (max. 15 Zeichen breit) → Einleitung und Aktionen in der rechten Hälfte. Optionales Projektbild darunter, ungeschnitten. Eintritt einmalig 480 ms per CSS.
3. **Projektkarte:** Bild 4:3 (Hotspot-Beschnitt, Hover-Zoom 1.02 in 600 ms), Haarlinie, Kunde + Herkunft·Jahr in einer Zeile, Aufgabe, Beitrag. Auf Übersichten im Wechsel 7/5 Spalten, die schmale Karte 6rem tiefer.
4. **Bild mit Legende:** ungeschnitten auf `paper-2`, Legende `body-sm` unter Haarlinie in Lesebreite.
5. **Leistungsmodul:** Registerzeile – Ziffer (1 Sp.), Bereich (4 Sp.), Anlass/Ergebnis (6 Sp.), Pfeil. Die ergänzende KI-Zeile mit Label «Ergänzend» in Messing, Ziffer «+».
6. **Prozessschritt:** vierspaltiger Ledger, Registerziffer, Titel, Text, optional «Ihre Mitwirkung» mit Messing-Label.
7. **Zitat:** starke Haarlinie, `lead` mit «», Quelle als Label.
8. **FAQ:** native `details`, Frage `h3`/500, Plus dreht sich zu ×, Antwort in Lesebreite.
9. **Kontaktabschluss + Formular:** Abschluss auf Tinte, `h1` links, Text und CTA rechts, E-Mail als gleichwertiger Weg. Formular: Felder als Linien, Fokus wandert zum Messing-Akzent, Interessenfelder als Kästchen mit Häkchen; Erfolg als Lead unter starker Linie; Fehler in `error` mit Linie.
10. **Footer:** auf Tinte, drei Spalten (Firma/Adresse · Hauptseiten · Rechtliches), Haarlinie zum Kontaktabschluss.

Zustände aller Interaktionselemente: default · hover · active (1 px nach unten) · focus-visible (2 px Akzentring, Offset 3 px) · disabled (50 %) · loading (Text «Wird gesendet …») · error · success.

## 4. Bildinszenierung
Karten 4:3 mit Sanity-Hotspot. Fallseite: Hauptbild und Anwendungsbilder ungeschnitten in ihrem Format (Hoch- und Querformat erlaubt), Bilder dürfen breiter laufen als der Text. Legende immer sichtbar (Bild, Aufgabe, Beitrag). Hintergrund `paper-2` als Ladefläche, LQIP aus Sanity. Kein einheitliches Geräte-Mockup.
Für die Vorschau ohne echte Cases: zwei **Designstudien «kein Kundenauftrag»** (nur lokal, `scripts/mock-cases.ts`), nie in Sanity.

## 5. Bewegung
- **Prinzip:** jede Bewegung hat einen Zweck (Orientierung, Rückmeldung, Kontinuität). Kein Scroll-Hijacking, kein Loader, kein Autoplay, keine Fade-ups auf jeder Sektion.
- **Micro (160 ms, ease-out):** Schaltflächen-Farbe, Pfeil rückt 3 px, Link-Unterstreichung wechselt zum Akzent, Formularfokus.
- **Kontext (300 ms):** Nav-Unterstrich, FAQ-Plus-Rotation, Menü-Striche.
- **Bild-Hover:** 600 ms Zoom 1.02.
- **Der eine orchestrierte Moment:** Hero-Eintritt – Label, H1, Text, Aktionen steigen 12 px auf, 480 ms, Versatz 70 ms (CSS-Animation, kein JavaScript, keine kumulative Wartezeit).
- **reduced-motion:** alle Animationen und Transitionen auf 0, `scroll-behavior: auto`.

## 6. Zustände (global)
Fokusring 2 px `accent` (auf Tinte `accent-on-ink`), Offset 3 px. Fehlertext `error`, Erfolgstext unter starker Linie. Disabled 50 % ohne Hover. Ladezustand über Text, nicht über Spinner.

## 7. Nicht tun
Keine Verläufe · keine Schatten · keine Radien · keine Pillen · keine identischen Karten · keine ALL-CAPS-Titel (Versalien nur für 12-px-Labels) · kein «→» an jedem Link (Pfeil nur in Schaltflächen und Registerzeilen) · keine Icons ausser Pfeil, Plus, Menü · keine Illustrationen, keine Stock-Fotos, kein Team-Bild · keine Zentrierung von Fliesstext.

## 8. Offen – Pascal
- Schrift: Archivo (OFL) behalten oder kommerzielle Schrift lizenzieren
- Logo als SVG (ersetzt die typografische Wortmarke in Header und Footer)
- Bilder Geberit / TrustWork für Hero-Projektausschnitt und erste Karten
- OG-Bild: Archivo als TTF einbetten (Satori liest kein woff2) – bis dahin System-Grotesk in den Spec-Farben
- Abnahme v1 auf der Vorschau-URL, mobil zuerst
