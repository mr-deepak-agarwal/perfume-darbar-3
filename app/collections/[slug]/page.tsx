import { notFound } from "next/navigation";
import Art from "@/components/Art";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { collections } from "@/lib/products";
import { getCatalog } from "@/lib/catalog";
export function generateStaticParams() { return collections.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  return c ? { title: `${c.title} | Perfume Darbar`, description: c.desc, alternates: { canonical: `/collections/${c.slug}` } } : { title: "Not found | Perfume Darbar", robots: { index: false } };
}
export default async function Collection({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) notFound();
  const list = (await getCatalog()).products.filter(c.test);
  return (<div className="mx-auto max-w-6xl px-5 py-12"><p className="text-sm text-ink/60"><Link href="/collections">Collections</Link> /</p><div className="relative mt-3 overflow-hidden rounded-3xl bg-ink p-8 text-white md:p-12"><Art ratio="wide" align="right" list={list.slice().sort((a, b) => b.sold - a.sold).slice(0, 3).map((p, k): [typeof p, "o12" | "p50" | "p100"] => [p, k === 0 ? "p100" : k === 1 ? "p50" : "o12"])} bg={["#2a1a14", "#120a07"]} floor="#0a0504" label={c.title} /><div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" /><div className="relative max-w-md md:min-h-32"><h1 className="text-5xl">{c.title}</h1><p className="mt-2 text-white/80">{c.desc}</p></div></div>
    <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div></div>);
}
