import { defineCliConfig } from "sanity/cli";

/** Für `npx sanity …`-Befehle (typegen, dataset import/export). */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
});
