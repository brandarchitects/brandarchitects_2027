import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset });

/** Bild-URL aus Sanity mit automatischem Format; Grössen setzt next/image. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
