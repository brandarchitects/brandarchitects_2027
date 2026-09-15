import { Link } from "@/i18n/navigation";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Modul 5: Leistungsmodul als Registerzeile – Ziffer, Bereich, Anlass/Ergebnis, Pfeil.
 * Ein typografischer Index statt drei gleicher Karten (Briefing 3.1 Kap. 8.9; Design-Spec Kap. 3).
 * `tone="muted"` für die ergänzende KI-Zeile, `note` setzt ein Label wie «Ergänzend».
 */
export function ServiceModule({ index, title, text, href, note, tone = "default" }: {
  index?: string; title: string; text: string; href: string; note?: string; tone?: "default" | "muted";
}) {
  return (
    <article className="rule">
      <Link href={href} className="group grid-12 items-start gap-y-3 py-6 md:py-8">
        <span className="index-sm col-span-2 text-muted md:col-span-1" aria-hidden="true">{index}</span>
        <h3 className={`h3 col-span-10 md:col-span-4 ${tone === "muted" ? "text-ink-soft" : ""}`}>
          {note && <span className="label mb-2 block text-accent">{note}</span>}
          {title}
        </h3>
        <p className="col-span-11 col-start-2 text-muted md:col-span-6 md:col-start-6">{text}</p>
        <span className="col-span-1 hidden justify-self-end pt-1 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 md:block"><Arrow /></span>
      </Link>
    </article>
  );
}
