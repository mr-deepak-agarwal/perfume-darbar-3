import Link from "next/link";
import { collections, products } from "@/lib/products";
export const metadata = { title: "Collections | Perfume Darbar" };
const tints = ["#f2c6d4", "#f3e2b8", "#d9ead3", "#cfd8f0", "#e2d3ee", "#f7d9c4"];
export default function Collections() {
  return (<div className="mx-auto max-w-6xl px-5 py-12"><h1 className="text-5xl">Collections</h1><div className="mt-10 grid gap-5 md:grid-cols-3">{collections.map((c, i) => (
    <Link key={c.slug} href={`/collections/${c.slug}`} className="group flex min-h-56 flex-col justify-between rounded-2xl p-7" style={{ background: tints[i] }}><h2 className="text-3xl">{c.title}</h2><div><p className="text-sm text-ink/70">{c.desc}</p><p className="mt-3 text-sm font-semibold underline underline-offset-4">{products.filter(c.test).length} products</p></div></Link>))}</div></div>);
}
