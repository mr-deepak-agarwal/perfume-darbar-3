import { notFound } from "next/navigation";
import { policies } from "@/lib/content";
export function generateStaticParams() { return Object.keys(policies).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const p = Object.hasOwn(policies, slug) ? policies[slug] : undefined;
  return p ? { title: `${p.title} | Perfume Darbar`, alternates: { canonical: `/help/${slug}` } } : { title: "Not found | Perfume Darbar", robots: { index: false } };
}
export default async function Policy({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const p = Object.hasOwn(policies, slug) ? policies[slug] : undefined;
  if (!p) notFound();
  return (<div className="mx-auto max-w-2xl px-5 py-14"><h1 className="text-5xl">{p.title}</h1>{p.sections.map(([h, t]) => <section key={h} className="mt-8"><h2 className="text-2xl">{h}</h2><p className="mt-2 leading-relaxed text-ink/75">{t}</p></section>)}</div>);
}
