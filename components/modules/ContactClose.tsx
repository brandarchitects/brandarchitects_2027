import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ContactTopic } from "@/lib/content/types";

/**
 * Modul 9a: Kontaktabschluss am Seitenende – Titel, Text, ein CTA mit Vorbelegung (?thema=),
 * optional die direkte E-Mail als gleichwertiger Kontaktweg (Struktur-Briefing Kap. 4 Modul 8).
 */
export function ContactClose({ title, text, label, topic, email }: { title: string; text?: string; label: string; topic?: ContactTopic; email?: string }) {
  const t = useTranslations("contact");
  const href = topic ? `/kontakt/?thema=${topic}` : "/kontakt/";
  return (
    <section className="mx-auto max-w-7xl px-6 py-section">
      <h2 className="text-3xl font-semibold">{title}</h2>
      {text && <p className="mt-4 max-w-measure text-muted">{text}</p>}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link href={href} className="inline-block rounded-full bg-ink px-5 py-3 text-paper">{label}</Link>
        {email && <span className="text-muted">{t("orByEmail")} <a href={`mailto:${email}`} className="text-ink" data-track="email_click">{email}</a></span>}
      </div>
    </section>
  );
}
