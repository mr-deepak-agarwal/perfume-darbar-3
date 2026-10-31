"use client";
import Link from "next/link";
import ProductImage from "./ProductImage";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { Product, money, fromPrice, DEFAULT_VARIANT, variantOf } from "@/lib/products";
const n = (s: string) => s.split(",")[0];
export default function ProductCard({ p, showAdd = false }: { p: Product; showAdd?: boolean }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const v = variantOf(p, DEFAULT_VARIANT);
  const oilFrom = Math.min(...p.variants.filter((x) => x.kind === "Pure oil").map((x) => x.price));
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
        <Link href={`/product/${p.slug}`} className="absolute inset-0" aria-label={p.name}><ProductImage p={p} /></Link>
        {p.tag && <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs text-white">{p.tag}</span>}
        <button onClick={() => toggle(p.slug)} aria-label="Toggle wishlist" aria-pressed={has(p.slug)} className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg">{has(p.slug) ? "♥" : "♡"}</button>
        <button onClick={() => add(p.slug, v.id)} className={`btn absolute inset-x-3 bottom-3 z-10 !py-2 text-sm ${showAdd ? "" : "md:translate-y-14 md:transition-transform md:group-hover:translate-y-0"}`}>Add to cart · {v.size}</button>
      </div>
      <div className="mt-3 text-sm">
        <p className="text-ink/60">{p.scent} · {p.category}</p>
        <Link href={`/product/${p.slug}`}><h3 className="serif text-lg leading-tight">{p.name}</h3></Link>
        <p className="mt-0.5 text-xs text-plum">{n(p.top)} | {n(p.heart)} | {n(p.base)}</p>
        <p className="mt-0.5 text-xs">★ {p.rating} <span className="text-ink/50">({p.reviews})</span></p>
        <div className="mt-1.5 flex items-center justify-between gap-2"><p><b className="text-base">{money(v.price)}</b> <span className="text-ink/50">/ {v.size}</span></p><span className="rounded-full border border-line px-2.5 py-0.5 text-xs">Pure oil from {money(oilFrom)}</span></div>
      </div>
    </div>
  );
}
