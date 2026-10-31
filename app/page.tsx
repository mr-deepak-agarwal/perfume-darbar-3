import Link from "next/link";
import Bottle from "@/components/Bottle";
import Photo from "@/components/Photo";
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Carousel";
import { collections, scents, scentBlurb, scentBg, occasions, occBlurb, money, VARIANT_META } from "@/lib/products";
import { getCatalog } from "@/lib/catalog";
import { posts } from "@/lib/content";

const who: [string, string, string][] = [["Women", "/shop?g=Women", "women"], ["Men", "/shop?g=Men", "men"], ["Unisex", "/shop?g=Unisex", "unisex"], ["Oud", "/collections/oud", "oud-tile"], ["Musk", "/collections/musk", "musk-tile"]];
const Head = ({ t, href, light }: { t: string; href?: string; light?: boolean }) => (
  <div className="mb-9 flex items-end justify-between gap-6 border-b border-gold/60 pb-4">
    <h2 className="text-4xl md:text-5xl">{t}</h2>
    {href && <Link href={href} className={`shrink-0 pb-1 text-sm underline underline-offset-4 ${light ? "hover:text-gold" : "hover:text-amber"}`}>View all</Link>}
  </div>
);
const wrap = "mx-auto max-w-6xl px-5";

export default async function Home() {
  const { products } = await getCatalog();
  const col = (s: string) => products.filter(collections.find((c) => c.slug === s)!.test);
  const from = (id: string) => Math.min(...products.map((p) => p.variants.find((v) => v.id === id)!.price));
  const oilFrom = from("o6");
  return (
    <>
      {/* hero */}
      <section className="bg-plum text-mist">
        <div className={`${wrap} grid items-center gap-12 py-14 md:grid-cols-[1.15fr_.85fr] md:py-20`}>
          <div className="hero-in">
            <h1 className="text-5xl leading-[1.04] md:text-7xl">Pure oils and perfumes from Ponda, Goa</h1>
            <p className="mt-7 max-w-md text-lg text-mist/80">{products.length} fragrances in five sizes. Start with a 6 ml oil from {money(oilFrom)}, then move up to a 30, 50 or 100 ml perfume.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/shop" className="btn btn-gold">Shop all fragrances</Link><Link href="/quiz" className="btn btn-ghost-light">Find my scent</Link></div>
          </div>
          <div className="arch-frame mx-auto w-full max-w-sm md:max-w-none">
            <div className="arch relative aspect-[4/5] overflow-hidden bg-deep"><Photo src="/hero.jpg" alt="Perfume Darbar bottles" fallback={<Bottle c1="#0e3b33" c2="#082822" id="hero" className="absolute inset-0 m-auto h-4/5" />} /></div>
          </div>
        </div>
        <div className="rule-gold" />
      </section>

      {/* sizes */}
      <section className={`${wrap} mt-16`}>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-[14rem_1fr] md:items-center">
          <div><h2 className="text-3xl md:text-4xl">Pick your size</h2><p className="mt-2 text-sm text-ink/70">Every fragrance comes as a pure oil and as a perfume.</p></div>
          <div className="grid grid-cols-2 border-y border-gold/60 md:grid-cols-5">
            {VARIANT_META.map((v, i) => (
              <Link key={v.id} href="/shop" className={`group px-5 py-5 transition-colors hover:bg-plum hover:text-mist ${i ? "md:border-l md:border-gold/60" : ""}`}>
                <p className="serif text-3xl">{v.size}</p><p className="text-sm text-ink/65 group-hover:text-mist/75">{v.kind}</p><p className="mt-2 text-sm font-semibold">from {money(from(v.id))}</p>
              </Link>))}
          </div>
        </div>
      </section>

      {/* popular */}
      <section className={`${wrap} mt-20`}><Head t="Popular fragrances" href="/shop" />
        <Carousel>{[...products].sort((a, b) => b.sold - a.sold).slice(0, 10).map((p) => <div key={p.slug} className="w-60 shrink-0 snap-start md:w-64"><ProductCard p={p} showAdd /></div>)}</Carousel></section>

      {/* scent families */}
      <section className={`${wrap} mt-20`}><Head t="Shop by scent family" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-5">{scents.map((s) => (
          <Link key={s} href={`/shop?s=${encodeURIComponent(s)}`} className="group block">
            <div className="arch-frame transition-colors group-hover:border-amber"><div className="arch relative aspect-[3/4] overflow-hidden" style={{ background: scentBg[s] }}><Photo src={`/categories/${s.toLowerCase().replace(/ /g, "-")}.jpg`} alt={s} className="transition-transform duration-500 group-hover:scale-105" /></div></div>
            <h3 className="serif mt-4 text-2xl">{s}</h3><p className="text-sm text-ink/65">{scentBlurb[s]}</p>
          </Link>))}</div></section>

      {/* pure oil band */}
      <section className="mt-24 bg-plum text-mist">
        <div className={`${wrap} grid items-center gap-10 py-14 md:grid-cols-2 md:py-20`}>
          <div><h2 className="text-4xl md:text-6xl">Start with a pure oil</h2>
            <p className="mt-5 max-w-md text-mist/80">Alcohol-free 6 ml and 12 ml oils, from {money(oilFrom)}. They sit close to the skin and last 10 hours or more, so you can find your signature scent before you buy a larger bottle.</p>
            <ul className="mt-7 grid max-w-sm grid-cols-2 gap-x-6 gap-y-2 text-sm">{["Alcohol-free", "Fits a pocket", "10+ hours", "Easy to travel with"].map((t) => <li key={t} className="flex gap-2"><span className="text-gold" aria-hidden>◆</span>{t}</li>)}</ul>
            <Link href="/shop" className="btn btn-gold mt-9">Shop pure oils</Link></div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-md border border-gold/60 bg-deep"><Photo src="/categories/samples.jpg" alt="Pure oil bottles" /></div>
        </div>
      </section>

      {/* best value */}
      <section className={`${wrap} mt-20`}><Head t="Best value" href="/collections/best-value" /><div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">{col("best-value").slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}</div></section>

      {/* who it's for */}
      <section className={`${wrap} mt-24`}><Head t="Shop by who it's for" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-5">{who.map(([n, h, img]) => (
          <Link key={n} href={h} className="group block"><div className="arch-frame transition-colors group-hover:border-amber"><div className="arch relative aspect-[3/4] overflow-hidden bg-deep"><Photo src={`/categories/${img}.jpg`} alt={n} className="transition-transform duration-500 group-hover:scale-105" /></div></div><h3 className="serif mt-4 text-center text-2xl">{n}</h3></Link>))}</div></section>

      {/* oud band */}
      <section className="mt-24 bg-ink text-mist">
        <div className={`${wrap} grid items-center gap-10 py-14 md:grid-cols-2 md:py-20`}>
          <div className="relative aspect-[3/2] overflow-hidden rounded-md border border-gold/60 bg-deep md:order-1"><Photo src="/collections/oud.jpg" alt="Oud collection" /></div>
          <div><h2 className="text-4xl md:text-6xl">The oud collection</h2><p className="mt-5 max-w-md text-mist/80">Deep, resinous agarwood for the evening. {col("oud").length} perfumes and oils built around oud, from Imperial Oud to Rosewood Oud.</p><Link href="/collections/oud" className="btn btn-gold mt-9">Explore oud</Link></div>
        </div>
      </section>

      {/* premium */}
      <section className={`${wrap} mt-20`}><Head t="Premium blends" href="/collections/premium" /><div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">{col("premium").slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}</div></section>

      {/* occasions */}
      <section className={`${wrap} mt-24`}><Head t="Shop by occasion" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">{occasions.map((o) => <Link key={o} href={`/shop?o=${encodeURIComponent(o)}`} className="group border-t-2 border-gold pt-4"><h3 className="serif text-3xl group-hover:text-amber">{o}</h3><p className="mt-1 text-sm text-ink/65">{occBlurb[o]}</p></Link>)}</div></section>

      {/* quiz */}
      <section className="mt-24 bg-gold text-ink">
        <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-14`}>
          <div><h2 className="text-4xl md:text-5xl">Not sure where to start?</h2><p className="mt-3 max-w-md">Answer three questions and we'll suggest a scent family and a size.</p></div>
          <Link href="/quiz" className="btn shrink-0">Take the 1-minute quiz</Link>
        </div>
      </section>

      {/* testimonials */}
      <section className={`${wrap} mt-24`}><h2 className="mb-9 text-4xl md:text-5xl">What customers say</h2>
        <div className="grid gap-10 md:grid-cols-3">{[["Smoked Pineapple gets a compliment every single time. Easily 9 hours on my skin.", "Rohan, Panaji"], ["Persian Rose is the first rose perfume that doesn't smell like soap.", "Ishita, Margao"], ["I tried the 6 ml oil first and went back for the 50 ml the same week.", "Meera, Ponda"]].map(([q, a]) => <figure key={a} className="border-t-2 border-gold pt-5"><blockquote className="serif text-xl leading-snug">{q}</blockquote><figcaption className="mt-4 text-sm text-ink/65">{a}</figcaption></figure>)}</div></section>

      {/* journal */}
      <section className={`${wrap} mt-24`}><Head t="From the journal" href="/blog" /><div className="grid gap-6 md:grid-cols-3">{posts.slice(0, 3).map((p) => <Link key={p.slug} href={`/blog/${p.slug}`} className="group block"><div className="relative aspect-[16/10] overflow-hidden rounded-md" style={{ background: p.tint }}><Photo src={`/blog/${p.slug}.jpg`} alt={p.title} className="transition-transform duration-500 group-hover:scale-105" /></div><p className="mt-3 text-xs text-ink/55">{p.date}</p><h3 className="serif mt-1 text-2xl group-hover:text-amber">{p.title}</h3></Link>)}</div></section>
    </>
  );
}
