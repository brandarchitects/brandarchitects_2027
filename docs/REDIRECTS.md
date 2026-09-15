# Redirects – Inventar alte Website → neue Website

Vor Go-Live ausfüllen (Pascal: URL-Liste aus Search Console «Seiten» + Crawl der alten Site). Regel aus dem Struktur-Briefing: **jede alte Seite mit Bedeutung bekommt ein inhaltlich passendes Ziel; kein Pauschal-Redirect auf die Startseite.**

| Alte URL | Neues Ziel | Grund / Bemerkung | In next.config.ts |
|---|---|---|---|
| /beispiel-alte-seite | /leistungen/ | Beispielzeile – löschen | ☐ |

Umsetzung: `next.config.ts` → `redirects()`, `permanent: true` (301). Nach Deploy jede Zeile mit `curl -I` prüfen.
