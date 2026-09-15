import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { FigureImage } from "@/components/modules/FigureImage";
import { QuoteBlock } from "@/components/modules/QuoteBlock";
import type { Figure, Quote } from "@/lib/content/types";

/**
 * Rendert Portable Text aus Sanity. Jeder Blocktyp aus sanity/schemaTypes/objects/portableText.ts
 * hat hier genau eine Darstellung; die Typografie kommt aus `.prose` in app/globals.css.
 * `wide` hebt die Lesebreite auf (z. B. Anwendung auf der Fallseite mit grossen Bildern).
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
  list: { bullet: ({ children }) => <ul>{children}</ul> },
  marks: {
    link: ({ value, children }) => <a href={value?.href} rel="noopener">{children}</a>,
    internalLink: ({ children }) => <span>{children}</span>, // Ziel-URL auflösen, sobald interne Links redaktionell genutzt werden
  },
  types: {
    figure: ({ value }: { value: Figure }) => <div className="!mt-10 !mb-10"><FigureImage figure={value} /></div>,
    quote: ({ value }: { value: Quote }) => <div className="!mt-10 !mb-10"><QuoteBlock quote={value} /></div>,
  },
};

export function PortableTextRenderer({ value, wide = false }: { value?: PortableTextBlock[]; wide?: boolean }) {
  if (!value?.length) return null;
  return <div className={`prose ${wide ? "max-w-none [&>p]:max-w-[var(--max-width-measure)]" : ""}`}><PortableText value={value} components={components} /></div>;
}
