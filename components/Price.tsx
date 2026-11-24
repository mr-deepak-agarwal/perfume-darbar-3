import { Variant, money, mrpOf, pctOff } from "@/lib/products";
// Discount styling: struck-through M.R.P, the selling price, and a % off badge (client comment 4).
export default function Price({ v, big = false, suffix = true }: { v: Variant; big?: boolean; suffix?: boolean }) {
  const mrp = mrpOf(v), off = pctOff(v);
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2">
      <b className={big ? "text-3xl font-normal" : "text-base"}>{money(v.price)}</b>
      <s className={`text-ink/45 ${big ? "text-lg" : "text-sm"}`} aria-label={`M.R.P ${money(mrp)}`}>{money(mrp)}</s>
      {off > 0 && <span className={`rounded-sm bg-emerald-50 px-1.5 py-0.5 font-semibold text-emerald-700 ${big ? "text-sm" : "text-[11px]"}`}>{off}% off</span>}
      {suffix && <span className={`text-ink/50 ${big ? "text-base" : "text-sm"}`}>{big ? "/" : "for"} {v.size}</span>}
    </span>
  );
}
