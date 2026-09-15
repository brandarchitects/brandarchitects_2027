import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CaseSummary } from "@/lib/content/types";
import { imageProps } from "@/lib/image";

/**
 * Modul 3: Projektkarte – Bild 16:10 einer tatsächlichen Anwendung (Hover: Zoom, «Case ansehen» erscheint),
 * darunter Kunde und Herkunft·Jahr als Labelzeile, die Aufgabe als Titel (Hook), der Beitrag als Ergebniszeile.
 * `size="large"` setzt den Titel in h2 – für die erste Kachel auf Startseite und Übersicht.
 * Herkunft («Brand Architects» / «Frühere Agenturarbeit: Name») und Jahr sind Pflicht (Struktur-Briefing Kap. 4 Modul 2, 5.1).
 */
export function ProjectCard({ item, size = "default", priority = false }: { item: CaseSummary; size?: "large" | "default"; priority?: boolean }) {
  const t = useTranslations("work");
  const img = item.heroImage?.image?.asset ? imageProps(item.heroImage.image, size === "large" ? 1800 : 1400, 10 / 16) : null;
  const origin = item.origin === "former-agency" ? `${t("originFormerAgency")}${item.formerAgency ? `: ${item.formerAgency}` : ""}` : t("originBrandArchitects");
  return (
    <article className="group">
      <Link href={`/arbeiten/${item.slug}/`} className="block">
        <div className="media-hover aspect-[16/10]">
          {img && <Image {...img} alt={item.heroImage.alt} sizes={size === "large" ? "(min-width: 1440px) 1360px, 100vw" : "(min-width: 768px) 50vw, 100vw"} priority={priority} className="h-full w-full object-cover" />}
        </div>
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="label text-muted">{item.client} · {origin} · {item.year}</span>
          <span className="label text-accent-deep opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden="true">{t("view")} →</span>
        </div>
        <h3 className={`${size === "large" ? "h2 max-w-[24ch]" : "h3 max-w-[30ch]"} mt-3`}>{item.task}</h3>
      </Link>
      <dl className="mt-3">
        <dt className="sr-only">{t("contribution")}</dt><dd className="max-w-[60ch] text-muted">{item.contribution}</dd>
      </dl>
    </article>
  );
}
