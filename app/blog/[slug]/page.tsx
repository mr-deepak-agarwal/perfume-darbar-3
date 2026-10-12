import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/lib/content";
export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  return (<article className="mx-auto max-w-2xl px-5 py-14"><Link href="/blog" className="text-sm font-semibold underline">All articles</Link><p className="mt-6 text-sm text-ink/60">{p.date}</p><h1 className="mt-2 text-5xl leading-tight md:text-6xl">{p.title}</h1><div className="my-8 aspect-[16/8] border-2 border-ink" style={{ background: p.tint }} />
    {p.body.map((t, i) => <p key={i} className="mb-5 text-lg leading-relaxed">{t}</p>)}<Link href="/shop" className="btn mt-4">Shop all scents</Link></article>);
}
