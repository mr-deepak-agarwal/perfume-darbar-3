import Link from "next/link";
import Bottle from "@/components/Bottle";
import Photo from "@/components/Photo";
import ProductCard from "@/components/ProductCard";
import { products, brands, collections, families } from "@/lib/products";
import { posts } from "@/lib/content";
const col = (s: string) => products.filter(collections.find((c) => c.slug === s)!.test);
const tiles = [["Women", "/shop?c=Women", "women", "#f2c6d4"], ["Men", "/shop?c=Men", "men", "#cfd8f0"], ["Unisex", "/shop?c=Unisex", "unisex", "#d9ead3"], ["Attars", "/collections/attars", "attars", "#f3e2b8"], ["Gift sets", "/collections/gift-sets", "gifts", "#e2d3ee"]];
const Head = ({ t, href }: { t: string; href: string }) => <div className="mb-8 flex items-end justify-between"><h2 className="text-4xl">{t}</h2><Link href={href} className="text-sm underline underline-offset-4">View all</Link></div>;
export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-2 md:py-20">
        <div><h1 className="text-5xl leading-[1.05] md:text-7xl">Find the scent that walks in before you do.</h1>
          <p className="mt-6 max-w-md text-lg text-ink/70">24 authentic perfumes, attars and gift sets from six Indian houses. Free sample with every order.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/shop" className="btn">Shop all perfumes</Link><Link href="/collections/gift-sets" className="btn btn-ghost">Gift sets</Link></div>
          <dl className="mt-10 flex gap-8 text-sm"><div><dt className="text-ink/60">Perfumes</dt><dd className="serif text-3xl">{products.length}</dd></div><div><dt className="text-ink/60">Brands</dt><dd className="serif text-3xl">{brands.length}</dd></div><div><dt className="text-ink/60">Reviews</dt><dd className="serif text-3xl">4.7★</dd></div></dl></div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl" style={{ background: "linear-gradient(160deg,#4a215833,#c27c1a44)" }}>
          <Photo src="/hero.jpg" alt="Perfume Darbar collection" fallback={<Bottle c1="#5b3a8a" c2="#1a0b2a" id="hero" className="absolute inset-0 m-auto h-4/5" />} /></div>
      </section>
      <section className="mx-auto max-w-6xl px-5"><div className="grid grid-cols-2 gap-4 md:grid-cols-5">{tiles.map(([n, h, img, bg]) => (
        <Link key={n} href={h} className="group relative aspect-[3/4] overflow-hidden rounded-2xl" style={{ background: bg }}><Photo src={`/categories/${img}.jpg`} alt={n} /><span className="absolute bottom-3 left-3 rounded-full bg-white px-4 py-2 text-sm font-semibold group-hover:bg-ink group-hover:text-white">{n}</span></Link>))}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="New arrivals" href="/collections/new-arrivals" /><div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">{col("new-arrivals").slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><div className="rounded-3xl bg-white p-8 md:p-10"><p className="mb-5 text-sm text-ink/60">Shop by brand</p><div className="flex flex-wrap gap-x-10 gap-y-4">{brands.map((b) => <Link key={b} href={`/shop?b=${encodeURIComponent(b)}`} className="serif text-2xl hover:text-amber md:text-3xl">{b}</Link>)}</div></div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><div className="grid overflow-hidden rounded-3xl bg-ink text-white md:grid-cols-2"><div className="p-10 md:p-14"><h2 className="text-4xl md:text-5xl">The Oud collection</h2><p className="mt-4 max-w-sm text-white/70">Deep, resinous and made for the evening. Four perfumes built around real agarwood.</p><Link href="/collections/oud" className="btn mt-7 bg-amber hover:bg-amber/80">Explore oud</Link></div><div className="relative min-h-64" style={{ background: "linear-gradient(135deg,#5b3a8a,#1a0b2a)" }}><Photo src="/categories/oud.jpg" alt="Oud collection" fallback={<Bottle c1="#5b3a8a" c2="#c27c1a" id="oud" className="absolute inset-0 m-auto h-3/4" />} /></div></div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="Bestsellers" href="/collections/bestsellers" /><div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">{col("bestsellers").slice(0, 8).map((p) => <ProductCard key={p.slug} p={p} />)}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><h2 className="mb-6 text-4xl">Shop by scent family</h2><div className="flex flex-wrap gap-3">{families.map((f) => <Link key={f} href={`/shop?f=${f}`} className="rounded-full border border-ink px-6 py-3 text-sm hover:bg-ink hover:text-white">{f}</Link>)}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="Gift sets" href="/collections/gift-sets" /><div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">{col("gift-sets").map((p) => <ProductCard key={p.slug} p={p} />)}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><div className="grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4">{[["100% authentic", "Sourced directly from the house."], ["Free sample", "With every order, always."], ["30-day returns", "On unused, sealed bottles."], ["Secure payments", "UPI, cards and cash on delivery."]].map(([t, d]) => <div key={t} className="bg-white p-7"><h3 className="text-lg">{t}</h3><p className="mt-1 text-sm text-ink/70">{d}</p></div>)}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><h2 className="mb-8 text-4xl">What customers say</h2><div className="grid gap-5 md:grid-cols-3">{[["Amber Noir gets a compliment every single time. Easily 9 hours on my skin.", "Rohan, Mumbai"], ["Jaipur Rose is the first rose perfume that doesn't smell like soap.", "Ishita, Delhi"], ["The Discovery Set made choosing easy. Packaging felt like a gift.", "Meera, Bengaluru"]].map(([q, a]) => <figure key={a} className="rounded-2xl bg-white p-7"><blockquote className="serif text-lg leading-snug">“{q}”</blockquote><figcaption className="mt-4 text-sm text-ink/60">{a}</figcaption></figure>)}</div></section>
      <section className="mx-auto mt-20 max-w-6xl px-5"><Head t="From the journal" href="/blog" /><div className="grid gap-5 md:grid-cols-3">{posts.slice(0, 3).map((p) => <Link key={p.slug} href={`/blog/${p.slug}`} className="group block"><div className="aspect-[16/10] rounded-2xl" style={{ background: p.tint }} /><p className="mt-3 text-xs text-ink/55">{p.date}</p><h3 className="serif mt-1 text-xl group-hover:text-plum">{p.title}</h3></Link>)}</div></section>
    </>
  );
}
