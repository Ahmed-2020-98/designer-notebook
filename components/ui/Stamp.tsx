export function Stamp({ label = "صح", sub, size = 84, className = "" }: { label?: string; sub?: string; size?: number; className?: string }) {
  return (
    <span className={`stamp ${className}`} style={{ width: size, height: size }} aria-hidden>
      <span className="stamp-label">{label}</span>
      {sub && <span className="stamp-sub">{sub}</span>}
    </span>
  );
}
