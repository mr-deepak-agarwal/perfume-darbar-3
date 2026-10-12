import Link from "next/link";
import { posts } from "@/lib/content";
export const metadata = { title: "Journal | Perfume Darbar" };
export default function Blog() {
  return (<div className="mx-auto max-w-7xl px-5 py-12"><h1 className="text-6xl md:text-7xl">Journal</h1><p className="mt-3 text-lg">Guides on choosing, wearing and gifting perfume.</p>
    <div className="mt-10 grid gap-6 md:grid-cols-2">{posts.map((p) => <Link key={p.slug} href={`/blog/${p.slug}`} className="group block border-2 border-ink shadow-[6px_6px_0_#0b1020] transition-transform hover:-translate-y-1"><div className="aspect-[16/8] border-b-2 border-ink" style={{ background: p.tint }} /><div className="p-6"><p className="text-xs text-ink/60">{p.date}</p><h2 className="mt-1 text-3xl leading-tight">{p.title}</h2><p className="mt-2 text-ink/70">{p.excerpt}</p></div></Link>)}</div></div>);
}
