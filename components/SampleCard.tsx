"use client";
import Link from "next/link";
import ProductImage from "./ProductImage";
import { useCart } from "./CartContext";
import { Product, money } from "@/lib/products";
export default function SampleCard({ p }: { p: Product }) {
  const { add } = useCart();
  const base = p.slug.replace(/-sample$/, "");
  return (
    <div className="rounded-2xl bg-white p-4">
      <Link href={`/product/${base}`} className="relative block aspect-square overflow-hidden rounded-xl bg-mist" aria-label={p.name}><ProductImage p={p} /></Link>
      <p className="mt-3 text-xs text-ink/55">{p.brand}</p>
      <h3 className="serif text-lg leading-tight">{p.name.replace(" Sample", "")}</h3>
      <p className="text-sm text-ink/60">{p.scent} · 5 ml travel spray</p>
      <div className="mt-3 flex items-center justify-between"><b>{money(p.price)}</b><button className="btn !py-2 text-sm" onClick={() => add(p.slug)}>Add sample</button></div>
    </div>
  );
}
