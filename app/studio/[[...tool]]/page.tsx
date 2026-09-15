import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/** Sanity Studio unter /studio – Login mit dem Sanity-Konto. */
export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
