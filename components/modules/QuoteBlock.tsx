import type { Quote } from "@/lib/content/types";

/** Modul 7: Kurzes Zitat mit Name, Funktion, Unternehmen. */
export function QuoteBlock({ quote }: { quote: Quote }) {
  return (
    <blockquote className="border-l-2 border-ink pl-6">
      <p className="text-xl">{quote.text}</p>
      <footer className="mt-3 text-muted">{[quote.name, quote.role, quote.company].filter(Boolean).join(", ")}</footer>
    </blockquote>
  );
}
