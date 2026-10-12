export default function Bottle({ liquid, className = "" }: { liquid: string; className?: string }) {
  return (
    <svg viewBox="0 0 160 240" className={className} role="img" aria-label="Perfume bottle">
      <rect x="60" y="12" width="40" height="46" rx="4" fill="#0b1020" />
      <rect x="52" y="56" width="56" height="12" fill="#0b1020" />
      <rect x="24" y="68" width="112" height="160" rx="14" fill={liquid} stroke="#0b1020" strokeWidth="4" />
      <rect x="34" y="78" width="14" height="140" rx="7" fill="#fff" opacity=".35" />
      <rect x="54" y="128" width="70" height="60" fill="#fff" stroke="#0b1020" strokeWidth="3" />
      <circle cx="89" cy="150" r="9" fill="#0b1020" />
      <rect x="68" y="168" width="42" height="4" fill="#0b1020" />
    </svg>
  );
}
