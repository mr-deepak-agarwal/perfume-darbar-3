export default function Bottle({ c1, c2, id, className = "" }: { c1: string; c2: string; id: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 280" className={className} role="img" aria-label="Perfume bottle">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} /></linearGradient>
        <linearGradient id={`s-${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".35" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <ellipse cx="100" cy="266" rx="62" ry="8" fill="#000" opacity=".12" />
      <rect x="82" y="22" width="36" height="34" rx="4" fill="#c27c1a" />
      <rect x="90" y="52" width="20" height="16" fill="#8a5a14" />
      <rect x="36" y="66" width="128" height="190" rx="22" fill={`url(#g-${id})`} />
      <rect x="36" y="66" width="128" height="190" rx="22" fill={`url(#s-${id})`} />
      <rect x="62" y="130" width="76" height="70" rx="3" fill="#fff" opacity=".9" />
      <rect x="72" y="146" width="56" height="3" fill="#24102e" opacity=".7" />
      <rect x="80" y="156" width="40" height="2" fill="#24102e" opacity=".35" />
      <rect x="84" y="168" width="32" height="2" fill="#24102e" opacity=".35" />
    </svg>
  );
}
