"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

/**
 * Mobile Navigation. Client-Komponente, weil Öffnen/Schliessen Zustand braucht.
 * (Begründung für 'use client' – siehe CLAUDE.md Regel 1.)
 */
export function MobileNav({ items, openLabel, closeLabel }: { items: readonly { href: string; label: string }[]; openLabel: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)} className="px-2 py-1">
        {open ? closeLabel : openLabel}
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile Navigation" className="absolute inset-x-0 top-16 z-40 border-b border-line bg-paper px-6 py-6">
          <ul className="flex flex-col gap-4">
            {items.map((i) => (
              <li key={i.href}><Link href={i.href} onClick={() => setOpen(false)}>{i.label}</Link></li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
