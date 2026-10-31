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
  const kind = p.category === "Unisex" ? `${p.scent}, unisex` : `${p.scent}, for ${p.category.toLowerCase()}`;
  return (
    <div className="group">
      <div className="arch-frame transition-colors group-hover:border-amber">
        <div className="arch relative aspect-[4/5] overflow-hidden bg-white">
          <Link href={`/product/${p.slug}`} className="absolute inset-0" aria-label={p.name}><ProductImage p={p} /></Link>
          <button onClick={() => toggle(p.slug)} aria-label="Toggle wishlist" aria-pressed={has(p.slug)} className="absolute right-[7%] top-[22%] z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg shadow-sm">{has(p.slug) ? "♥" : "♡"}</button>
          <button onClick={() => add(p.slug, v.id)} className={`btn btn-gold absolute inset-x-3 bottom-3 z-10 !py-2 text-sm ${showAdd ? "" : "md:translate-y-14 md:transition-transform md:group-hover:translate-y-0"}`}>Add to cart ({v.size})</button>
        </div>
      </div>
      <div className="mt-3 px-1 text-sm">
        <div className="flex items-start justify-between gap-2"><Link href={`/product/${p.slug}`}><h3 className="serif text-xl leading-tight">{p.name}</h3></Link>{p.tag && <span className="mt-1 shrink-0 rounded-sm bg-plum px-2 py-0.5 text-xs text-gold">{p.tag}</span>}</div>
        <p className="mt-0.5 text-ink/60">{kind}</p>
        <p className="mt-0.5 text-xs text-amber">{n(p.top)}, {n(p.heart)}, {n(p.base)}</p>
        <div className="mt-2 flex items-end justify-between gap-2 border-t border-line pt-2"><p><b className="text-base">{money(v.price)}</b> <span className="text-ink/50">for {v.size}</span></p><span className="text-xs text-ink/65">Pure oil from {money(oilFrom)}</span></div>
      </div>
    </div>
  );
}
