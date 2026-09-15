import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CaseSummary } from "@/lib/content/types";
import { imageProps } from "@/lib/image";

/**
 * Modul 3: Projektkarte – Bild einer tatsächlichen Anwendung, darunter ein «Ledger» aus Haarlinien:
 * Kunde und Herkunft/Jahr in einer Zeile, dann Aufgabe, dann Beitrag. Herkunft («Brand Architects» /
 * «Frühere Agenturarbeit: Name») und Jahr sind Pflicht (Struktur-Briefing Kap. 4 Modul 2, Kap. 5.1).
 * Bildformat 4:3 mit Hotspot-Beschnitt; die Fallseite zeigt das Bild ungeschnitten.
 */
export function ProjectCard({ item, priority = false }: { item: CaseSummary; priority?: boolean }) {
  const t = useTranslations("work");
  const img = item.heroImage?.image?.asset ? imageProps(item.heroImage.image, 1400, 3 / 4) : null;
  const origin = item.origin === "former-agency" ? `${t("originFormerAgency")}${item.formerAgency ? `: ${item.formerAgency}` : ""}` : t("originBrandArchitects");
  return (
    <article className="group">
      <Link href={`/arbeiten/${item.slug}/`} className="block">
        <div className="media-hover aspect-[4/3]">
          {img && <Image {...img} alt={item.heroImage.alt} sizes="(min-width: 768px) 58vw, 100vw" priority={priority} className="h-full w-full object-cover" />}
        </div>
        <div className="rule-strong mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-3">
          <h3 className="h3">{item.client}</h3>
          <span className="label text-muted">{origin} · {item.year}</span>
        </div>
      </Link>
      <dl className="mt-3">
        <dt className="sr-only">{t("task")}</dt><dd>{item.task}</dd>
        <dt className="sr-only">{t("contribution")}</dt><dd className="mt-1 text-muted">{item.contribution}</dd>
      </dl>
    </article>
  );
}
