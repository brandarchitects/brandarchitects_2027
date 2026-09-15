import { useTranslations } from "next-intl";
import type { ProcessStep } from "@/lib/content/types";

/**
 * Modul 6: Prozessschritte als vierspaltiger Ledger – Haarlinie, schmale Ziffer, Schritt, Beschreibung,
 * optional die Mitwirkung des Kunden mit Label. Echte Sequenz → Nummerierung (Struktur-Briefing Kap. 6).
 */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const t = useTranslations("process");
  return (
    <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="rule pt-4">
          <span className="index text-muted" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="h3 mt-4">{s.title}</h3>
          <p className="mt-2 text-muted">{s.text}</p>
          {s.clientInvolvement && (
            <p className="mt-4 body-sm"><span className="label block text-accent">{t("clientInvolvement")}</span><span className="mt-1 block">{s.clientInvolvement}</span></p>
          )}
        </li>
      ))}
    </ol>
  );
}
