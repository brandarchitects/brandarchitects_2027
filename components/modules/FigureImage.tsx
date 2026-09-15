import Image from "next/image";
import type { Figure } from "@/lib/content/types";
import { imageProps } from "@/lib/image";

/** Modul 4: Bild mit Legende (Bild, Aufgabe, Beitrag). Einziger Weg, Inhaltsbilder auszugeben. */
export function FigureImage({ figure, priority = false, sizes = "(min-width: 1024px) 1100px, 100vw" }: { figure: Figure; priority?: boolean; sizes?: string }) {
  if (!figure?.image?.asset) return null;
  const props = imageProps(figure.image);
  return (
    <figure>
      <Image {...props} alt={figure.alt} sizes={sizes} priority={priority} className="h-auto w-full" />
      <figcaption className="mt-3 text-sm text-muted">{figure.caption}</figcaption>
    </figure>
  );
}
