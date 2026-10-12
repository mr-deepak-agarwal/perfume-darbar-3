"use client";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/components/WishlistContext";
import { getProduct, Product } from "@/lib/products";
export default function Wishlist() {
  const { ids } = useWishlist();
  const list = ids.map(getProduct).filter(Boolean) as Product[];
  return (<div className="mx-auto max-w-7xl px-5 py-12"><h1 className="text-6xl md:text-7xl">Wishlist</h1>
    {list.length ? <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      : <div className="mt-10 border-2 border-ink p-10 text-center shadow-[6px_6px_0_#0b1020]"><p className="display text-3xl">Nothing saved yet</p><p className="mt-2">Tap the heart on any perfume to save it here.</p><Link href="/shop" className="btn mt-6">Browse scents</Link></div>}</div>);
}
