import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ContactTopic } from "@/lib/content/types";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Modul 9a: Kontaktabschluss am Seitenende – auf Tinte, geht ohne Bruch in den Footer über
 * (zweiter Signaturzug, docs/design-spec.md). Titel, Text, ein CTA mit Vorbelegung (?thema=),
 * optional die direkte E-Mail als gleichwertiger Kontaktweg (Struktur-Briefing Kap. 4 Modul 8).
 */
export function ContactClose({ title, text, label, topic, email }: { title: string; text?: string; label: string; topic?: ContactTopic; email?: string }) {
  const t = useTranslations("contact");
  const href = topic ? `/kontakt/?thema=${topic}` : "/kontakt/";
  return (
    <section className="on-ink mt-[var(--spacing-section)] bg-ink text-paper">
      <div className="site grid-12 py-[var(--spacing-section)]">
        <h2 className="h1 col-span-12 max-w-[16ch] md:col-span-8">{title}</h2>
        <div className="col-span-12 md:col-span-5 md:col-start-8">
          {text && <p className="lead text-paper/80">{text}</p>}
          <div className={`${text ? "mt-8" : ""} flex flex-wrap items-center gap-x-6 gap-y-4`}>
            <Link href={href} className="btn btn-ink">{label}<Arrow /></Link>
            {email && <span className="text-paper/70">{t("orByEmail")} <a href={`mailto:${email}`} className="link text-paper" data-track="email_click">{email}</a></span>}
          </div>
        </div>
      </div>
    </section>
  );
}
