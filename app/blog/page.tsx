import Link from "next/link";
import { posts } from "@/lib/content";
export const metadata = { title: "Journal | Perfume Darbar" };
export default function Blog() {
  return (<div className="mx-auto max-w-6xl px-5 py-12"><h1 className="text-5xl">Journal</h1><p className="mt-2 text-ink/60">Guides on choosing, wearing and gifting perfume.</p>
    <div className="mt-10 grid gap-8 md:grid-cols-2">{posts.map((p) => <Link key={p.slug} href={`/blog/${p.slug}`} className="group block"><div className="aspect-[16/9] rounded-2xl" style={{ background: p.tint }} /><p className="mt-4 text-xs text-ink/55">{p.date}</p><h2 className="serif mt-1 text-2xl group-hover:text-plum">{p.title}</h2><p className="mt-2 text-ink/70">{p.excerpt}</p></Link>)}</div></div>);
}
