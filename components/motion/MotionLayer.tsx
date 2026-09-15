"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Motion-Schicht der Site (Client-Komponente – Begründung CLAUDE.md Regel 1: «künftige Motion-Wrapper»).
 * Rendert nichts; steuert per IntersectionObserver:
 *  - [data-reveal]: Sektionen erscheinen beim Einscrollen (CSS in globals.css, greift nur mit html.js)
 *  - [data-count]: Zahlen zählen beim Einscrollen hoch (Zahlenzeile)
 *  - video[data-reel]: Reel pausiert ausserhalb des Viewports; bei reduced-motion Poster + Controls statt Autoplay
 * Ohne JavaScript bleibt alles sichtbar. prefers-reduced-motion schaltet Bewegung ab. Läuft nach jedem Seitenwechsel.
 */
export function MotionLayer() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    let io: IntersectionObserver | undefined;
    if (reduced) reveals.forEach((el) => el.classList.add("is-visible"));
    else {
      io = new IntersectionObserver((entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-visible"); io?.unobserve(e.target); }
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      reveals.forEach((el) => io!.observe(el));
    }

    let ioCount: IntersectionObserver | undefined;
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    if (counters.length && !reduced) {
      ioCount = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement; ioCount?.unobserve(el);
          const target = parseFloat(el.dataset.count || "0"); const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / 1000, 1); const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      }, { threshold: 0.4 });
      counters.forEach((el) => ioCount!.observe(el));
    }

    let ioVideo: IntersectionObserver | undefined;
    const videos = document.querySelectorAll<HTMLVideoElement>("video[data-reel]");
    if (videos.length) {
      if (reduced) videos.forEach((v) => { v.removeAttribute("autoplay"); v.pause(); v.controls = true; });
      else {
        ioVideo = new IntersectionObserver((entries) => {
          for (const e of entries) { const v = e.target as HTMLVideoElement; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }
        }, { threshold: 0.2 });
        videos.forEach((v) => ioVideo!.observe(v));
      }
    }
    return () => { io?.disconnect(); ioCount?.disconnect(); ioVideo?.disconnect(); };
  }, [pathname]);
  return null;
}
