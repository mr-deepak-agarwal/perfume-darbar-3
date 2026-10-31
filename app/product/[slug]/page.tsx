import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductView from "./ProductView";
import { reviewsFor } from "@/lib/products";
import { getCatalog, getProductBySlug } from "@/lib/catalog";
export async function generateStaticParams() { return (await getCatalog()).products.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Not found | Perfume Darbar", robots: { index: false } };
  const title = `${p.name} | Pure oil and perfume | Perfume Darbar`;
  const img = p.image ?? `/products/${slug}.jpg`;
  return { title, description: p.desc, alternates: { canonical: `/product/${slug}` }, openGraph: { title, description: p.desc, images: [img] } };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getProductBySlug((await params).slug);
  if (!p) notFound();
  const { products } = await getCatalog();
  const others = products.filter((x) => x.slug !== p.slug);
  const related = others.filter((x) => x.scent === p.scent || x.family === p.family).concat(others).filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
  return (<div className="mx-auto max-w-6xl px-5 py-10"><ProductView p={p} reviews={reviewsFor(p)} />
    <section className="mt-24"><h2 className="mb-8 text-3xl">Fragrances you might love</h2><div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></section></div>);
}
