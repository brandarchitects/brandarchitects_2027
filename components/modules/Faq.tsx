import type { Faq as FaqType } from "@/lib/content/types";

/**
 * Modul 8: FAQ. Native <details>/<summary>: bedienbar ohne JavaScript, tastaturfähig.
 * Die strukturierten Daten (FAQPage) setzt die Seite separat (lib/seo/jsonld).
 */
export function Faq({ items, title }: { items: FaqType[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section>
      {title && <h2 className="text-2xl font-semibold">{title}</h2>}
      <div className="mt-6 divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f._id} className="group py-4">
            <summary className="cursor-pointer list-none font-semibold">{f.question}</summary>
            <p className="mt-3 max-w-measure text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
