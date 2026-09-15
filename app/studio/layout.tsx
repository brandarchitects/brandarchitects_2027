import type { Metadata } from "next";

/** Eigenes Root-Layout für das Studio (kein Header/Footer, keine Indexierung). */
export const metadata: Metadata = { title: "Brand Architects – Studio", robots: { index: false, follow: false } };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
