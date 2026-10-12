import { notFound } from "next/navigation";
import { policies } from "@/lib/content";
export function generateStaticParams() { return Object.keys(policies).map((slug) => ({ slug })); }
export default async function Policy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = policies[slug];
  if (!p) notFound();
  return (<div className="mx-auto max-w-2xl px-5 py-14"><h1 className="text-6xl">{p.title}</h1>{p.sections.map(([h, t]) => <section key={h} className="mt-8 border-t-2 border-ink pt-5"><h2 className="text-3xl">{h}</h2><p className="mt-2 text-lg leading-relaxed">{t}</p></section>)}</div>);
}
