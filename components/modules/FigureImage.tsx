import Image from "next/image";
import type { Figure } from "@/lib/content/types";
import { imageProps } from "@/lib/image";

/**
 * Modul 4: Bild mit Legende (Bild, Aufgabe, Beitrag). Einziger Weg, Inhaltsbilder auszugeben.
 * Ungeschnitten (eigenes Seitenverhältnis); Legende klein, mit Haarlinie, damit Bild und Text zusammen lesbar sind.
 */
export function FigureImage({ figure, priority = false, sizes = "(min-width: 1440px) 1360px, 100vw" }: { figure: Figure; priority?: boolean; sizes?: string }) {
  if (!figure?.image?.asset) return null;
  const props = imageProps(figure.image);
  return (
    <figure>
      <div className="bg-paper-2"><Image {...props} alt={figure.alt} sizes={sizes} priority={priority} className="h-auto w-full" /></div>
      <figcaption className="rule mt-3 max-w-[var(--max-width-measure)] pt-2 body-sm text-muted">{figure.caption}</figcaption>
    </figure>
  );
}
