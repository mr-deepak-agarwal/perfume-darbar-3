"use client";
import Link from "next/link";
import { useState } from "react";
import Gallery from "@/components/Gallery";
import TrustStrip from "@/components/TrustStrip";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { PREPAID_OFF } from "@/lib/offers";
import { Product, VariantId, DEFAULT_VARIANT, money, hoursOf, variantOf } from "@/lib/products";
type Review = { name: string; rating: number; text: string; date: string; verified: boolean };
const n = (s: string) => s.split(",")[0];
function Acc({ t, children }: { t: string; children: React.ReactNode }) {
  return <details className="group border-b border-line py-4"><summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{t}<span className="text-xl transition-transform group-open:rotate-45">+</span></summary><div className="mt-3 text-sm leading-relaxed text-ink/75">{children}</div></details>;
}
export default function ProductView({ p, reviews }: { p: Product; reviews: Review[] }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [vid, setVid] = useState<VariantId>(DEFAULT_VARIANT);
  const [q, setQ] = useState(1);
  const [added, setAdded] = useState(false);
  const [pin, setPin] = useState("");
  const [eta, setEta] = useState("");
  const v = variantOf(p, vid);
  const kinds = ["Pure oil", "Perfume"] as const;
  const chips = [v.size, v.kind, `${hoursOf(v)} hrs lasting`, p.scent, p.category].filter(Boolean) as string[];
  const pick = (id: VariantId) => { setVid(id); setAdded(false); };
  return (
    <>
      <nav className="mb-6 text-sm text-ink/60"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {p.name}</nav>
      <div className="grid gap-10 md:grid-cols-2">
        <Gallery p={p} />
        <div>
          <p className="text-sm text-ink/60">{p.family} · {p.category}</p>
          <h1 className="mt-1 text-4xl md:text-5xl">{p.name}</h1>
          <p className="mt-3 text-sm"><span className="text-amber">★★★★★</span> {p.rating} <a href="#reviews" className="text-ink/60 underline underline-offset-4">({p.reviews} Verified Reviews)</a></p>
          <p className="mt-2 text-sm font-medium text-plum">{n(p.top)} | {n(p.heart)} | {n(p.base)}</p>
          <p className="mt-4 text-3xl">{money(v.price)} <span className="text-base text-ink/50">/ {v.size}</span></p>
          <p className="mt-1 text-xs text-ink/50">Inclusive of all taxes</p>
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold">Choose format and size</p>
            {kinds.map((k) => (
              <div key={k} className="mb-3">
                <p className="mb-1.5 text-xs uppercase tracking-wide text-ink/55">{k === "Pure oil" ? "Pure oil (alcohol-free)" : "Perfume"}</p>
                <div className="flex flex-wrap gap-2">{p.variants.filter((x) => x.kind === k).map((x) => (
                  <button key={x.id} onClick={() => pick(x.id)} aria-pressed={vid === x.id} className={`rounded-xl border px-4 py-2 text-left text-sm ${vid === x.id ? "border-ink bg-ink text-white" : "border-line bg-white"}`}><b className="block">{x.size}</b><span className={vid === x.id ? "text-white/80" : "text-ink/60"}>{money(x.price)}</span></button>
                ))}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm"><span><b>Pay online and save ₹{PREPAID_OFF}</b> <span className="text-ink/60">with UPI or card</span></span><b className="text-lg text-emerald-700">{money(Math.max(v.price - PREPAID_OFF, 0))}</b></div>
          <div className="mt-4 flex flex-wrap gap-2">{chips.map((c) => <span key={c} className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold">{c}</span>)}</div>
          <div className="mt-6 flex gap-3">
            <div className="flex items-center rounded-full border border-line bg-white"><button aria-label="Decrease" className="px-4 py-3" onClick={() => setQ(Math.max(1, q - 1))}>−</button><span className="w-6 text-center text-sm">{q}</span><button aria-label="Increase" className="px-4 py-3" onClick={() => setQ(Math.min(20, q + 1))}>+</button></div>
            <button className="btn flex-1" onClick={() => { add(p.slug, vid, q); setAdded(true); }}>Add to cart · {money(v.price * q)}</button>
            <button onClick={() => toggle(p.slug)} aria-pressed={has(p.slug)} aria-label="Toggle wishlist" className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-xl">{has(p.slug) ? "♥" : "♡"}</button>
          </div>
          {added && <p className="mt-3 text-sm text-plum">Added {v.size} {v.kind.toLowerCase()} to your cart. <Link href="/cart" className="font-semibold underline">View cart</Link></p>}
          <TrustStrip className="mt-5 !grid-cols-2 border border-line" />
          <div className="mt-5 flex gap-2"><input className="field !w-40" placeholder="PIN code" inputMode="numeric" aria-label="PIN code" value={pin} onChange={(e) => setPin(e.target.value)} /><button className="btn btn-ghost !py-2" onClick={() => setEta(/^\d{6}$/.test(pin) ? "Delivery in 3 to 6 working days. Cash on delivery available." : "Enter a valid 6-digit PIN code.")}>Check delivery</button></div>
          {eta && <p className="mt-2 text-sm text-ink/70">{eta}</p>}
          <div className="mt-6 border-t border-line">
            <Acc t="Product description">{p.desc} Top notes: {p.top}. Heart notes: {p.heart}. Base notes: {p.base}. Best for {p.occasions.join(", ").toLowerCase()}.</Acc>
            <Acc t="Pure oil or perfume?">The pure oil (6 ml and 12 ml) is alcohol-free and stays close to the skin for 10 hours or more. Apply a dab on pulse points. The perfume (30, 50 and 100 ml) is a spray that projects more and suits offices and evenings out.</Acc>
            <Acc t="How to use">Spray or dab on pulse points: wrists, neck and behind the ears. Do not rub, as it crushes the top notes. Apply on moisturised skin for longer wear. Keep away from eyes, flames and heat.</Acc>
            <Acc t="Ingredients">{v.kind === "Pure oil" ? "Perfume oil blend and fragrance compounds. Alcohol-free. The full ingredient list is printed on the pack." : "Alcohol denat., parfum (fragrance), aqua and approved colourants. The full ingredient list is printed on the pack."}</Acc>
            <Acc t="Manufacturer details">Marketed by Perfume Darbar, Ponda, Goa, India. Country of origin: India.</Acc>
            <Acc t="Shipping and returns">Free shipping above ₹3,999, otherwise ₹149. Delivery in 3 to 6 working days across India. Unused, sealed bottles can be returned within 30 days. <Link href="/help/shipping-returns" className="underline">Full policy</Link></Acc>
          </div>
        </div>
      </div>
      <section id="reviews" className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4"><h2 className="text-3xl">Customer reviews</h2><p className="text-sm"><span className="serif text-4xl">{p.rating}</span> <span className="text-amber">★★★★★</span> <span className="text-ink/60">based on {p.reviews} verified reviews</span></p></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{reviews.map((r, i) => <div key={i} className="rounded-2xl bg-white p-5"><div className="flex items-center justify-between gap-2 text-sm"><b>{r.name}</b><span className="text-xs text-emerald-700">✓ Verified</span></div><p className="mt-1 text-xs text-ink/50">{r.date}</p><p className="mt-2 text-sm text-amber">{"★".repeat(r.rating)}<span className="text-ink/20">{"★".repeat(5 - r.rating)}</span></p><p className="mt-2 rounded-xl bg-amber/10 p-3 text-sm leading-relaxed">{r.text}</p></div>)}</div>
      </section>
    </>
  );
}
