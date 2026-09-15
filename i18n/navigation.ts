import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Sprachbewusste Navigations-Helfer. IMMER diese verwenden – nie `next/link` direkt.
 * `<Link href="/arbeiten/">` setzt das Sprachpräfix automatisch.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
