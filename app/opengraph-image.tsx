import { ImageResponse } from "next/og";

/** Standard-Vorschaubild (1200×630) für Seiten ohne eigenes OG-Bild. Gestaltung folgt in Phase 3. */
export const alt = "Brand Architects – Markenberatung und Design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 80, background: "#fff", color: "#1a1a1a", fontSize: 56, fontWeight: 600 }}>
        <div>Brand Architects</div>
        <div style={{ fontSize: 28, fontWeight: 400, marginTop: 16, color: "#6b6b6b" }}>Markenberatung und Design – Aargau und Zürich</div>
      </div>
    ),
    size,
  );
}
