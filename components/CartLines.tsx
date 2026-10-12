"use client";
import Bottle from "./Bottle";
import { useCart } from "./CartContext";
import { getProduct, money, sizePrice } from "@/lib/products";
export default function CartLines() {
  const { lines, setQty } = useCart();
  return (
    <ul className="space-y-4">
      {lines.map((l) => { const p = getProduct(l.slug)!; return (
        <li key={l.slug + l.size} className="flex gap-4 border-2 border-ink p-3">
          <div className="h-24 w-20 shrink-0 border-2 border-ink p-1" style={{ background: p.bg }}><Bottle liquid={p.liquid} className="h-full w-full" /></div>
          <div className="flex-1 text-sm">
            <div className="flex justify-between gap-2"><p className="display text-lg">{p.name}</p><p className="font-bold">{money(sizePrice(p, l.size) * l.qty)}</p></div>
            <p className="text-ink/60">{l.size} ml</p>
            <div className="mt-3 flex items-center gap-3"><div className="flex border-2 border-ink"><button aria-label="Decrease" className="px-3" onClick={() => setQty(l.slug, l.size, l.qty - 1)}>−</button><span className="w-6 text-center">{l.qty}</span><button aria-label="Increase" className="px-3" onClick={() => setQty(l.slug, l.size, l.qty + 1)}>+</button></div><button className="underline" onClick={() => setQty(l.slug, l.size, 0)}>Remove</button></div>
          </div>
        </li>); })}
    </ul>
  );
}
