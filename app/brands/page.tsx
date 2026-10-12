import Link from "next/link";
import { brands, products } from "@/lib/products";
export const metadata = { title: "Brands | Perfume Darbar" };
const story: Record<string, string> = { "Nawab Oud": "Deep agarwood perfumes inspired by royal courts.", "Rani Parfums": "Romantic florals and powders for every day.", "Kesar & Co": "Hand-distilled attars from Kannauj.", "Zafran House": "Saffron, amber and spice in modern blends.", "Darbar Atelier": "Our own line of fresh, easy everyday scents.", Mehfil: "Sociable scents made for gatherings." };
export default function Brands() {
  return (<div className="mx-auto max-w-6xl px-5 py-12"><h1 className="text-5xl">Our brands</h1><div className="mt-10 grid gap-5 md:grid-cols-3">{brands.map((b) => (
    <Link key={b} href={`/shop?b=${encodeURIComponent(b)}`} className="rounded-2xl bg-white p-8 hover:shadow-lg"><h2 className="text-3xl">{b}</h2><p className="mt-3 text-sm text-ink/70">{story[b]}</p><p className="mt-6 text-sm font-semibold underline underline-offset-4">{products.filter((p) => p.brand === b).length} fragrances</p></Link>))}</div></div>);
}
