# Design-Projekt «BrandArchitects_Design» – Briefing

> **Version:** 1.0 · **Erstellt:** 15. September 2026 · **Status:** Draft
> **Zweck:** Eigenständige Exploration von Haltung, Look & Feel, Typografie und Bewegung für brandarchitects.ch – in Versionen, getrennt vom Code-Projekt. Ergebnis jeder Runde ist eine `design-spec.md`, die Claude Code ohne Rückfragen umsetzt.
> **Rollen:** Pascal = Creative Director, trifft alle Gestaltungsentscheide. Claude = Design-Sparringspartner und Spezifizierer (Skill `swiss-design-brief`), nicht Entscheider.

---

## 1. Warum ein eigenes Projekt

Die Website ist die erste Arbeitsprobe der Agentur. Gestaltung ist hier kein Layer über dem Inhalt, sondern der Beweis für die Kompetenz, die verkauft wird. Deshalb wird sie nicht «nebenbei in Phase 3» entschieden, sondern exploriert wie ein Kundenprojekt: mehrere Richtungen, Vergleich, Entscheid, dann Ausarbeitung.

Technisch ist das vorbereitet: Im Code greifen alle Komponenten nur auf Design-Tokens zu, Inhalte kommen aus Sanity. Eine Design-Version ist ein Branch mit eigener Vorschau-URL – Versionen lassen sich nebeneinander am Handy vergleichen, mit echten Inhalten.

---

## 2. Projekt-Setup (Claude.ai)

| Element | Vorgabe |
|---|---|
| Projektname | `BrandArchitects_Design` |
| Projektwissen | Briefing 3.1 (Kap. 6.1 Botschaften, 7 Tonalität, 8.3 Modulfolge, 8.9 Gestaltung), Struktur-Briefing (Kap. 6 Module), dieses Dokument, später alle `design-spec-vN.md` |
| Skills | `swiss-design-brief` (Haltung, Tokens, Zustände), `brand-architects-website` (Positionierung als Rahmen), Design-Artefakt-Typ für Mockups |
| Projektbeschreibung | «Design-Exploration für brandarchitects.ch. Pascal Frey ist Creative Director und entscheidet. Claude erarbeitet Richtungen, Varianten und Spezifikationen nach swiss-design-brief. Ergebnis jeder Runde: design-spec.md für Claude Code. Inhalte sind fix (Briefing 3.1), Gestaltung ist offen.» |
| Nicht in diesem Projekt | Code, Sanity, SEO, Texte ändern |

---

## 3. Gestalterischer Rahmen (fix, aus Briefing 3.1)

- **Charakter:** Ruhig, präzise, eigenständig. Swiss Design als Basis mit erkennbarer Handschrift.
- **Kompetenz sichtbar durch:** Typografie, Komposition, Präsentation der Arbeit – nicht durch Effekte.
- **Bilder:** Starke Abbildungen realer Arbeiten mit kurzen Legenden (Bild, Aufgabe, Beitrag). Kein Porträt im Hero, keine Logowand.
- **Bewegung:** sparsam. Jede Bewegung hat einen Zweck (Orientierung, Feedback, Kontext).
- **Persönlichkeit:** genug, um als Designagentur erkennbar zu sein; Seriosität darf nicht in Beratungs-Beliebigkeit kippen.
- **Ausgangsmaterial:** bestehendes Logo und Identitätsvorgaben. Kein neuer Name.
- **Tonalität der Texte:** Präzise. Zugewandt. Souverän. – die Gestaltung muss dieselbe Haltung haben.

**Offene Achsen (das ist die Exploration):** Schrift · Farbsystem · Raster und Dichte · Bildinszenierung · Bewegungssprache · die eine mutige Stelle.

---

## 4. Explorationsplan in Runden

Jede Runde hat ein Ergebnis, das Pascal beurteilt. Keine Runde ohne Entscheid am Ende.

