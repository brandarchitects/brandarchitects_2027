import { parse, evaluate } from "groq-js";
import { seedDocs } from "@/scripts/seed-data";
import { mockCases, mockAssets } from "@/scripts/mock-cases";

/**
 * Lokale Vorschau ohne Sanity (CONTENT_MOCK=1): wertet dieselben GROQ-Abfragen mit groq-js über die
 * Seed-Daten aus. Zusätzlich zwei klar gekennzeichnete Designstudien-Cases (scripts/mock-cases.ts), damit
 * Projektkarte und Fallseite gestaltet und geprüft werden können, bevor echte Cases im Studio liegen.
 * Läuft nur in Entwicklung/Screenshots – nie auf Vercel (dort ist CONTENT_MOCK nicht gesetzt).
 */
const dataset = [...seedDocs, ...mockCases, ...mockAssets];

export async function mockFetch<T>(query: string, params: Record<string, unknown>): Promise<T | null> {
  const tree = parse(query);
  const value = await evaluate(tree, { dataset, params });
  return (await value.get()) as T | null;
}
