"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

/**
 * Mobile Navigation. Client-Komponente, weil Öffnen/Schliessen Zustand braucht.
 * (Begründung für 'use client' – siehe CLAUDE.md Regel 1.)
 * Offen: Vollflächiges Menü in Tinte, grosse Einträge mit Registerziffern; Escape schliesst; Scroll gesperrt.
 */
export function MobileNav({ items, openLabel, closeLabel }: { items: readonly { href: string; label: string }[]; openLabel: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <div className="md:hidden">
      <button type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}
        className={`relative z-50 -mr-2 inline-flex min-h-11 items-center gap-2 px-2 text-[0.9375rem] font-medium ${open ? "text-paper" : ""}`}>
        <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
          <span className={`block h-px bg-current transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`block h-px bg-current transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </span>
        {open ? closeLabel : openLabel}
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile Navigation" className="on-ink fixed inset-0 z-40 bg-ink px-[var(--spacing-gutter)] pt-24 text-paper">
          <ol className="flex flex-col divide-y divide-paper/20 border-y border-paper/20">
            {items.map((i, n) => (
              <li key={i.href}>
                <Link href={i.href} onClick={() => setOpen(false)} className="flex items-baseline gap-5 py-4">
                  <span className="index-sm text-paper/60">{String(n + 1).padStart(2, "0")}</span>
                  <span className="h2">{i.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}
