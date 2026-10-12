import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { collections, products } from "@/lib/products";
export function generateStaticParams() { return collections.map((c) => ({ slug: c.slug })); }
export default async function Collection({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) notFound();
  return (<div><div className="border-b-2 border-ink" style={{ background: c.bg }}><div className="mx-auto max-w-7xl px-5 py-14"><Link href="/collections" className="text-sm font-semibold underline">All collections</Link><h1 className="mt-3 text-6xl md:text-7xl">{c.title}</h1><p className="mt-3 text-lg">{c.desc}</p></div></div>
    <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-x-5 gap-y-12 px-5 lg:grid-cols-4">{products.filter(c.test).map((p) => <ProductCard key={p.slug} p={p} />)}</div></div>);
}
