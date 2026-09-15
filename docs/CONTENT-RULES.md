# Sprach- und Inhaltsregeln

Quelle: docs/briefings/briefing-3-1.md, Kap. 6.3 und 7. Gilt für alle Texte – auch Alt-Texte, Meta-Descriptions, Fehlermeldungen, Commit-Kommentare im Content.

## Sprache
- Schweizer Hochdeutsch, **ss** statt ß, konsequent **Sie**
- Aktive Verben, konkrete Leistungen, kurze Absätze
- Tonalität: **Präzise. Zugewandt. Souverän.** Souverän heisst auch: Wir sagen, was wir können.

## Sperrliste (nie verwenden)
ganzheitlich · massgeschneidert · Leidenschaft · innovativ · Partner auf Augenhöhe · Wow · unvergesslich · Big-Agency-Niveau · Konzern-Niveau · ohne Overhead · ohne Junior-Kaskade · digital-first · innert X Arbeitstagen · Superlative · Wachstumsversprechen

Prüfbefehl vor jedem Commit (Claude Code führt ihn aus):
```bash
grep -rniE "ganzheitlich|massgeschneidert|leidenschaft|innovativ|augenhöhe|\bwow\b|unvergesslich|agency-niveau|konzern-niveau|ohne overhead|junior-kaskade|digital-first|innert [0-9]+ arbeitstag" messages/ scripts/ app/ components/ || echo "Sperrliste: sauber"
```

## Personen und Arbeitgeber
- Kein Swisscom-Bezug – kein Name, kein Case, kein Award ohne Freigabe
- Pascal Frey: Startseite kein Personen-Hero, Name im Footer; Über uns zwei bis drei Sätze, kleines Porträt, kein Lebenslauf, kein Arbeitgeber; Kontakt «Ihr Ansprechpartner: Pascal Frey»
- «Wir» bezeichnet die real Beteiligten. Keine Kapazität oder Teamgrösse suggerieren, die nicht existiert

## Fakten, die überall gleich lauten
- «seit über sieben Jahren» (zuerst Einzelfirma, seit 2023 GmbH)
- «20 Jahre Erfahrung» / «über 20 Jahre»
- Einzugsgebiet «Aargau und Zürich»; Würenlos in Impressum, Kontakt, Schema

## Referenzregeln (Cases)
- Auftrag, Rolle, Zeitraum, Projektpartner nennen; gemeinsame Arbeit als gemeinsame Arbeit
- Herkunft immer angeben (Brand Architects / frühere Agentur mit Name)
- Keine JvM-Projekte; keine Arbeiten aus Festanstellungen als Agenturmandat
- Kundenstimmen nennen die gelöste Aufgabe, keine Adjektive; Zahlen nur mit sauberer Zuordnung
- Keine Logowand ohne Zuordnung
- `materialCleared` erst setzen, wenn die Nutzung des Materials geklärt ist

## Formular
- Keine Antwortfrist versprechen
- Kein Budgetfeld zum Start; Interessenfelder als Mehrfachauswahl mit Begleittext (ADR-009)
- Bestätigung: «Vielen Dank für Ihre Nachricht. Wir melden uns, um die nächsten Schritte zu besprechen.»
