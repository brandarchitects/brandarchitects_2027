/** Pfeil als Inline-SVG (kein Icon-Font, CLAUDE.md Regel 14). Dekorativ, deshalb aria-hidden. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" className={`arrow ${className}`}>
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}
