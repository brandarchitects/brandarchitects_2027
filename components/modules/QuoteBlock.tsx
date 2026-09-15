import type { Quote } from "@/lib/content/types";

/** Modul 7: Kurzes Zitat mit Name, Funktion, Unternehmen – nennt die gelöste Aufgabe (Briefing Kap. 6.3). */
export function QuoteBlock({ quote }: { quote: Quote }) {
  return (
    <blockquote className="rule-strong pt-5">
      <p className="lead max-w-[var(--max-width-measure)]">«{quote.text}»</p>
      <footer className="label mt-5 text-muted">{[quote.name, quote.role, quote.company].filter(Boolean).join(" · ")}</footer>
    </blockquote>
  );
}
