"use client";
import Link from "next/link";
import { useState } from "react";
import { getProduct, money } from "@/lib/products";
const orders = [
  { id: "PD482913", date: "28 Sep 2026", status: "Delivered", items: ["amber-noir"], total: 6799 },
  { id: "PD471204", date: "11 Sep 2026", status: "Shipped", items: ["jaipur-rose", "ocean-salt"], total: 10498 },
  { id: "PD455880", date: "02 Aug 2026", status: "Delivered", items: ["midnight-oud"], total: 7499 },
];
const tabs = ["Orders", "Profile", "Addresses", "Wishlist"];
export default function Account() {
  const [tab, setTab] = useState("Orders");
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-5xl">My account</h1>
      <p className="mt-2 text-ink/60">Welcome back, Aarav. <Link href="/login" className="underline">Sign out</Link></p>
      <div className="mt-8 grid gap-10 md:grid-cols-[200px_1fr]">
        <nav className="flex gap-2 overflow-x-auto md:flex-col">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-full px-5 py-2 text-left text-sm ${tab === t ? "bg-ink text-white" : "bg-white"}`}>{t}</button>)}</nav>
        <div>
          {tab === "Orders" && <ul className="space-y-4">{orders.map((o) => (
            <li key={o.id} className="rounded-2xl bg-white p-6"><div className="flex flex-wrap justify-between gap-2"><div><Link href={`/order/${o.id}`} className="font-semibold underline underline-offset-4">Order {o.id}</Link><p className="text-sm text-ink/60">{o.date}</p></div><span className={`h-fit rounded-full px-3 py-1 text-xs ${o.status === "Shipped" ? "bg-amber/20 text-amber" : "bg-plum/10 text-plum"}`}>{o.status}</span></div>
              <p className="mt-3 text-sm text-ink/70">{o.items.map((s) => getProduct(s)?.name).join(", ")}</p><p className="mt-2 font-semibold">{money(o.total)}</p></li>))}</ul>}
          {tab === "Profile" && <form className="grid max-w-lg gap-4" onSubmit={(e) => e.preventDefault()}><input className="field" defaultValue="Aarav Sharma" aria-label="Name" /><input className="field" defaultValue="aarav@example.com" aria-label="Email" /><input className="field" defaultValue="+91 98765 43210" aria-label="Phone" /><button className="btn w-fit">Save changes</button></form>}
          {tab === "Addresses" && <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-white p-6 text-sm"><p className="font-semibold">Home (default)</p><p className="mt-2 text-ink/70">12 MI Road, C-Scheme<br />Jaipur, Rajasthan 302001</p></div><button className="rounded-2xl border border-dashed border-ink/30 p-6 text-sm">Add new address</button></div>}
          {tab === "Wishlist" && <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{["saffron-silk", "velvet-iris"].map((s) => { const p = getProduct(s)!; return <Link key={s} href={`/product/${s}`} className="rounded-2xl bg-white p-5 text-sm"><p className="serif text-lg">{p.name}</p><p className="text-ink/60">{money(p.price)}</p></Link>; })}</div>}
        </div>
      </div>
    </div>
  );
}
