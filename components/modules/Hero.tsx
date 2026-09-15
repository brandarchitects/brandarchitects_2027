import { Link } from "@/i18n/navigation";
import type { Figure as FigureType } from "@/lib/content/types";
import { FigureImage } from "./FigureImage";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Modul 2: Hero – Einordnung, Headline, Erklärung, max. zwei Aktionen, optional ein Projektausschnitt.
 * Komposition: Einordnung als schmales Label, Headline in Display-Grösse über zehn Spalten, Erklärung und
 * Aktionen rücken in die rechte Hälfte (kontrollierte Asymmetrie). Eintritt einmalig per CSS (kein JavaScript).
 * Kein Porträt, keine Logowand (Briefing Kap. 8.3).
 */
export function Hero({ kicker, headline, text, primary, secondary, image }: {
  kicker: string; headline: string; text: string;
  primary: { href: string; label: string }; secondary?: { href: string; label: string };
  image?: FigureType;
}) {
  return (
    <section className="site pt-[clamp(3rem,2rem+5vw,7rem)] pb-[var(--spacing-section)]">
      <p className="label enter text-muted">{kicker}</p>
      <h1 className="display enter enter-2 mt-6 max-w-[15ch] md:mt-8">{headline}</h1>
      <div className="grid-12 mt-10 md:mt-14">
        <p className="lead enter enter-3 col-span-12 max-w-[var(--max-width-lead)] md:col-span-6 md:col-start-7">{text}</p>
        <div className="enter enter-4 col-span-12 flex flex-wrap gap-3 md:col-span-6 md:col-start-7">
          <Link href={primary.href} className="btn btn-ink">{primary.label}<Arrow /></Link>
          {secondary && <Link href={secondary.href} className="btn">{secondary.label}</Link>}
        </div>
      </div>
      {image && <div className="mt-[var(--spacing-group)]"><FigureImage figure={image} priority /></div>}
    </section>
  );
}
