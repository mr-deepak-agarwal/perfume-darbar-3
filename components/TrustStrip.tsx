const ic = (d: string) => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>;
const items: [string, string, React.ReactNode][] = [
  ["COD available", "Pay on delivery", <span key="r" className="text-lg font-semibold">₹</span>],
  ["Made in Goa", "Blended and bottled in Ponda", ic("M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z")],
  ["Free shipping", "Above ₹3,999", ic("M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z")],
  ["Easy returns", "30 days, unused bottles", ic("M4 4v6h6M4 10a8 8 0 112 6")],
];
export default function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-4 rounded-md border border-line bg-white p-5 md:grid-cols-4 ${className}`}>
      {items.map(([t, d, i]) => <div key={t} className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold text-plum">{i}</span><span className="text-sm leading-tight"><b className="block">{t}</b><span className="text-xs text-ink/60">{d}</span></span></div>)}
    </div>
  );
}
