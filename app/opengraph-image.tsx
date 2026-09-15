import { ImageResponse } from "next/og";

/**
 * Standard-Vorschaubild (1200×630) für Seiten ohne eigenes OG-Bild. Farben aus docs/design-spec.md.
 * Offen: Archivo als TTF einbetten (Satori liest kein woff2) – bis dahin System-Grotesk.
 */
export const alt = "Brand Architects – Markenberatung und Design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f7f6f2", color: "#121212", fontFamily: "Helvetica, Arial, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 22, letterSpacing: 2, color: "#5f5e5a" }}>
          <div style={{ width: 48, height: 2, background: "#8a5607" }} />
          MARKENSTRATEGIE · DESIGN · WEBDESIGN
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 0.98, letterSpacing: -3, maxWidth: 900 }}>Ihr Unternehmen ist weiter. Jetzt muss Ihre Marke mit.</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 20, borderTop: "1px solid #121212", fontSize: 26 }}>
            <div style={{ fontWeight: 700 }}>Brand Architects</div>
            <div style={{ color: "#5f5e5a" }}>Aargau und Zürich</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
