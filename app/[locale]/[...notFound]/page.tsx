import { notFound } from "next/navigation";

/** Fängt unbekannte Pfade innerhalb einer Sprache und zeigt not-found.tsx im Sprach-Layout. */
export default function CatchAll() {
  notFound();
}
