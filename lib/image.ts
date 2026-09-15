import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/lib/content/types";

/**
 * Bild-Abstraktion: Komponenten rufen nur `imageProps()` auf.
 * Liefert URL, Masse und Platzhalter (LQIP) für next/image.
 * `ratio` (Höhe/Breite) erzwingt einen Beschnitt über das Sanity-CDN mit Hotspot – für Karten mit festem Format.
 * Lokale Vorschau: Assets mit relativer URL (beginnt mit «/») werden direkt ausgegeben (kein CDN).
 */
export function imageProps(image: SanityImage, width = 1600, ratio?: number) {
  const dims = image.asset?.metadata?.dimensions;
  const r = ratio ?? (dims ? dims.height / dims.width : 0.66);
  const height = Math.round(width * r);
  const local = image.asset?.url?.startsWith("/");
  const src = local ? image.asset!.url! : (ratio ? urlFor(image).width(width).height(height).fit("crop") : urlFor(image).width(width)).url();
  return {
    src,
    width,
    height,
    blurDataURL: image.asset?.metadata?.lqip,
    placeholder: image.asset?.metadata?.lqip ? ("blur" as const) : ("empty" as const),
    unoptimized: local || undefined,
  };
}
