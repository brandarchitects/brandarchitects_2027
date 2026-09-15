import type { ProcessStep } from "@/lib/content/types";

/** Modul 6: Prozessschritte mit Entscheidung und Kundeneinbezug. Ist eine echte Sequenz → Nummerierung erlaubt. */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title}>
          <p className="text-muted">{i + 1}</p>
          <h3 className="mt-1 font-semibold">{s.title}</h3>
          <p className="mt-2 text-muted">{s.text}</p>
          {s.clientInvolvement && <p className="mt-2 text-sm text-muted">{s.clientInvolvement}</p>}
        </li>
      ))}
    </ol>
  );
}
