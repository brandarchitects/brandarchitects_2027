import { useTranslations } from "next-intl";

/** Erster fokussierbarer Link: springt zum Hauptinhalt (Tastatur, Screenreader). */
export function SkipLink() {
  const t = useTranslations("nav");
  return (
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2">
      {t("skipToContent")}
    </a>
  );
}
