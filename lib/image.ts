import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/lib/content/types";

/**
 * Bild-Abstraktion: Komponenten rufen nur `imageProps()` auf.
 * Liefert URL, Masse und Platzhalter (LQIP) für next/image.
 */
export function imageProps(image: SanityImage, width = 1600) {
  const dims = image.asset?.metadata?.dimensions;
  const ratio = dims ? dims.height / dims.width : 0.66;
  return {
    src: urlFor(image).width(width).url(),
    width,
    height: Math.round(width * ratio),
    blurDataURL: image.asset?.metadata?.lqip,
    placeholder: image.asset?.metadata?.lqip ? ("blur" as const) : ("empty" as const),
  };
}
