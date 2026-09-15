import { Link } from "@/i18n/navigation";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Modul 5: Leistungsmodul als Registerzeile – grosse Ziffer in Vermillon, Bereich als h2, Anlass/Ergebnis rechts, Pfeil.
 * Ein typografischer Index statt drei gleicher Karten (Briefing 3.1 Kap. 8.9; Design-Spec Kap. 3).
 * `tone="muted"` für die ergänzende KI-Zeile, `note` setzt ein Label wie «Ergänzend».
 */
export function ServiceModule({ index, title, text, href, note, tone = "default" }: {
  index?: string; title: string; text: string; href: string; note?: string; tone?: "default" | "muted";
}) {
  return (
    <article className="rule">
      <Link href={href} className="group grid-12 items-start gap-y-4 py-8 md:py-10">
        <span className={`index col-span-3 md:col-span-2 ${tone === "muted" ? "text-muted" : "text-accent"}`} aria-hidden="true">{index}</span>
        <h3 className={`h2 col-span-9 md:col-span-4 ${tone === "muted" ? "text-ink-soft" : ""}`}>
          {note && <span className="label mb-3 block text-accent-deep">{note}</span>}
          {title}
        </h3>
        <p className="col-span-12 max-w-[44ch] text-[1.0625rem] text-muted md:col-span-5 md:col-start-7 md:pt-2">{text}</p>
        <span className="col-span-1 hidden justify-self-end pt-3 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 md:block"><Arrow /></span>
      </Link>
    </article>
  );
}
