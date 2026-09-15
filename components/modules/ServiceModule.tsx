import { Link } from "@/i18n/navigation";

/** Modul 5: Leistungsmodul – Anlass, Ergebnis, weiterführender Link. */
export function ServiceModule({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <article>
      <h3 className="text-xl font-semibold"><Link href={href}>{title}</Link></h3>
      <p className="mt-2 text-muted">{text}</p>
    </article>
  );
}
