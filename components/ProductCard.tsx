"use client";
import Link from "next/link";
import ProductImage from "./ProductImage";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { Product, money, off } from "@/lib/products";
export default function ProductCard({ p, className = "" }: { p: Product; className?: string }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  return (
    <div className={className}>
      <div className="relative aspect-square overflow-hidden border-2 border-ink" style={{ background: p.bg }}>
        <Link href={`/product/${p.slug}`} className="absolute inset-0" aria-label={p.name}><ProductImage p={p} /></Link>
        {p.tag && <span className="absolute left-3 top-3 border-2 border-ink bg-white px-2 py-0.5 text-xs font-bold">{p.tag}</span>}
        <button onClick={() => toggle(p.slug)} aria-label="Toggle wishlist" aria-pressed={has(p.slug)} className="absolute right-3 top-3 grid h-9 w-9 place-items-center border-2 border-ink bg-white text-lg">{has(p.slug) ? "♥" : "♡"}</button>
      </div>
      <div className="mt-3 text-sm">
        <p className="text-xs font-semibold text-ink/60">{p.category} · {p.gender}</p>
        <Link href={`/product/${p.slug}`} className="display mt-0.5 block text-xl leading-tight">{p.name}</Link>
        <p className="text-ink/60">{p.line}</p>
        <p className="mt-1.5"><b className="text-base">{money(p.price)}</b> <s className="text-ink/45">{money(p.mrp)}</s> <span className="font-bold text-blue">{off(p)}% off</span></p>
        <p className="mt-0.5 text-xs">★ {p.rating} <span className="text-ink/50">({p.reviews})</span></p>
      </div>
      <button onClick={() => add(p.slug, 50, 1)} className="btn btn-alt mt-3 w-full py-2 text-sm">Add to bag</button>
    </div>
  );
}
