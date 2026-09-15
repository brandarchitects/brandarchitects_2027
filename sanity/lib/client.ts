import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "../env";

/**
 * Lese-Client für die Website (nur veröffentlichte Inhalte, über das CDN).
 * Schreibzugriffe passieren ausschliesslich im Studio oder über scripts/seed.ts mit Token.
 */
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { enabled: false, studioUrl },
});
