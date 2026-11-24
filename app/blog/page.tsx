import Link from "next/link";
import { posts } from "@/lib/content";
import { BlogCover } from "@/components/Art";
import { getCatalog } from "@/lib/catalog";
export const metadata = { title: "Journal | Perfume Darbar" };
export default async function Blog() {
  const { products } = await getCatalog();
  return (<div className="mx-auto max-w-6xl px-5 py-12"><h1 className="text-5xl">Journal</h1><p className="mt-2 text-ink/60">Guides on choosing, wearing and gifting perfume.</p>
    <div className="mt-10 grid gap-8 md:grid-cols-2">{posts.map((p) => <Link key={p.slug} href={`/blog/${p.slug}`} className="group block"><div className="relative aspect-[16/9] overflow-hidden rounded-2xl" style={{ background: p.tint }}><BlogCover slug={p.slug} products={products} bg={p.tint} /></div><p className="mt-4 text-xs text-ink/55">{p.date}</p><h2 className="serif mt-1 text-2xl group-hover:text-plum">{p.title}</h2><p className="mt-2 text-ink/70">{p.excerpt}</p></Link>)}</div></div>);
}
