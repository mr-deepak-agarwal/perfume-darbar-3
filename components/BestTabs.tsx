"use client";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { categories, products, Cat } from "@/lib/products";
export default function BestTabs() {
  const [c, setC] = useState<Cat>("Fresh Notes");
  const list = products.filter((p) => p.category === c).sort((a, b) => b.sold - a.sold).slice(0, 4);
  return (
    <div>
      <div className="noscroll flex gap-2 overflow-x-auto pb-1" role="tablist">{categories.map((x) => <button key={x} role="tab" aria-selected={c === x} className="chip shrink-0" data-on={c === x} onClick={() => setC(x)}>{x}</button>)}</div>
      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      <Link href={`/shop?c=${encodeURIComponent(c)}`} className="btn btn-alt mt-8">View all {c} perfumes</Link>
    </div>
  );
}
