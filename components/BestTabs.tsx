"use client";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { scents, products, Scent } from "@/lib/products";
export default function BestTabs() {
  const [s, setS] = useState<Scent>("Fresh Notes");
  const list = products.filter((p) => p.scent === s).sort((a, b) => b.sold - a.sold).slice(0, 4);
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">{scents.map((x) => <button key={x} role="tab" aria-selected={s === x} onClick={() => setS(x)} className={`shrink-0 rounded-full border px-5 py-2 text-sm ${s === x ? "border-ink bg-ink text-white" : "border-line bg-white"}`}>{x}</button>)}</div>
      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      <Link href={`/shop?s=${encodeURIComponent(s)}`} className="btn btn-ghost mt-8">View all {s} perfumes</Link>
    </div>
  );
}
