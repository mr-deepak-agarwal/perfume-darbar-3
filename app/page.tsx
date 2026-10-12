import Link from "next/link";
import Bottle from "@/components/Bottle";
import BestTabs from "@/components/BestTabs";
import { posts } from "@/lib/content";
import { categories, catBg, catBlurb, occasions, occBlurb, products } from "@/lib/products";
export default function Home() {
  const hero = [products[0], products[12], products[4]];
  const liquid = (c: string) => products.find((p) => p.category === c)!.liquid;
  const occBg = ["#9fe3d0", "#f2d49b", "#ffb3d1", "#a8c4ff", "#ffa28a"];
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:grid-cols-[1.1fr_1fr] md:py-20">
        <div className="rise">
          <h1 className="text-6xl md:text-8xl">Smell like the best part of your day.</h1>
          <p className="mt-6 max-w-md text-lg">Everyday perfumes sorted by scent and occasion. Pick a category, find your bottle, wear it daily.</p>
          <div className="mt-8 flex flex-wrap gap-4"><Link href="/shop" className="btn">Shop all scents</Link><Link href="/quiz" className="btn btn-alt">Find my scent</Link></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {hero.map((p, i) => (<div key={p.slug} className="rise border-2 border-ink" style={{ background: p.bg, animationDelay: `${i * 120}ms`, transform: i === 1 ? "translateY(32px)" : undefined }}><Bottle liquid={p.liquid} className="aspect-[2/3] w-full p-2" /></div>))}
        </div>
      </section>
      <section className="border-y-2 border-ink bg-lemon py-10">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-4xl md:text-5xl">Bestselling categories</h2>
          <div className="noscroll mt-8 flex gap-6 overflow-x-auto pb-2 md:justify-between md:gap-4">
            {categories.map((c) => (
              <Link key={c} href={`/shop?c=${encodeURIComponent(c)}`} className="group w-24 shrink-0 text-center md:w-auto md:flex-1">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-ink transition-transform group-hover:-translate-y-1 md:h-32 md:w-32" style={{ background: catBg[c] }}><Bottle liquid={liquid(c)} className="h-4/5" /></div>
                <p className="display mt-3 text-lg">{c}</p><p className="hidden text-xs md:block">{catBlurb[c]}</p>
              </Link>))}
          </div>
        </div>
      </section>
      <section className="mx-auto mt-16 max-w-7xl px-5"><h2 className="mb-6 text-4xl md:text-5xl">Top sellers by scent</h2><BestTabs /></section>
      <section className="mx-auto mt-20 max-w-7xl px-5">
        <h2 className="text-4xl md:text-5xl">Shop by occasion</h2>
        <div className="noscroll mt-6 flex gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-5 md:overflow-visible">
          {occasions.map((o, i) => (<Link key={o} href={`/shop?o=${encodeURIComponent(o)}`} className="flex min-h-40 w-44 shrink-0 flex-col justify-between border-2 border-ink p-5 shadow-[4px_4px_0_#0b1020] transition-transform hover:-translate-y-1 md:w-auto" style={{ background: occBg[i] }}><h3 className="text-2xl">{o}</h3><p className="text-sm">{occBlurb[o]}</p></Link>))}
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-7xl px-5">
        <div className="grid border-2 border-ink bg-lemon md:grid-cols-2">
          <div className="p-8 md:p-12"><h2 className="text-5xl">Not sure where to start?</h2><p className="mt-4 max-w-md">Answer three questions and we'll match you with a bottle. Or try five scents first with the ₹999 discovery set.</p><Link href="/quiz" className="btn mt-6">Take the 1-minute quiz</Link></div>
          <div className="flex items-center justify-center gap-2 border-t-2 border-ink p-8 md:border-l-2 md:border-t-0">{categories.map((c) => <div key={c} className="h-24 w-12 border-2 border-ink" style={{ background: liquid(c) }} />)}</div>
        </div>
      </section>
      <section className="mx-auto mt-20 grid max-w-7xl gap-5 px-5 md:grid-cols-3">
        {[["Chai Hour is the only perfume my whole office asked about.", "Neha, Pune"], ["Midnight Oud lasts all day on me, and it's under ₹5,000. Wild.", "Karan, Delhi"], ["The quiz picked Paper Moon. It was right.", "Sana, Hyderabad"]].map(([q, a]) => (<figure key={a} className="border-2 border-ink p-6 shadow-[6px_6px_0_#0b1020]"><blockquote className="display text-2xl leading-tight">“{q}”</blockquote><figcaption className="mt-4 text-sm text-ink/60">{a}</figcaption></figure>))}
      </section>
      <section className="mx-auto mt-20 max-w-7xl px-5">
        <div className="mb-6 flex items-end justify-between"><h2 className="text-4xl md:text-5xl">From the journal</h2><Link href="/blog" className="font-semibold underline">All articles</Link></div>
        <div className="grid gap-5 md:grid-cols-3">{posts.slice(0, 3).map((p) => <Link key={p.slug} href={`/blog/${p.slug}`} className="block border-2 border-ink transition-transform hover:-translate-y-1"><div className="aspect-[16/8] border-b-2 border-ink" style={{ background: p.tint }} /><div className="p-5"><p className="text-xs text-ink/60">{p.date}</p><h3 className="mt-1 text-2xl leading-tight">{p.title}</h3></div></Link>)}</div>
      </section>
    </>
  );
}
