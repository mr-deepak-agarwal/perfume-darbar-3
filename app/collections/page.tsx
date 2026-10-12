import Link from "next/link";
import { collections, products } from "@/lib/products";
export const metadata = { title: "Collections | Perfume Darbar" };
export default function Collections() {
  return (<div className="mx-auto max-w-7xl px-5 py-12"><h1 className="text-6xl md:text-7xl">Collections</h1><div className="mt-10 grid gap-5 md:grid-cols-3">{collections.map((c) => (
    <Link key={c.slug} href={`/collections/${c.slug}`} className="flex min-h-56 flex-col justify-between border-2 border-ink p-7 shadow-[6px_6px_0_#0b1020] transition-transform hover:-translate-y-1" style={{ background: c.bg }}><h2 className="text-4xl">{c.title}</h2><div><p className="text-sm">{c.desc}</p><p className="mt-3 font-bold underline">{products.filter(c.test).length} perfumes</p></div></Link>))}</div></div>);
}
