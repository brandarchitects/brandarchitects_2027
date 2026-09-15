import { Link } from "@/i18n/navigation";
import type { ContactTopic } from "@/lib/content/types";

/** Modul 9a: Kontaktabschluss am Seitenende – Titel, Text, ein CTA mit Vorbelegung (?thema=). */
export function ContactClose({ title, text, label, topic }: { title: string; text?: string; label: string; topic?: ContactTopic }) {
  const href = topic ? `/kontakt/?thema=${topic}` : "/kontakt/";
  return (
    <section className="mx-auto max-w-7xl px-6 py-section">
      <h2 className="text-3xl font-semibold">{title}</h2>
      {text && <p className="mt-4 max-w-measure text-muted">{text}</p>}
      <Link href={href} className="mt-8 inline-block rounded-full bg-ink px-5 py-3 text-paper">{label}</Link>
    </section>
  );
}
