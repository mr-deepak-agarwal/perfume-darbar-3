import Link from "next/link";
import { getProduct, money } from "@/lib/products";
const known: Record<string, { stage: number; date: string; items: string[] }> = {
  PD482913: { stage: 3, date: "28 Sep 2026", items: ["amber-noir"] }, PD471204: { stage: 2, date: "11 Sep 2026", items: ["jaipur-rose", "ocean-salt"] }, PD455880: { stage: 3, date: "02 Aug 2026", items: ["midnight-oud"] },
};
const stages = ["Order placed", "Packed", "Shipped", "Delivered"];
export default async function Order({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const o = known[id] ?? { stage: 1, date: "Today", items: ["midnight-oud"] };
  const items = o.items.map((s) => getProduct(s)!);
  return (<div className="mx-auto max-w-2xl px-5 py-14"><Link href="/account" className="text-sm underline underline-offset-4">My account</Link><h1 className="mt-4 text-4xl">Order {id}</h1><p className="mt-1 text-ink/60">Placed {o.date}</p>
    <ol className="mt-8 grid grid-cols-4 gap-2">{stages.map((s, i) => <li key={s}><div className={`h-1.5 rounded-full ${i <= o.stage ? "bg-plum" : "bg-line"}`} /><p className={`mt-2 text-xs ${i === o.stage ? "font-semibold" : "text-ink/50"}`}>{s}</p></li>)}</ol>
    <ul className="mt-8 divide-y divide-line rounded-2xl bg-white">{items.map((p) => <li key={p.slug} className="flex justify-between px-5 py-4 text-sm"><Link href={`/product/${p.slug}`}>{p.name} <span className="text-ink/50">· {p.brand}</span></Link><span>{money(p.price)}</span></li>)}</ul></div>);
}
