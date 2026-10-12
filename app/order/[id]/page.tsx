import Link from "next/link";
import { getProduct, money } from "@/lib/products";
const known: Record<string, { stage: number; date: string; items: string[] }> = { PD482913: { stage: 3, date: "28 Sep 2026", items: ["chai-hour", "rooftop-rain"] }, PD471204: { stage: 2, date: "01 Oct 2026", items: ["velvet-dusk"] } };
const stages = ["Placed", "Packed", "Shipped", "Delivered"];
export default async function Order({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = known[id] ?? { stage: 1, date: "Today", items: ["midnight-oud"] };
  const items = o.items.map((s) => getProduct(s)!);
  return (<div className="mx-auto max-w-2xl px-5 py-14"><Link href="/account" className="text-sm font-semibold underline">My account</Link><h1 className="mt-4 text-5xl">Order {id}</h1><p className="mt-1 text-ink/60">Placed {o.date}</p>
    <ol className="mt-8 grid grid-cols-4 gap-2">{stages.map((s, i) => <li key={s}><div className={`h-2 border-2 border-ink ${i <= o.stage ? "bg-blue" : "bg-white"}`} /><p className={`mt-1 text-xs ${i === o.stage ? "font-bold" : "text-ink/50"}`}>{s}</p></li>)}</ol>
    <ul className="mt-8 border-2 border-ink">{items.map((p) => <li key={p.slug} className="flex justify-between border-b-2 border-ink px-5 py-4 last:border-b-0"><Link href={`/product/${p.slug}`} className="font-semibold underline">{p.name}</Link><span>{money(p.price)}</span></li>)}</ul></div>);
}
