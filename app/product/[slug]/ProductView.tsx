"use client";
import Link from "next/link";
import { useState } from "react";
import ProductImage from "@/components/ProductImage";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { Product, money } from "@/lib/products";
type Review = { name: string; rating: number; text: string; date: string };
export default function ProductView({ p, reviews }: { p: Product; reviews: Review[] }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [q, setQ] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("Description");
  const [pin, setPin] = useState("");
  const [eta, setEta] = useState("");
  return (
    <>
      <nav className="mb-6 text-sm text-ink/60"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <Link href={`/shop?b=${encodeURIComponent(p.brand)}`}>{p.brand}</Link> / {p.name}</nav>
      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-white"><ProductImage p={p} />{p.tag && <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs text-white">{p.tag}</span>}</div>
        <div>
          <Link href={`/shop?b=${encodeURIComponent(p.brand)}`} className="text-sm text-ink/60 underline underline-offset-4">{p.brand}</Link>
          <h1 className="mt-1 text-5xl">{p.name}</h1>
          <p className="mt-3 text-sm">★ {p.rating} <span className="text-ink/50">({p.reviews} reviews)</span></p>
          <p className="mt-5 text-3xl">{money(p.price)} <span className="text-base text-ink/50">/ {p.size}</span></p>
          <p className="mt-1 text-xs text-ink/50">Inclusive of all taxes. {p.category} · {p.family === "Set" ? "Gift set" : `${p.family} · ${p.conc}`}</p>
          <div className="mt-7 flex gap-3">
            <div className="flex items-center rounded-full border border-line bg-white"><button aria-label="Decrease" className="px-4 py-3" onClick={() => setQ(Math.max(1, q - 1))}>−</button><span className="w-6 text-center text-sm">{q}</span><button aria-label="Increase" className="px-4 py-3" onClick={() => setQ(q + 1)}>+</button></div>
            <button className="btn flex-1" onClick={() => { add(p.slug, q); setAdded(true); }}>Add to cart</button>
            <button onClick={() => toggle(p.slug)} aria-pressed={has(p.slug)} aria-label="Toggle wishlist" className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-xl">{has(p.slug) ? "♥" : "♡"}</button>
          </div>
          {added && <p className="mt-3 text-sm text-plum">Added to your cart. <Link href="/cart" className="font-semibold underline">View cart</Link></p>}
          <div className="mt-6 flex gap-2"><input className="field !w-40" placeholder="PIN code" inputMode="numeric" aria-label="PIN code" value={pin} onChange={(e) => setPin(e.target.value)} /><button className="btn btn-ghost !py-2" onClick={() => setEta(pin.length === 6 ? "Delivery in 3 to 6 working days. Cash on delivery available." : "Enter a valid 6-digit PIN code.")}>Check delivery</button></div>
          {eta && <p className="mt-2 text-sm text-ink/70">{eta}</p>}
          <div className="mt-8 divide-y divide-line rounded-2xl bg-white">{[["Top notes", p.top], ["Heart notes", p.heart], ["Base notes", p.base]].map(([k, v]) => <div key={k} className="flex justify-between gap-4 px-5 py-4 text-sm"><span className="font-semibold">{k}</span><span className="text-right text-ink/70">{v}</span></div>)}</div>
        </div>
      </div>
      <div className="mt-16 border-b border-line">{["Description", "Reviews", "Shipping"].map((t) => <button key={t} onClick={() => setTab(t)} className={`mr-8 pb-3 text-sm font-semibold ${tab === t ? "border-b-2 border-ink" : "text-ink/50"}`}>{t}{t === "Reviews" ? ` (${p.reviews})` : ""}</button>)}</div>
      <div className="mt-6 max-w-2xl text-ink/75 leading-relaxed">
        {tab === "Description" && <p>{p.desc} Wear it on pulse points after moisturising for the longest wear. Patch-test before first use.</p>}
        {tab === "Reviews" && <ul className="space-y-5">{reviews.map((r, i) => <li key={i} className="rounded-2xl bg-white p-5"><p className="text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)} <span className="ml-2 font-semibold">{r.name}</span> <span className="text-ink/50">· {r.date}</span></p><p className="mt-2">{r.text}</p></li>)}</ul>}
        {tab === "Shipping" && <ul className="list-disc space-y-2 pl-5"><li>Free shipping above ₹3,999, otherwise ₹149.</li><li>Delivery in 3 to 6 working days across India.</li><li>30-day returns on unused, sealed bottles. <Link href="/help/shipping-returns" className="underline">Full policy</Link></li></ul>}
      </div>
    </>
  );
}