### Runde 0 – Bestandsaufnahme und Haltung (1 Session)
- Bestehendes Logo, Farben, Schriftvorgaben sichten (Pascal liefert Dateien)
- Referenzen benennen: 5–8 Websites, die die angestrebte Haltung verkörpern, und 3, die das Gegenbild sind – mit je einem Satz, was genau
- Ergebnis: **Haltungsblatt** (eine Seite): drei Adjektive, was die Website auf keinen Fall sein darf, die eine Stelle, an der Mut ausgegeben wird

### Runde 1 – Drei Richtungen (2 Sessions)
- Drei bewusst unterschiedliche Richtungen, je auf denselben drei Screens: Hero der Startseite, Projektkarte + Fallseiten-Einstieg, Leistungsseite
- Pro Richtung: Schrift (1–2 Familien, konkret benannt, Lizenzstatus), Farbsystem (4–6 Werte), Raster, Bildinszenierung, ein Satz zur Bewegungssprache
- Format: Design-Artefakte (Mockups) mit echten Briefing-Texten – keine Lorem-Texte
- Ergebnis: **Entscheid Pascal** für eine Richtung (oder Kombination, dann benennen, was woher)

### Runde 2 – Ausarbeitung der Richtung (2–3 Sessions)
- Alle 10 Module (Struktur-Briefing Kap. 6) in der gewählten Richtung, mobil und Desktop
- Alle Zustände: default, hover, active, focus, disabled, error; Formular mit Erfolg/Fehler; FAQ offen/zu; Navigation mobil offen/zu
- Typografische Skala, Zeilenlängen, Abstände als System (4/8-px-Basis)
- Ergebnis: **design-spec-v1.md** (Struktur Kap. 5) → Übergabe an Claude Code → Branch `design/v1` → Vorschau-URL

### Runde 3 – Bewegung (1–2 Sessions)
- Am laufenden Prototyp (Vorschau-URL), nicht am Mockup
- Micro-Interaktionen: Hover/Fokus, Links, Buttons, FAQ-Öffnen, Formular-Feedback
- Kontextwechsel: Seitenübergang, Bild-Reveal beim Scrollen, Navigation
- Der eine orchestrierte Moment (z. B. Hero-Aufbau beim ersten Laden)
- Ergebnis: **Motion-Kapitel** in design-spec-v1.md; Claude Code setzt um; Vergleich mit/ohne

### Runde 4 – Kritik und Version 2 (1–2 Sessions)
- Vorschau am echten Gerät, mit echten Cases, mit Abstand von ein paar Tagen
- Kritik nach Skill-Regel: «Bevor du etwas hinzufügst – braucht es das? Bevor du etwas weglässt – was fehlt dann?» Eine Sache entfernen.
- Optional: zweite Richtung aus Runde 1 als `design/v2` bauen lassen, wenn der Entscheid nicht sicher ist
- Ergebnis: **Entscheid für Launch-Version**, design-spec final

---

## 5. Struktur der `design-spec.md` (Übergabe-Artefakt)

Das einzige Dokument, das ins Code-Repo wandert (`docs/design-spec.md`). Es enthält Entscheide, keine Fragen. Claude Code liest es und übersetzt in `app/globals.css` (Tokens) und Komponenten.

