import Link from "next/link";
import { money, variantOf, variantLabel } from "@/lib/products";
import { getCatalog } from "@/lib/catalog";
import { findProduct } from "@/lib/products";
const known: Record<string, { stage: number; date: string; items: { slug: string; v: string }[] }> = {
  PD482913: { stage: 3, date: "28 Sep 2026", items: [{ slug: "smoked-pineapple", v: "p50" }] },
  PD471204: { stage: 2, date: "11 Sep 2026", items: [{ slug: "persian-rose", v: "p30" }, { slug: "deep-sea", v: "p50" }] },
  PD455880: { stage: 3, date: "02 Aug 2026", items: [{ slug: "imperial-oud", v: "o12" }] },
};
const stages = ["Order placed", "Packed", "Shipped", "Delivered"];
export default async function Order({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const o = Object.hasOwn(known, id) ? known[id] : { stage: 1, date: "Today", items: [{ slug: "smoked-pineapple", v: "p50" }] };
  const catalog = await getCatalog();
  const items = o.items.flatMap((i) => { const p = findProduct(catalog, i.slug); return p ? [{ p, v: variantOf(p, i.v) }] : []; });
  return (<div className="mx-auto max-w-2xl px-5 py-14"><Link href="/account" className="text-sm underline underline-offset-4">My account</Link><h1 className="mt-4 text-4xl">Order {id}</h1><p className="mt-1 text-ink/60">Placed {o.date}</p>
    <ol className="mt-8 grid grid-cols-4 gap-2">{stages.map((s, i) => <li key={s}><div className={`h-1.5 rounded-full ${i <= o.stage ? "bg-plum" : "bg-line"}`} /><p className={`mt-2 text-xs ${i === o.stage ? "font-semibold" : "text-ink/50"}`}>{s}</p></li>)}</ol>
    <ul className="mt-8 divide-y divide-line rounded-2xl bg-white">{items.map(({ p, v }) => <li key={p.slug + v.id} className="flex justify-between px-5 py-4 text-sm"><Link href={`/product/${p.slug}`}>{p.name} <span className="text-ink/50">· {variantLabel(v)}</span></Link><span>{money(v.price)}</span></li>)}</ul></div>);
}
