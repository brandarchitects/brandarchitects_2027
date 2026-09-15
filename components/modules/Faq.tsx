import type { Faq as FaqType } from "@/lib/content/types";

/**
 * Modul 8: FAQ. Native <details>/<summary>: bedienbar ohne JavaScript, tastaturfähig.
 * Frage als Zeile mit Plus-Zeichen, das sich beim Öffnen dreht (CSS). Antwort in Lesebreite.
 * Die strukturierten Daten (FAQPage) setzt die Seite separat (lib/seo/jsonld).
 */
export function Faq({ items, title }: { items: FaqType[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section>
      {title && <h2 className="h2 max-w-[24ch]">{title}</h2>}
      <div className={`${title ? "mt-8" : ""} border-b border-line`}>
        {items.map((f) => (
          <details key={f._id} className="faq group rule">
            <summary className="flex items-start justify-between gap-6 py-5">
              <span className="h3 max-w-[40ch] font-medium">{f.question}</span>
              <span className="faq-mark mt-1 shrink-0 text-muted" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.25" /></svg>
              </span>
            </summary>
            <p className="prose -mt-1 pb-6 text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
