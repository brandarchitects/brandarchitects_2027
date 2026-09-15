import { Link } from "@/i18n/navigation";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Modul 2: Hero – Einordnung, Headline, Erklärung, max. zwei Aktionen (Briefing Kap. 8.3).
 * Typo-Moment: Die Headline wird satzweise aufgeteilt und Zeile für Zeile maskiert eingeblendet (CSS, kein JavaScript);
 * der zweite Satz steht in Vermillon – die eine mutige Stelle (docs/design-spec.md v2). Erklärung und Aktionen rücken
 * in die rechte Hälfte. Kein Porträt, keine Logowand. Das Reel folgt als eigenes Modul direkt darunter.
 */
export function Hero({ kicker, headline, text, primary, secondary }: {
  kicker: string; headline: string; text: string;
  primary: { href: string; label: string }; secondary?: { href: string; label: string };
}) {
  // Satzweise aufteilen (Website-Text bleibt unverändert), letzter Satz in Akzentfarbe
  const sentences = headline.match(/[^.!?]+[.!?]?/g)?.map((s) => s.trim()).filter(Boolean) ?? [headline];
  return (
    <section className="site pt-[clamp(2.5rem,1.5rem+4vw,6rem)] pb-[clamp(2.5rem,2rem+3vw,5rem)]">
      <p className="label enter text-muted">{kicker}</p>
      <h1 className="display lines mt-6 max-w-[14ch] md:mt-8">
        {sentences.map((s, i) => (
          <span key={s}><span className={i === sentences.length - 1 && sentences.length > 1 ? "text-accent" : ""}>{s}</span></span>
        ))}
      </h1>
      <div className="grid-12 mt-10 items-end md:mt-14">
        <p className="lead enter enter-3 col-span-12 max-w-[var(--max-width-lead)] text-ink-soft md:col-span-6 md:col-start-7">{text}</p>
        <div className="enter enter-4 col-span-12 flex flex-wrap gap-3 md:col-span-6 md:col-start-7">
          <Link href={primary.href} className="btn btn-ink">{primary.label}<Arrow /></Link>
          {secondary && <Link href={secondary.href} className="btn">{secondary.label}</Link>}
        </div>
      </div>
    </section>
  );
}
