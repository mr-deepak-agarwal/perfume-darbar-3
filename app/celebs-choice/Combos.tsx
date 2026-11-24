"use client";
import Link from "next/link";
import { useState } from "react";
import { Scene } from "@/components/Bottle";
import { useCart } from "@/components/CartContext";
import { COMBOS } from "@/lib/combos";
import { Product, money, variantOf, specOf, mrpOf, DEFAULT_VARIANT } from "@/lib/products";

// "Celeb's Choice" (client comment 6): ready-made combos. Titles and picks are our own; no celebrity names or photos
// are used. See lib/combos.ts to add or change combos.
export default function Combos({ products }: { products: Product[] }) {
  const { add } = useCart();
  const [done, setDone] = useState("");
  const by = (s: string) => products.find((p) => p.slug === s);
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl md:text-6xl">Smell like a superstar</h1>
      <p className="mt-3 max-w-xl text-ink/65">Hand-picked pairs of 50 ml perfumes. Two fragrances, one price, ready to wear or gift.</p>
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
        {COMBOS.map((c) => {
          const rows = c.items.flatMap((i) => { const p = by(i.slug); return p ? [{ p, v: variantOf(p, i.v ?? DEFAULT_VARIANT) }] : []; });
          if (rows.length < c.items.length) return null;
          const price = rows.reduce((a, r) => a + r.v.price, 0), mrp = rows.reduce((a, r) => a + mrpOf(r.v), 0);
          return (
            <div key={c.id} className="group">
              <div className="arch-frame"><div className="arch relative aspect-[4/5] overflow-hidden bg-white"><Scene items={rows.map((r) => specOf(r.p, r.v))} bg={["#ffffff", "#ead9cf"]} label={c.title} /></div></div>
              <div className="mt-3 px-1 text-sm">
                <h2 className="serif text-xl leading-tight">{c.title}</h2>
                <p className="mt-1 text-ink/60">{c.blurb}</p>
                <p className="mt-2 text-xs text-amber">{rows.map((r) => <Link key={r.p.slug} href={`/product/${r.p.slug}`} className="mr-3 underline underline-offset-4">{r.p.name}</Link>)}</p>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-2"><b className="text-base">{money(price)}</b><s className="text-ink/45">{money(mrp)}</s><span className="text-ink/50">2 x 50 ml</span></p>
                <button className="btn mt-3 w-full !py-2.5" onClick={() => { rows.forEach((r) => add(r.p.slug, r.v.id)); setDone(c.id); }}>Add combo to cart</button>
                {done === c.id && <p className="mt-2 text-xs text-plum">Added. <Link href="/cart" className="font-semibold underline">View cart</Link></p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
