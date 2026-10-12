import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductView from "./ProductView";
import { getProduct, products } from "@/lib/products";
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const p = getProduct((await params).slug); return { title: p ? `${p.name} | Perfume Darbar` : "Not found" }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const more = products.filter((x) => x.slug !== p.slug && x.category === p.category).concat(products.filter((x) => x.slug !== p.slug && x.category !== p.category)).slice(0, 4);
  return (
    <>
      <ProductView p={p} />
      <section className="mx-auto mt-20 max-w-7xl px-5"><h2 className="mb-8 text-5xl">Wear it with</h2><div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">{more.map((r) => <ProductCard key={r.slug} p={r} />)}</div></section>
    </>
  );
}
