import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 "proxy" (früher middleware): löst die Sprache aus der URL auf.
 * Läuft nicht für API-Routen, das Studio, Next-Interna und statische Dateien.
 */
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
