"use client";
import { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import { Product } from "@/lib/products";
export default function Gallery({ p }: { p: Product }) {
  const base = p.slug.replace(/-sample$/, "");
  const [extra, setExtra] = useState<string[]>([]);
  const [i, setI] = useState(0);
  useEffect(() => { [2, 3, 4].forEach((n) => { const src = `/products/${base}-${n}.jpg`; const im = new Image(); im.onload = () => setExtra((e) => (e.includes(src) ? e : [...e, src].sort())); im.src = src; }); }, [base]);
  const count = extra.length + 1;
  const show = (k: number) => (k === 0 ? <ProductImage p={p} /> : <img src={extra[k - 1]} alt={`${p.name} view ${k + 1}`} className="absolute inset-0 h-full w-full object-cover" />);
  const arrow = "absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl shadow";
  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      {count > 1 && <div className="flex gap-3 md:flex-col">{Array.from({ length: count }, (_, k) => <button key={k} onClick={() => setI(k)} aria-label={`View ${k + 1}`} className={`relative h-20 w-16 overflow-hidden rounded-xl bg-white ${i === k ? "ring-2 ring-plum" : ""}`}>{show(k)}</button>)}</div>}
      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-3xl bg-white">{show(i)}
        {p.tag && <span className="absolute left-4 top-4 z-10 rounded-full bg-ink px-3 py-1 text-xs text-white">{p.tag}</span>}
        {count > 1 && <><button aria-label="Previous image" onClick={() => setI((i - 1 + count) % count)} className={`${arrow} left-3`}>‹</button><button aria-label="Next image" onClick={() => setI((i + 1) % count)} className={`${arrow} right-3`}>›</button></>}</div>
    </div>
  );
}
