import Link from "next/link";
import Bottle from "@/components/Bottle";
import Photo from "@/components/Photo";
import ProductCard from "@/components/ProductCard";
import BestTabs from "@/components/BestTabs";
import TrustStrip from "@/components/TrustStrip";
import Carousel from "@/components/Carousel";
import ScentIcon from "@/components/ScentIcon";
import { collections, scents, scentBlurb, occasions, occBlurb, money } from "@/lib/products";
import { getCatalog } from "@/lib/catalog";
import { posts } from "@/lib/content";
const tiles = [["Women", "/shop?g=Women", "women", "#f2c6d4"], ["Men", "/shop?g=Men", "men", "#cfd8f0"], ["Unisex", "/shop?g=Unisex", "unisex", "#d9ead3"], ["Oud", "/collections/oud", "oud-tile", "#e2d3ee"], ["Musk", "/collections/musk", "musk-tile", "#f3e2b8"]];
const occBg = ["#d9ead3", "#cfd8f0", "#f2c6d4", "#f3e2b8", "#e2d3ee"];
const Head = ({ t, href }: { t: string; href?: string }) => <div className="mb-8 flex items-end justify-between"><h2 className="text-4xl">{t}</h2>{href && <Link href={href} className="text-sm underline underline-offset-4">View all</Link>}</div>;
export default async function Home() {
  const { products } = await getCatalog();
  const oilFrom = Math.min(...products.flatMap((p) => p.variants.filter((v) => v.kind === "Pure oil").map((v) => v.price)));
  const col = (s: string) => products.filter(collections.find((c) => c.slug === s)!.test);
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-2 md:py-20">
        <div><h1 className="text-5xl leading-[1.05] md:text-7xl">Find the scent that walks in before you do.</h1>
          <p className="mt-6 max-w-md text-lg text-ink/70">{products.length} fragrances as pure oils and perfumes, blended in Ponda, Goa. Shop by scent or by occasion.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/shop" className="btn">Shop all perfumes</Link><Link href="/quiz" className="btn btn-ghost">Find my scent</Link></div>
          <dl className="mt-10 flex gap-8 text-sm"><div><dt className="text-ink/60">Fragrances</dt><dd className="serif text-3xl">{products.length}</dd></div><div><dt className="text-ink/60">Sizes</dt><dd className="serif text-3xl">5</dd></div><div><dt className="text-ink/60">Reviews</dt><dd className="serif text-3xl">4.7★</dd></div></dl></div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl" style={{ background: "linear-gradient(160deg,#4a215833,#c27c1a44)" }}>
          <Photo src="/hero.jpg" alt="Perfume Darbar collection" fallback={<Bottle c1="#5b3a8a" c2="#1a0b2a" id="hero" className="absolute inset-0 m-auto h-4/5" />} /></div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-6"><TrustStrip /></section>
      <section className="mx-auto mt-14 max-w-6xl px-5"><Head t="Popular fragrances" href="/shop" /><Carousel>{[...products].sort((a, b) => b.sold - a.sold).slice(0, 10).map((p) => <div key={p.slug} className="w-60 shrink-0 snap-start md:w-64"><ProductCard p={p} showAdd /></div>)}</Carousel>
        <div className="mt-4 text-center"><Link href="/shop" className="btn">Shop all fragrances</Link></div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="Why Perfume Darbar" />
        <div className="grid gap-5 md:grid-cols-3">
          <Link href="/shop" className="rounded-3xl bg-ink p-8 text-white"><span className="rounded-full bg-amber px-3 py-1 text-xs font-semibold">Pure oils</span><h3 className="serif mt-4 text-4xl">From {money(oilFrom)}</h3><p className="mt-2 text-white/70">Alcohol-free 6 ml and 12 ml oils that stay close to the skin all day.</p><span className="mt-6 inline-block text-sm underline underline-offset-4">Shop fragrances</span></Link>
          <Link href="/shop" className="rounded-3xl bg-emerald-50 p-8"><span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">Five sizes</span><h3 className="serif mt-4 text-4xl">6 ml to 100 ml</h3><p className="mt-2 text-ink/70">Try a small oil first, then pick up the 30, 50 or 100 ml perfume.</p><span className="mt-6 inline-block text-sm underline underline-offset-4">Choose your size</span></Link>
          <Link href="/cart" className="rounded-3xl bg-plum p-8 text-white"><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink">Pay online</span><h3 className="serif mt-4 text-4xl">Save ₹50</h3><p className="mt-2 text-white/70">On every order paid by UPI or card. Cash on delivery also available.</p><span className="mt-6 inline-block text-sm underline underline-offset-4">Go to cart</span></Link>
        </div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><div className="grid overflow-hidden rounded-3xl bg-white md:grid-cols-2"><div className="p-10 md:p-14"><h2 className="text-4xl md:text-5xl">Start with a pure oil</h2><p className="mt-3 max-w-md text-ink/70">Every fragrance comes as a 6 ml or 12 ml pure oil from {money(oilFrom)}, so you can find your signature scent before choosing a bigger bottle.</p>
        <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">{["Alcohol-free oil", "Pocket friendly", "10+ hours", "Travel ready"].map((t) => <li key={t} className="flex items-center gap-2"><span className="text-plum">✓</span>{t}</li>)}</ul><Link href="/shop" className="btn mt-7">Explore pure oils</Link></div>
        <div className="relative flex min-h-64 items-center justify-center gap-2" style={{ background: "linear-gradient(135deg,#d8cbf2,#f6c9d9)" }}><Photo src="/categories/samples.jpg" alt="Pure oil bottles" fallback={<>{products.slice(0, 3).map((p, i) => <Bottle key={p.slug} c1={p.c1} c2={p.c2} id={`sm-${i}`} className={`h-32 ${i === 1 ? "-translate-y-4" : ""}`} />)}</>} /></div></div></section>
      <section className="mx-auto max-w-6xl px-5"><div className="rounded-3xl bg-white p-8 md:p-10">
        <h2 className="text-4xl">Bestselling categories</h2>
        <div className="mt-8 flex gap-6 overflow-x-auto pb-2 md:justify-between md:gap-4">{scents.map((s) => (
          <Link key={s} href={`/shop?s=${encodeURIComponent(s)}`} className="group w-24 shrink-0 text-center md:w-auto md:flex-1"><div className="transition-transform group-hover:-translate-y-1"><ScentIcon s={s} /></div><p className="serif mt-3 text-lg">{s}</p><p className="hidden text-xs text-ink/60 md:block">{scentBlurb[s]}</p></Link>))}</div></div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="Top sellers by scent" /><BestTabs /></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="Shop by occasion" />
        <div className="flex gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-5 md:overflow-visible">{occasions.map((o, i) => <Link key={o} href={`/shop?o=${encodeURIComponent(o)}`} className="flex min-h-40 w-44 shrink-0 flex-col justify-between rounded-2xl p-5 transition-transform hover:-translate-y-1 md:w-auto" style={{ background: occBg[i] }}><h3 className="text-2xl">{o}</h3><p className="text-sm text-ink/70">{occBlurb[o]}</p></Link>)}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="Shop by who it's for" /><div className="grid grid-cols-2 gap-4 md:grid-cols-5">{tiles.map(([n, h, img, bg]) => (
        <Link key={n} href={h} className="group relative aspect-[3/4] overflow-hidden rounded-2xl" style={{ background: bg }}><Photo src={`/categories/${img}.jpg`} alt={n} /><span className="absolute bottom-3 left-3 rounded-full bg-white px-4 py-2 text-sm font-semibold group-hover:bg-ink group-hover:text-white">{n}</span></Link>))}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="Best value" href="/collections/best-value" /><div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">{col("best-value").slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}</div></section>
            <section className="mx-auto mt-20 max-w-6xl px-5"><div className="grid overflow-hidden rounded-3xl bg-ink text-white md:grid-cols-2"><div className="p-10 md:p-14"><h2 className="text-4xl md:text-5xl">The Oud collection</h2><p className="mt-4 max-w-sm text-white/70">Deep, resinous and made for the evening. Perfumes and oils built around deep agarwood notes.</p><Link href="/collections/oud" className="btn mt-7 bg-amber hover:bg-amber/80">Explore oud</Link></div><div className="relative min-h-64" style={{ background: "linear-gradient(135deg,#5b3a8a,#1a0b2a)" }}><Photo src="/categories/oud.jpg" alt="Oud collection" fallback={<Bottle c1="#5b3a8a" c2="#c27c1a" id="oud" className="absolute inset-0 m-auto h-3/4" />} /></div></div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="Premium blends" href="/collections/premium" /><div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">{col("premium").slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><div className="grid gap-6 rounded-3xl bg-plum p-10 text-white md:grid-cols-[1fr_auto] md:items-center md:p-14"><div><h2 className="text-4xl md:text-5xl">Not sure where to start?</h2><p className="mt-3 max-w-md text-white/75">Answer three questions and we'll match you with a scent family and a bottle.</p></div><Link href="/quiz" className="btn bg-white !text-ink hover:bg-amber hover:!text-white">Take the 1-minute quiz</Link></div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><h2 className="mb-8 text-4xl">What customers say</h2><div className="grid gap-5 md:grid-cols-3">{[["Smoked Pineapple gets a compliment every single time. Easily 9 hours on my skin.", "Rohan, Panaji"], ["Persian Rose is the first rose perfume that doesn't smell like soap.", "Ishita, Margao"], ["I tried the 6 ml oil first and went back for the 50 ml the same week.", "Meera, Ponda"]].map(([q, a]) => <figure key={a} className="rounded-2xl bg-white p-7"><blockquote className="serif text-lg leading-snug">“{q}”</blockquote><figcaption className="mt-4 text-sm text-ink/60"><span className="text-emerald-700">✓ Verified buyer</span> · {a}</figcaption></figure>)}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="From the journal" href="/blog" /><div className="grid gap-5 md:grid-cols-3">{posts.slice(0, 3).map((p) => <Link key={p.slug} href={`/blog/${p.slug}`} className="group block"><div className="relative aspect-[16/10] overflow-hidden rounded-2xl" style={{ background: p.tint }}><Photo src={`/blog/${p.slug}.jpg`} alt={p.title} /></div><p className="mt-3 text-xs text-ink/55">{p.date}</p><h3 className="serif mt-1 text-xl group-hover:text-plum">{p.title}</h3></Link>)}</div></section>
    </>
  );
}
