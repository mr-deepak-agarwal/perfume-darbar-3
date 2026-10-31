"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { OFFERS } from "@/lib/offers";
const nav = [["Women", "/shop?g=Women"], ["Men", "/shop?g=Men"], ["Unisex", "/shop?g=Unisex"], ["Oud", "/collections/oud"], ["Musk", "/collections/musk"], ["Collections", "/collections"], ["Find my scent", "/quiz"]];
export default function Header() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const r = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-mist/95 backdrop-blur">
      <div className="overflow-hidden bg-ink py-2 text-xs font-semibold tracking-wide text-white" aria-label="Current offers"><div className="ticker">{[0, 1].map((k) => <div key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">{[...OFFERS, ...OFFERS].map((o, i) => <span key={i} className="flex items-center"><span>{o}</span><span className="mx-6 text-amber">✦</span></span>)}</div>)}</div></div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <button className="text-sm md:hidden" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
        <Link href="/" className="serif text-xl tracking-wide sm:text-2xl">Perfume Darbar</Link>
        <form className="hidden flex-1 max-w-xs md:block" onSubmit={(e) => { e.preventDefault(); r.push(`/shop?q=${encodeURIComponent(q)}`); }}><input className="field !rounded-full !py-2" placeholder="Search fragrances or notes" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} /></form>
        <div className="flex items-center gap-4 text-sm"><Link href="/account" className="hidden sm:block hover:text-amber">Account</Link><Link href="/wishlist" className="hover:text-amber">♡ {ids.length}</Link><Link href="/cart" className="hover:text-amber">Cart ({count})</Link></div>
      </div>
      <nav className="mx-auto hidden max-w-6xl justify-center gap-8 px-5 pb-3 text-sm md:flex">{nav.map(([l, h]) => <Link key={h} href={h} className="hover:text-amber">{l}</Link>)}</nav>
      {open && <div className="flex flex-col gap-3 border-t border-line px-5 py-4 md:hidden">
        <form onSubmit={(e) => { e.preventDefault(); setOpen(false); r.push(`/shop?q=${encodeURIComponent(q)}`); }}><input className="field" placeholder="Search" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} /></form>
        {[...nav, ["Journal", "/blog"], ["Account", "/account"], ["Track order", "/track-order"]].map(([l, h]) => <Link key={h} href={h} onClick={() => setOpen(false)}>{l}</Link>)}</div>}
    </header>
  );
}
