/**
 * Sanity-Verbindungsdaten. Werte kommen aus .env.local (lokal) bzw. Vercel-Umgebungsvariablen.
 * Ohne Projekt-ID läuft die Site im "leeren" Modus (Build funktioniert, Inhalte fehlen) –
 * so kann das Repo gebaut werden, bevor Sanity eingerichtet ist.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-15";
export const studioUrl = "/studio";
export const isSanityConfigured = projectId.length > 0;
