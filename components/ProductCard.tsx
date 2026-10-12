"use client";
import Link from "next/link";
import Bottle from "./Bottle";
import { useCart } from "./CartContext";
import { Product, money, off } from "@/lib/products";
export default function ProductCard({ p, className = "" }: { p: Product; className?: string }) {
  const { add } = useCart();
  return (
    <div className={className}>
      <Link href={`/product/${p.slug}`} className="relative block aspect-square border-2 border-ink" style={{ background: p.bg }}>
        <Bottle liquid={p.liquid} className="absolute inset-0 m-auto h-4/5" />
        {p.tag && <span className="absolute left-3 top-3 border-2 border-ink bg-white px-2 py-0.5 text-xs font-bold">{p.tag}</span>}
      </Link>
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
