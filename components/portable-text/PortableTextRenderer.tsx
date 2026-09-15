import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { FigureImage } from "@/components/modules/FigureImage";
import { QuoteBlock } from "@/components/modules/QuoteBlock";
import type { Figure, Quote } from "@/lib/content/types";

/**
 * Rendert Portable Text aus Sanity. Jeder Blocktyp aus sanity/schemaTypes/objects/portableText.ts
 * hat hier genau eine Darstellung. Neue Blocktypen: dort definieren, hier rendern.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-4 max-w-measure">{children}</p>,
    h2: ({ children }) => <h2 className="mt-10 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold">{children}</h3>,
  },
  list: { bullet: ({ children }) => <ul className="mt-4 max-w-measure list-disc pl-6">{children}</ul> },
  marks: {
    link: ({ value, children }) => <a href={value?.href} rel="noopener">{children}</a>,
    internalLink: ({ children }) => <span>{children}</span>, // Ziel-URL auflösen, sobald interne Links redaktionell genutzt werden
  },
  types: {
    figure: ({ value }: { value: Figure }) => <div className="my-10"><FigureImage figure={value} /></div>,
    quote: ({ value }: { value: Quote }) => <div className="my-10"><QuoteBlock quote={value} /></div>,
  },
};

export function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
