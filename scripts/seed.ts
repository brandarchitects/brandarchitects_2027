/**
 * Erstbefüllung und Abgleich von Sanity mit den Website-Texten aus docs/briefings/briefing-3-1.md.
 *
 * Läuft automatisch bei jedem Build (package.json → prebuild), sobald ein Schreibtoken vorhanden ist
 * (SANITY_API_WRITE_TOKEN aus der Vercel-Sanity-Integration). Ohne Token wird stumm übersprungen.
 *
 * Schutz der Redaktion: Nach jedem Lauf merkt sich das Skript die Versionsnummer (_rev) jedes geschriebenen
 * Dokuments im Meta-Dokument «seedMeta». Beim nächsten Lauf gilt pro Dokument:
 *  - fehlt es → anlegen
 *  - _rev unverändert (seit dem Seed niemand im Studio dran) → mit dem aktuellen Seed-Stand ersetzen
 *  - _rev verändert (im Studio bearbeitet) → nur fehlende neue Felder ergänzen (setIfMissing), Texte bleiben
 * Steuerung: SEED_MODE=off (nichts tun) · SEED_MODE=replace (alles überschreiben, auch Studio-Änderungen – bewusst!).
 * Lokal: npm run seed (Token in .env.local). Cases werden NICHT geseedet – die legt Pascal im Studio an.
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { L, seedDocs } from "./seed-data";

// .env.local minimal einlesen (ohne zusätzliche Abhängigkeit)
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

// Client erst im Lauf erzeugen – so bricht ein Build ohne Sanity-Variablen nicht am Import
const makeClient = () => createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-09-15",
  token: process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const SEED_META_ID = `seedMeta-${L}`;

async function main() {
  const mode = process.env.SEED_MODE ?? "sync";
  const onBuild = process.argv.includes("--only-if-enabled");
  const hasToken = Boolean(process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_WRITE_TOKEN);
  if (mode === "off") return console.log("seed: SEED_MODE=off – übersprungen");
  if (onBuild && (!hasToken || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)) return console.log("seed: kein Token/Projekt – übersprungen");
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID fehlt");
  if (!hasToken) throw new Error("Schreibtoken fehlt: SANITY_API_WRITE_TOKEN (Vercel-Sanity-Integration) oder SANITY_WRITE_TOKEN in .env.local");

  const client = makeClient();
  const docs = seedDocs;
  const ids = docs.map((d) => d._id);

  // Stand in Sanity: aktuelle _rev pro Dokument und die beim letzten Seed gemerkten _revs
  const [existing, meta] = await Promise.all([
    client.fetch<{ _id: string; _rev: string }[]>(`*[_id in $ids]{ _id, _rev }`, { ids }),
    client.fetch<{ revs?: Record<string, string> } | null>(`*[_id == $id][0]{ revs }`, { id: SEED_META_ID }),
  ]);
  const currentRev = new Map(existing.map((d) => [d._id, d._rev]));
  const seededRev: Record<string, string> = meta?.revs ?? {};
  // Erster Lauf mit diesem Mechanismus (kein seedMeta): bis hier hat nur der Seed geschrieben → alles aktualisieren
  const bootstrap = !meta;

  const tx = client.transaction();
  const stats = { created: [] as string[], replaced: [] as string[], patched: [] as string[] };
  for (const doc of docs) {
    const rev = currentRev.get(doc._id);
    if (!rev) { tx.createOrReplace(doc as never); stats.created.push(doc._id); continue; }
    const untouched = seededRev[doc._id] === rev;
    if (mode === "replace" || bootstrap || untouched) { tx.createOrReplace(doc as never); stats.replaced.push(doc._id); continue; }
    // Im Studio bearbeitet: nur neue Felder ergänzen, bestehende Werte nicht anfassen
    const { _id, _type, ...fields } = doc;
    void _type;
    tx.patch(_id, (p) => p.setIfMissing(fields as never));
    stats.patched.push(_id);
  }
  const res = await tx.commit({ returnDocuments: true });

  // _revs der jetzt geschriebenen Dokumente merken – Grundlage für den Schutz beim nächsten Lauf
  const revs: Record<string, string> = { ...seededRev };
  for (const d of (res as unknown as { _id: string; _rev: string }[])) if (ids.includes(d._id)) revs[d._id] = d._rev;
  await client.createOrReplace({ _id: SEED_META_ID, _type: "seedMeta", revs } as never);

  console.log(`✓ seed: ${stats.created.length} angelegt, ${stats.replaced.length} aktualisiert, ${stats.patched.length} nur ergänzt (im Studio bearbeitet${stats.patched.length ? ": " + stats.patched.join(", ") : ""}).`);
}
main().catch((e) => { console.error(e); process.exit(1); });
