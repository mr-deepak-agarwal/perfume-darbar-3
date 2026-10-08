"use client";
import Link from "next/link";
import ProductImage from "./ProductImage";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { Product, money } from "@/lib/products";
export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
        <Link href={`/product/${p.slug}`} className="absolute inset-0" aria-label={p.name}><ProductImage p={p} /></Link>
        {p.tag && <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs text-white">{p.tag}</span>}
        <button onClick={() => toggle(p.slug)} aria-label="Toggle wishlist" aria-pressed={has(p.slug)} className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg">{has(p.slug) ? "♥" : "♡"}</button>
        <button onClick={() => add(p.slug)} className="btn absolute inset-x-3 bottom-3 z-10 !py-2 text-sm md:translate-y-14 md:transition-transform md:group-hover:translate-y-0">Add to cart</button>
      </div>
      <div className="mt-3"><p className="text-xs text-ink/55">{p.brand}</p>
        <div className="flex items-start justify-between gap-3"><Link href={`/product/${p.slug}`}><h3 className="serif text-lg leading-tight">{p.name}</h3></Link><p className="text-sm font-semibold">{money(p.price)}</p></div>
        <p className="text-sm text-ink/60">{p.family === "Set" ? "Gift set" : `${p.family} · ${p.conc}`} · {p.size}</p></div>
    </div>
  );
}
