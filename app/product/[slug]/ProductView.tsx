"use client";
import { useState } from "react";
import Bottle from "@/components/Bottle";
import { useCart } from "@/components/CartContext";
import { Product, money, sizePrice, sizes } from "@/lib/products";
export default function ProductView({ p }: { p: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<number>(50);
  const [qty, setQty] = useState(1);
  return (
    <div className="grid border-b-2 border-ink md:grid-cols-2">
      <div className="relative min-h-[420px] border-ink md:sticky md:top-[88px] md:h-[calc(100vh-88px)] md:border-r-2" style={{ background: p.bg }}>
        <Bottle liquid={p.liquid} className="absolute inset-0 m-auto h-3/4" />
        {p.tag && <span className="absolute left-5 top-5 border-2 border-ink bg-white px-3 py-1 text-sm font-bold">{p.tag}</span>}
      </div>
      <div className="p-6 md:p-12">
        <p className="font-semibold">{p.category} · {p.gender} · {p.line}</p>
        <h1 className="mt-2 text-6xl md:text-7xl">{p.name}</h1>
        <p className="mt-3 text-sm">★ {p.rating} · {p.reviews} reviews</p>
        <p className="mt-6 max-w-md text-lg">{p.desc}</p><p className="mt-3 text-sm"><b>Best for:</b> {p.occasions.join(", ")}</p>
        <p className="mt-8 text-sm font-bold">Choose size</p>
        <div className="mt-2 flex gap-3">{sizes.map((s) => <button key={s} onClick={() => setSize(s)} className="chip text-left" data-on={size === s}>{s} ml<br /><span className="text-xs font-normal">{money(sizePrice(p, s))}</span></button>)}</div>
        <div className="mt-6 flex gap-3">
          <div className="flex items-center border-2 border-ink"><button aria-label="Decrease" className="px-4 py-3" onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span className="w-6 text-center">{qty}</span><button aria-label="Increase" className="px-4 py-3" onClick={() => setQty(qty + 1)}>+</button></div>
          <button className="btn flex-1" onClick={() => add(p.slug, size, qty)}>Add to bag · {money(sizePrice(p, size) * qty)}</button>
        </div>
        <p className="mt-3 text-sm text-ink/60">Ships in 24 hours. 30-day returns on unused bottles.</p>
        <div className="mt-10 border-t-2 border-ink">
          {[["Scent notes", `Top: ${p.top}. Heart: ${p.heart}. Base: ${p.base}.`], ["How long it lasts", "6 to 8 hours on skin at 18% oil concentration."], ["Shipping and returns", "Free above ₹1,999. Delivered in 3 to 6 working days across India."]].map(([t, d]) => (
            <details key={t} className="group border-b-2 border-ink py-4"><summary className="display flex cursor-pointer list-none justify-between text-xl">{t}<span className="group-open:rotate-45 transition-transform">+</span></summary><p className="mt-3 max-w-md text-sm">{d}</p></details>))}
        </div>
      </div>
    </div>
  );
}
