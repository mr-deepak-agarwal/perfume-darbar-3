import { Product, VariantId, money, mrpOf } from "@/lib/products";
// Size dropdown: 6 ml and 12 ml attars, then 30 / 50 / 100 ml perfumes. Price (and M.R.P) shown in each option.
export default function SizeSelect({ p, value, onChange, className = "", id }: { p: Product; value: VariantId; onChange: (v: VariantId) => void; className?: string; id?: string }) {
  // Only perfumes are on sale for now: 30 / 50 / 100 ml, price (and M.R.P) shown in each option.
  const opts = p.variants;
  return (
    <select id={id} aria-label={`Size for ${p.name}`} value={value} onChange={(e) => onChange(e.target.value as VariantId)} className={`field cursor-pointer ${className}`}>
      {opts.map((x) => <option key={x.id} value={x.id}>{x.size} · {money(x.price)} (M.R.P {money(mrpOf(x))})</option>)}
    </select>
  );
}
