import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CaseSummary } from "@/lib/content/types";
import { imageProps } from "@/lib/image";

/** Modul 3: Projektkarte – Kunde · Aufgabe · Beitrag · Bild einer tatsächlichen Anwendung · Link. */
export function ProjectCard({ item }: { item: CaseSummary }) {
  const t = useTranslations("work");
  const img = item.heroImage?.image?.asset ? imageProps(item.heroImage.image, 1200) : null;
  return (
    <article>
      <Link href={`/arbeiten/${item.slug}/`} className="block">
        {img && <Image {...img} alt={item.heroImage.alt} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />}
        <h3 className="mt-5 text-xl font-semibold">{item.client}</h3>
      </Link>
      <dl className="mt-2 text-muted">
        <dt className="sr-only">{t("task")}</dt><dd>{item.task}</dd>
        <dt className="sr-only">{t("contribution")}</dt><dd>{item.contribution}</dd>
      </dl>
    </article>
  );
}
