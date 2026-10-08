"use client";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/components/WishlistContext";
import { getProduct, Product } from "@/lib/products";
export default function Wishlist() {
  const { ids } = useWishlist();
  const list = ids.map(getProduct).filter(Boolean) as Product[];
  return (<div className="mx-auto max-w-6xl px-5 py-12"><h1 className="text-5xl">Wishlist</h1>
    {list.length ? <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      : <div className="mt-10 rounded-2xl bg-white p-10 text-center"><p className="serif text-2xl">Nothing saved yet</p><p className="mt-2 text-ink/60">Tap the heart on any perfume to save it here.</p><Link href="/shop" className="btn mt-6">Browse perfumes</Link></div>}</div>);
}
