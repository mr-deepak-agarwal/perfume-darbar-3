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
    <header className="sticky top-0 z-40 bg-deep text-mist">
      <div className="overflow-hidden bg-gold py-1.5 text-[13px] font-medium text-ink" aria-label="Current offers"><div className="ticker">{[0, 1].map((k) => <div key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">{[...OFFERS, ...OFFERS].map((o, i) => <span key={i} className="flex items-center"><span>{o}</span><span className="mx-6 opacity-60" aria-hidden>◆</span></span>)}</div>)}</div></div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <button className="text-sm md:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? "Close" : "Menu"}</button>
        <Link href="/" className="flex items-center gap-3" aria-label="Perfume Darbar home">
          <svg viewBox="0 0 24 30" className="hidden h-7 w-6 text-gold sm:block" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="M2 29V12C2 5.5 6.5 1.5 12 1.5S22 5.5 22 12v17z" /><path d="M6.5 29V12.5c0-3.6 2.4-6 5.5-6s5.5 2.4 5.5 6V29" opacity=".6" /></svg>
          <span className="serif text-2xl leading-none sm:text-[1.7rem]">Perfume Darbar</span>
        </Link>
        <form className="hidden max-w-xs flex-1 md:block" onSubmit={(e) => { e.preventDefault(); r.push(`/shop?q=${encodeURIComponent(q)}`); }}><input className="field !border-white/20 !bg-white/10 !py-2 !text-mist placeholder:text-mist/60" placeholder="Search fragrances or notes" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} /></form>
        <div className="flex items-center gap-5 text-sm"><Link href="/account" className="hidden hover:text-gold sm:block">Account</Link><Link href="/wishlist" className="hover:text-gold" aria-label={`Wishlist, ${ids.length} saved`}>♡ {ids.length}</Link><Link href="/cart" className="rounded-sm border border-gold/70 px-3 py-1.5 text-gold hover:bg-gold hover:text-ink">Cart ({count})</Link></div>
      </div>
      <nav className="mx-auto hidden max-w-6xl justify-center gap-9 px-5 pb-3.5 text-sm md:flex">{nav.map(([l, h]) => <Link key={h} href={h} className="border-b border-transparent pb-0.5 hover:border-gold hover:text-gold">{l}</Link>)}</nav>
      <div className="rule-gold" />
      {open && <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 md:hidden">
        <form onSubmit={(e) => { e.preventDefault(); setOpen(false); r.push(`/shop?q=${encodeURIComponent(q)}`); }}><input className="field" placeholder="Search" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} /></form>
        {[...nav, ["Journal", "/blog"], ["Account", "/account"], ["Track order", "/track-order"]].map(([l, h]) => <Link key={h} href={h} onClick={() => setOpen(false)}>{l}</Link>)}</div>}
    </header>
  );
}
