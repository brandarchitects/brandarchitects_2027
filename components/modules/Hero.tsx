import { Link } from "@/i18n/navigation";
import type { Figure as FigureType } from "@/lib/content/types";
import { FigureImage } from "./FigureImage";

/** Modul 2: Hero – Einordnung, Headline, Erklärung, max. zwei Aktionen, optional ein Projektausschnitt. Kein Porträt, keine Logowand. */
export function Hero({ kicker, headline, text, primary, secondary, image }: {
  kicker: string; headline: string; text: string;
  primary: { href: string; label: string }; secondary?: { href: string; label: string };
  image?: FigureType;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-section">
      <p className="text-muted">{kicker}</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{headline}</h1>
      <p className="mt-6 max-w-measure text-lg">{text}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={primary.href} className="rounded-full bg-ink px-5 py-3 text-paper">{primary.label}</Link>
        {secondary && <Link href={secondary.href} className="rounded-full border border-ink px-5 py-3">{secondary.label}</Link>}
      </div>
      {image && <div className="mt-14"><FigureImage figure={image} priority /></div>}
    </section>
  );
}
