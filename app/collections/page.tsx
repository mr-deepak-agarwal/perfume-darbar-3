import Link from "next/link";
import Photo from "@/components/Photo";
import { collections } from "@/lib/products";
import { getCatalog } from "@/lib/catalog";
export const metadata = { title: "Collections | Perfume Darbar" };
const tints = ["#f2c6d4", "#f3e2b8", "#d9ead3", "#cfd8f0", "#e2d3ee", "#f7d9c4"];
export default async function Collections() {
  const { products } = await getCatalog();
  return (<div className="mx-auto max-w-6xl px-5 py-12"><h1 className="text-5xl">Collections</h1><div className="mt-10 grid gap-5 md:grid-cols-3">{collections.map((c, i) => (
    <Link key={c.slug} href={`/collections/${c.slug}`} className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl p-7" style={{ background: tints[i % tints.length] }}>
      <Photo src={`/collections/${c.slug}.jpg`} alt={c.title} className="transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
      <h2 className="relative max-w-[55%] text-3xl text-white">{c.title}</h2>
      <div className="relative max-w-[55%] text-white"><p className="text-sm text-white/80">{c.desc}</p><p className="mt-3 text-sm font-semibold underline underline-offset-4">{products.filter(c.test).length} products</p></div>
    </Link>))}</div></div>);
}
