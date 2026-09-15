# Seiten-Review (Phase 2b) – Texte und Gefässe gegen die Briefings

**Stand:** 15.09.2026 · **Prüfgrundlage:** Briefing 3.1 Kap. 8 (Texte, verbindlich) · Struktur 1.3 Kap. 4–5 (Gefässe, Reihenfolge) · CLAUDE.md Regeln 2, 4, 7
**Status:** ✅ umgesetzt · ◐ umgesetzt als Redaktionsvorschlag, Pascal bestätigt · ☐ offen, braucht Pascal · ➜ Design-Projekt

Grundsatz: Wo 3.1 und 1.3 sich widersprechen, gilt 3.1 (CLAUDE.md). Wo 3.1 schweigt, gilt 1.3. Redaktionsvorschläge (◐) sind Texte, die im Briefing nur als Anforderung stehen, nicht als Website-Text – sie sind im Seed, damit die Seiten vollständig sind, und werden im Studio von Pascal freigegeben oder geändert.

## Startseite

| Modul | Befund | Quelle | Status |
|---|---|---|---|
| 1 Hero | Einordnung nach 2.2 (ADR-008); «Arbeiten ansehen» springt zum Projektmodul, sobald Cases da sind, sonst zur Übersicht | 1.3 M1 | ✅ |
| 2 Arbeiten | Herkunft («Brand Architects» / «Frühere Agenturarbeit: Name») und Jahr fehlten auf der Karte; «Alle Arbeiten»-Link fehlte | 1.3 M2, 5.1 | ✅ |
| 2 Arbeiten | Modul ist unsichtbar, bis der erste Case mit `materialCleared` publiziert ist | – | ☐ Cases (Phase 4) |
| 3 Situationen | vollständig | 3.1 | ✅ |
| 4 Leistungen | H2 «Von der Markenfrage zur Anwendung.» fehlte; Aktion «Leistungen ansehen» fehlte | 1.3 M4 | ✅ |
| 5 Standortbestimmung | Pflichthinweis «Ein klar begrenzter Beratungsauftrag mit schriftlichem Ergebnis. Umfang und Honorar vereinbaren wir vor Beginn.» fehlte | 1.3 M5 | ✅ |
| 6 Zusammenarbeit | Aktion «So arbeiten wir» fehlte | 1.3 M6 | ✅ |
| 7 Agentur | H2 «Über Brand Architects.» und Aktion «Über uns» fehlten; Text bleibt Fassung 3.1 (ADR-010) | 1.3 M7 | ✅ |
| 8 Kontakt | Direkte E-Mail als gleichwertiger Weg fehlte; erscheint, sobald `siteSettings.email` gesetzt ist | 1.3 M8 | ✅ / ☐ E-Mail im Studio setzen |

## Arbeiten (Übersicht)

| Befund | Quelle | Status |
|---|---|---|
| H1 war «Arbeiten», soll «Ausgewählte Arbeiten.» | 1.3 5.1 | ✅ (page-Dokument `arbeiten`) |
| Erklärung zur Herkunft fehlte | 1.3 5.1 | ◐ Text im Seed |
| Abschluss «Steht bei Ihnen eine ähnliche Aufgabe an?» → Kontakt fehlte | 1.3 5.1 | ✅ |
| Karten ohne Jahr/Rolle/Herkunft | 1.3 5.1 | ✅ Herkunft + Jahr; Rolle bleibt der Fallseite |

## Fallseite

| Befund | Quelle | Status |
|---|---|---|
| Struktur Kopf → Rollenblock → Situation → Frage → Auftrag → Entscheid → bewahrt → Anwendung → Ergebnis → verwandter Fall → CTA | 3.1 6.5, 1.3 5.2 | ✅ war korrekt |
| Abschnittstitel waren hart im Code (Regel 4) | CLAUDE.md | ✅ nach `messages/de.json` |
| CTA soll «Ähnliches Projekt besprechen» heissen | 1.3 5.2 | ✅ |
| Historischer Credit-Satz («Entstanden bei [Agentur], [Jahr]. Beitrag Pascal Frey: …») – Rollenblock deckt die Felder ab, Formulierung liegt bei der Case-Redaktion | 1.3 5.2 | ☐ Phase 4 |

