/**
 * Brand Reel unter dem Hero: Ausschnitte realer Arbeiten als stummer Loop. Startet leicht eingerückt und weitet
 * sich beim ersten Scrollen auf volle Breite (CSS scroll-driven animation, mit @supports-Guard – kein JavaScript).
 * Steuerung (Pause ausserhalb des Viewports, reduced-motion → Poster + Controls) in components/motion/MotionLayer.tsx.
 * Renditions: public/media/reel-placeholder.webm ist ein gekennzeichneter PLATZHALTER (kinetische Typografie);
 * das echte Reel kommt als reel-1080.webm / reel-1080.mp4 / reel-720.mp4 (≤ 4–6 MB) und ersetzt die Quellen hier.
 */
export function Reel({ label }: { label: string }) {
  return (
    <div className="reel-frame relative overflow-hidden bg-ink" aria-label={label}>
      <video data-reel className="aspect-video w-full object-cover" muted playsInline loop autoPlay preload="metadata" poster="/media/reel-poster.jpg" width={1920} height={1080}>
        <source src="/media/reel-placeholder.webm" type="video/webm" />
      </video>
    </div>
  );
}
