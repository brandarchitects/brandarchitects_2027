"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, localizedTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

/**
 * Sanity Studio – läuft unter brandarchitects.ch/studio (app/studio).
 * Sprachen: siehe i18n/routing.ts – hier gespiegelt, weil das Studio keine Next-Module lädt.
 */
export default defineConfig({
  name: "brandarchitects",
  title: "Brand Architects",
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    documentInternationalization({
      supportedLanguages: [
        { id: "de", title: "Deutsch" },
        // { id: "en", title: "English" }, // Sprache 2: hier und in i18n/routing.ts aktivieren
      ],
      schemaTypes: localizedTypes,
    }),
  ],
  schema: { types: schemaTypes },
});