## Leistungen (Übersicht)

| Befund | Quelle | Status |
|---|---|---|
| H1 war «Leistungen», soll «Markenstrategie, Design und digitale Auftritte.» | 1.3 5.3 | ✅ (page-Dokument `leistungen`) |
| Einführung fehlte | 1.3 5.3 | ◐ Text im Seed |
| Standortbestimmung nur als nackter Link; soll Absatz mit Einordnung sein | 1.3 5.3 | ◐ Text im Seed |
| Kontaktabschluss fehlte | 1.3 5.3 | ✅ |
| Pro Bereich «passender Beleg» | 1.3 5.3 | ☐ Cases (Phase 4) |
| KI erscheint gleichrangig mit den drei Bereichen; 1.3 sagt «ergänzend» | 1.3 5.3 | ➜ Design entscheidet Gewichtung im Layout |

## Leistungsseiten (4)

| Befund | Quelle | Status |
|---|---|---|
| H1 war der Bereichsname; soll die Käuferfrage sein: «Eine klare Richtung für Ihre Marke.» · «Ein Auftritt, der Ihr Unternehmen heute zeigt.» · «Ihre Marke. Digital verständlich und erlebbar.» · KI: «Marke im Alltag: Prozesse und Tools mit KI.» (3.1 vor 1.3) | 1.3 5.3.x, 3.1 8.4 | ✅ neues Feld `headline`; Bereichsname steht darüber |
| «Was es von Ihnen braucht» war bei allen vier leer, Abschnitt fehlte auf der Website | 3.1 8.4 | ◐ vier Texte im Seed |
| Abschnittstitel hart im Code | CLAUDE.md 4 | ✅ nach `messages/de.json` |
| Markenstrategie und Corporate Design: Link zur Standortbestimmung als Einstieg fehlte | 1.3 5.3.1/5.3.2 | ✅ (bei `contactTopic == brand`) |
| Title-Tags «Markenstrategie und Positionierung – Brand Architects» usw. | 1.3 Kap. 8 | ✅ via `seo.title` im Seed |
| Aufgabenspezifische Fragen: Digital (Können wir unsere Marke behalten? Wer entwickelt? Wer pflegt? Was wird übernommen?) und KI (Wer gibt frei? Was läuft nach Übergabe? Wer betreut?) haben im Briefing keine Antworten | 3.1 8.4, 1.3 5.3.3/5.3.4 | ☐ Pascal formuliert Antworten → neue FAQ-Dokumente im Studio |
| KI-Seite: vier Felder je mit Eingabe/Ergebnis/Mitwirkung/Zuständigkeit, ein echter Ablauf, Reifegrad – nur als Fliesstext vorhanden | 3.1 8.4, 1.3 5.3.4 | ☐ Belege und Lieferumfänge (Pascal); Gefäss folgt, sobald Inhalt steht |
| Passende Cases pro Seite | 1.3 | ☐ Phase 4 |

## Standortbestimmung

| Befund | Quelle | Status |
|---|---|---|
| H1 war die Modul-5-Frage; soll «Klarheit vor dem neuen Auftritt.» | 1.3 5.4 | ✅ |
| Inhalt war vier Absätze mit «Kernfrage:»-Präfix; soll gegliedert sein: Kernfrage · für wen · was geprüft wird · was Sie erhalten · was Sie beitragen · Umfang und Honorar · Grenzen | 1.3 5.4 | ✅ Gliederung, ◐ Texte «Für wen», «Was Sie beitragen», «Grenzen» |
| Fragen zu Nutzung mit bestehender Agentur und Folgeauftrag | 1.3 5.4 | ☐ Pascal: FAQ-Antworten |
| Honorarrahmen | 3.1 5.3 | ☐ nach Kalkulation |

## Zusammenarbeit