```markdown
# Design-Spec vN – brandarchitects.ch
Stand · Version · Entscheid durch Pascal Frey am …

## 1. Haltung
Drei Adjektive. Die eine mutige Stelle. Was die Website nicht ist.

## 2. Tokens
### Farbe
- ink / paper / muted / line / accent … (Hex, Verwendung, Kontrast-Nachweis ≥ 4.5:1 für Text)
- Off-White/Off-Black begründet
### Schrift
- Familie(n), Schnitte, Lizenz (Web, Dateiquelle), Fallback-Stack
- Skala: display / h1 / h2 / h3 / lead / body / small – Grösse, Zeilenhöhe, Laufweite, mobil und Desktop
- Zeilenlänge Fliesstext (Zeichen)
### Abstände
- Basis (4/8 px), Skala, Sektionsabstand, Elementabstand, Gruppenabstand
### Raster
- Spalten, Gutter, Max-Breite, Randabstände mobil/Desktop, Ausrichtung (links/zentriert – Regel)
### Radius, Linien, Schatten
- Werte und Verwendung (Schatten nur als Tiefeninformation)

## 3. Module (je: Aufbau, Proportionen, Zustände, mobil)
1 Header · 2 Hero · 3 Projektkarte · 4 Bild mit Legende · 5 Leistungsmodul · 6 Prozessschritt · 7 Zitat · 8 FAQ · 9 Kontaktabschluss + Formular · 10 Footer

## 4. Bildinszenierung
Formate, Beschnitt/Hotspot-Regeln, Legenden-Typografie, Abstände Bild–Text, Verhalten beim Laden (LQIP, Reveal)

## 5. Bewegung
- Prinzipien (Zweck, Dauer, Easing)
- Micro: Hover, Fokus, Buttons, Links, FAQ, Formular – je Dauer/Easing/Eigenschaft
- Kontext: Seitenwechsel, Scroll-Reveal, Navigation
- Der eine orchestrierte Moment
- reduced-motion: was bleibt, was entfällt

## 6. Zustände
Fokus-Ring, Fehler, Erfolg, Disabled, Ladezustand – global definiert

## 7. Nicht tun
Konkrete Verbote für diese Website (z. B. keine Verläufe, keine Karten-Schatten, keine ALL-CAPS-Labels …)
```

---

## 6. Regeln für die Exploration

1. **Echte Inhalte, immer.** Hero-Headline, Case-Texte, Leistungstexte aus Briefing 3.1. Platzhaltertexte verfälschen jede Beurteilung von Typografie.
2. **Gleiche Screens, gleiche Inhalte** für alle Richtungen – sonst ist kein Vergleich möglich.
3. **Mobil zuerst beurteilen**, Desktop danach. Erstkontakt kommt oft über LinkedIn am Handy.
4. **Entscheide, keine Optionen** in der Spec. Wo Pascal noch nicht entschieden hat, steht `[offen – Pascal]`, nicht eine Liste von Möglichkeiten.
5. **Mut an einer Stelle.** Alles andere ruhig. Wird der Mut zur Dekoration, ist es die falsche Stelle.
6. **Lizenz vor Liebe.** Eine Schrift ohne geklärte Web-Lizenz kommt nicht in die Spec.
7. **Keine generischen Tells:** kein Cream-plus-Terracotta, kein Schwarz-mit-Neon, keine identischen Karten mit gleichem Schatten, keine ALL-CAPS-Eyebrows über jeder Überschrift, kein «→» an jedem Link, keine Fade-up-Animation auf jeder Sektion.
8. **Kritik ist Teil des Prozesses.** Jede Runde endet mit: Was würde ein Kunde mit Substanz hier nicht ernst nehmen?

---

## 7. Schnittstelle zum Code-Projekt

| Von Design → Code | Von Code → Design |
|---|---|
| `design-spec-vN.md` nach `docs/design-spec.md` | Vorschau-URL pro Branch `design/vN` |
| Schriftdateien (.woff2) nach `public/fonts/` | Screenshots mobil/Desktop mit echten Inhalten |
| OG-Bild-Gestaltung (1200×630) | Lighthouse-Werte (Bewegung darf Performance nicht unter 90 drücken) |

Claude Code bekommt pro Version den Auftrag: «Setze docs/design-spec.md um: Tokens in app/globals.css, Schrift via next/font/local, alle Module in components/modules/. Keine eigenen Gestaltungsentscheide; Unklarheiten im Bericht.» Motion wird als eigener Schritt beauftragt (Motion-Bibliothek nur in Client-Wrappern, `useReducedMotion` Pflicht).

---

## 8. Was Pascal vor Runde 0 bereitstellt

- Logo (SVG) und vorhandene Identitätsvorgaben
- Schriftkandidaten mit Lizenzstatus (oder: Budget für eine Lizenz)
- 3–5 Bilder realer Arbeiten (Geberit, TrustWork), damit Bildinszenierung an echtem Material entsteht
- Die Referenz-Websites, die ihn im letzten Jahr beeindruckt haben – und warum
