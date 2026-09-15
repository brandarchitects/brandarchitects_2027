/**
 * Register-Kopf einer Sektion: Haarlinie, schmale Registerziffer, Label, Titel.
 * UI-Baustein (kein Inhaltsmodul): Er gibt allen Seiten dieselbe Ordnung – die typografische
 * Handschrift aus docs/design-spec.md. `index` weglassen, wo keine Nummer sinnvoll ist.
 */
export function SectionHead({ index, label, title, titleAs = "h2", tone = "paper", children }: {
  index?: string; label?: string; title?: string; titleAs?: "h1" | "h2"; tone?: "paper" | "ink"; children?: React.ReactNode;
}) {
  const Title = titleAs;
  const muted = tone === "ink" ? "text-paper/60" : "text-muted";
  return (
    <div className={`grid-12 ${tone === "ink" ? "border-t border-paper/20" : "rule-strong"} pt-5`}>
      <div className="col-span-12 flex items-baseline gap-4 md:col-span-3">
        {index && <span className={`index ${muted}`} aria-hidden="true">{index}</span>}
        {label && <span className={`label ${muted}`}>{label}</span>}
      </div>
      <div className="col-span-12 md:col-span-9">
        {title && <Title className={titleAs === "h1" ? "h1" : "h2"}>{title}</Title>}
        {children}
      </div>
    </div>
  );
}
