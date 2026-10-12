"use client";
import Link from "next/link";
import { useState } from "react";
import { getProduct, money } from "@/lib/products";
const stages = ["Placed", "Packed", "Shipped", "Delivered"];
const orders = [
  { id: "PD482913", date: "28 Sep 2026", stage: 3, items: ["chai-hour", "rooftop-rain"], total: 6798 },
  { id: "PD471204", date: "01 Oct 2026", stage: 2, items: ["velvet-dusk"], total: 4499 },
];
export default function Account() {
  const [tab, setTab] = useState("Orders");
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="border-2 border-ink bg-lemon p-8 shadow-[6px_6px_0_#0b1020]"><h1 className="text-5xl">Hi, Aarav.</h1><p className="mt-2">2 orders · 340 Perfume Darbar points (worth ₹340)</p><Link href="/login" className="mt-3 inline-block text-sm font-semibold underline">Sign out</Link></div>
      <div className="mt-8 flex flex-wrap gap-2">{["Orders", "Details", "Addresses", "Saved"].map((t) => <button key={t} className="chip" data-on={tab === t} onClick={() => setTab(t)}>{t}</button>)}</div>
      <div className="mt-8">
        {tab === "Orders" && <ul className="space-y-5">{orders.map((o) => (<li key={o.id} className="border-2 border-ink p-6"><div className="flex flex-wrap justify-between gap-2"><p className="display text-2xl">{o.id}</p><p className="text-sm">{o.date} · {money(o.total)}</p></div><p className="mt-1 text-sm text-ink/70">{o.items.map((s) => getProduct(s)?.name).join(", ")}</p>
          <ol className="mt-5 grid grid-cols-4 gap-2">{stages.map((s, i) => <li key={s}><div className={`h-2 border-2 border-ink ${i <= o.stage ? "bg-blue" : "bg-white"}`} /><p className={`mt-1 text-xs ${i === o.stage ? "font-bold" : "text-ink/50"}`}>{s}</p></li>)}</ol></li>))}</ul>}
        {tab === "Details" && <form className="grid max-w-md gap-4" onSubmit={(e) => e.preventDefault()}><input className="field" defaultValue="Aarav Sharma" aria-label="Name" /><input className="field" defaultValue="aarav@example.com" aria-label="Email" /><input className="field" defaultValue="+91 98765 43210" aria-label="Phone" /><button className="btn w-fit">Save changes</button></form>}
        {tab === "Addresses" && <div className="grid gap-4 sm:grid-cols-2"><div className="border-2 border-ink p-6 text-sm"><p className="font-bold">Home</p><p className="mt-2">12 MI Road, C-Scheme<br />Jaipur, Rajasthan 302001</p></div><button className="border-2 border-dashed border-ink p-6 text-sm font-semibold">Add new address</button></div>}
        {tab === "Saved" && <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{["paper-moon", "smoke-ghat"].map((s) => { const p = getProduct(s)!; return <Link key={s} href={`/product/${s}`} className="border-2 border-ink p-5" style={{ background: p.bg }}><p className="display text-xl">{p.name}</p><p className="text-sm">{money(p.price)}</p></Link>; })}</div>}
      </div>
    </div>
  );
}
