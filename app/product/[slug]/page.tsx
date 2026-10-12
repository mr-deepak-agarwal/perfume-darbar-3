import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductView from "./ProductView";
import { getProduct, products, reviewsFor } from "@/lib/products";
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const p = getProduct((await params).slug); return { title: p ? `${p.name} by ${p.brand} | Perfume Darbar` : "Not found" }; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const others = products.filter((x) => x.slug !== p.slug);
  const related = others.filter((x) => x.brand === p.brand || x.family === p.family).concat(others).filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
  return (<div className="mx-auto max-w-6xl px-5 py-10"><ProductView p={p} reviews={reviewsFor(p)} />
    <section className="mt-24"><h2 className="mb-8 text-3xl">You may also like</h2><div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></section></div>);
}