| Befund | Quelle | Status |
|---|---|---|
| H1 war der Modul-6-Titel; soll «So wird aus einer Markenfrage ein klarer Auftrag.» | 1.3 5.5 | ✅ |
| Schritte standen nach dem Fliesstext; sollen direkt nach der Einführung kommen | 1.3 5.5 | ✅ Template-Reihenfolge |
| Je Schritt Ziel, Entscheidung, Ergebnis, Kundeneinbezug (`clientInvolvement` leer) | 1.3 5.5 | ☐ Pascal: ein Satz Kundeneinbezug pro Schritt |
| Gliederung Organisation · Mitwirkung · Schnittstellen · Zeitrahmen · Übergabe · KI fehlte | 1.3 5.5 | ✅ Gliederung, ◐ Texte «Ihre Mitwirkung», «Schnittstellen», «Übergabe» |
| Netzwerk-Rollen «[Rolle 1], [Rolle 2], [Rolle 3]» | 3.1 4.4 | ☐ Pascal: Rollen nach Einverständnis der Beteiligten |

## Über uns

| Befund | Quelle | Status |
|---|---|---|
| H1 «Brand Architects.»; Title-Tag «Über Brand Architects» | 1.3 5.6 | ✅ |
| Einleitung war 1:1 der Startseiten-Modul-7-Text (Wiederholung) | 1.3 5.6 «Unterseiten wiederholen nicht die Startseite» | ◐ neue Einleitung mit KI-Ergänzung |
| Reihenfolge Leistungen → Organisation → Gründerhinweis → Adresse/Raum → Abgrenzung | 1.3 5.6 | ✅ |
| Gründerhinweis = Website-Text 3.1 (mit JvM/Limmat) | 3.1 4.3 | ✅ unverändert |
| Kleines Porträt (optional) | 3.1 4.3 | ☐ Pascal entscheidet; Feld im Schema erst dann |

## Kontakt

| Befund | Quelle | Status |
|---|---|---|
| H1 und Einleitung waren hart im Code | CLAUDE.md 2/4 | ✅ page-Dokument `kontakt` |
| «Erwartung an das erste Gespräch» fehlte als Block | 1.3 5.7 | ◐ Text im Seed |
| «Ihr Ansprechpartner: Pascal Frey» stand ohne Label | 3.1 4.3 | ✅ |
| E-Mail sichtbar | 3.1 8.7 | ☐ `siteSettings.email` im Studio setzen |
| Formular: Interessenfelder, kein Budget (ADR-009); Erfolg/Fehler-Texte 1:1 aus 1.3 | – | ✅ |

## Header, Footer, global

| Befund | Quelle | Status |
|---|---|---|
| Navigation und Footer-Inhalt | 3.1 8.2 | ✅ |
| LinkedIn im Footer erst, wenn URL gesetzt | 1.3 | ☐ Studio |
| Leerzustand-Text (Rohbau) hart im Code | CLAUDE.md 4 | ✅ nach messages |
| Impressum/Datenschutz «PLATZHALTER» | – | ☐ Phase 5 |

## Was Pascal liefert (Sammelliste aus diesem Review)
1. `siteSettings`: E-Mail, LinkedIn-URL, Strasse (Studio → Website-Einstellungen)
2. FAQ-Antworten: Digital (4 Fragen), KI (3 Fragen), Standortbestimmung (2 Fragen) – ich formuliere Entwürfe, sobald du die Fakten nennst
3. Kundeneinbezug je Prozessschritt (ein Satz)
4. Netzwerk-Rollen für «Zusammenarbeit»
5. Freigabe der ◐-Texte im Studio oder Änderungswünsche hier
6. Honorarrahmen Standortbestimmung, Budgetkategorien (nach Kalkulation)
7. Porträt ja/nein

## Nach dem Review nötig
- Nichts von Hand: Der Seed läuft beim nächsten Build automatisch und schreibt neue Felder und die drei neuen Seitendokumente nach Sanity, ohne Studio-Änderungen zu überschreiben (ADR-013).
