"use client";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/components/CartContext";
import { getProduct, money, products } from "@/lib/products";
import { bundleInfo, FREE_SHIP, SHIP_FEE, PREPAID_OFF } from "@/lib/offers";
export default function Cart() {
  const { lines, setQty, remove, subtotal } = useCart();
  if (!lines.length) return <div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-4xl">Your cart is empty</h1><p className="mt-3 text-ink/60">Find a scent worth wearing every day.</p><div className="mt-6 flex justify-center gap-3"><Link href="/shop" className="btn">Shop all perfumes</Link><Link href="/samples" className="btn btn-ghost">Try samples</Link></div></div>;
  const b = bundleInfo(lines);
  const ship = subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
  const left = Math.max(0, FREE_SHIP - subtotal);
  const inCart = new Set(lines.map((l) => l.slug));
  const more = products.filter((p) => !inCart.has(p.slug) && p.category !== "Gift Set").sort((a, c) => c.sold - a.sold).slice(0, 4);
  const bundleMsg = b.eligible > 0 && b.eligible % 3 === 0 ? `Offer applied: ${b.free} perfume${b.free > 1 ? "s" : ""} free. You saved ${money(b.discount)}.` : b.eligible === 0 ? "Buy 2 get 1 free: add any 3 perfumes and pay for only 2." : `Add ${b.needed} more perfume${b.needed > 1 ? "s" : ""} to get one free.`;
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-5xl">Your cart</h1>
      <div className="mt-6 space-y-3">
        <div className="rounded-2xl bg-white p-4 text-sm"><p>{left ? <>Add <b>{money(left)}</b> more for free shipping.</> : <b className="text-emerald-700">You have free shipping.</b>}</p><div className="mt-2 h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-plum" style={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }} /></div></div>
        <div className={`rounded-2xl p-4 text-sm ${b.free > 0 ? "bg-emerald-50 text-emerald-800" : "bg-white"}`}><b>Buy 2 get 1 free.</b> {bundleMsg}</div>
      </div>
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-line">
          {lines.map((l) => { const p = getProduct(l.slug)!; const base = p.slug.replace(/-sample$/, ""); return (
            <li key={l.slug} className="flex gap-5 py-5">
              <Link href={`/product/${base}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-white"><ProductImage p={p} /></Link>
              <div className="flex-1"><div className="flex justify-between gap-3"><div><h3 className="serif text-xl">{p.name}</h3><p className="text-sm text-ink/60">{p.brand} · {p.size}</p></div><p className="font-semibold">{money(p.price * l.qty)}</p></div>
                <div className="mt-4 flex items-center gap-5 text-sm">
                  <div className="flex items-center rounded-full border border-line bg-white"><button aria-label="Decrease" className="px-3 py-1.5" onClick={() => setQty(l.slug, l.qty - 1)}>−</button><span className="w-5 text-center">{l.qty}</span><button aria-label="Increase" className="px-3 py-1.5" onClick={() => setQty(l.slug, l.qty + 1)}>+</button></div>
                  <button className="underline underline-offset-4" onClick={() => remove(l.slug)}>Remove</button></div></div>
            </li>); })}
        </ul>
        <aside className="h-fit rounded-2xl bg-white p-6">
          <h2 className="text-2xl">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
            {b.discount > 0 && <div className="flex justify-between text-emerald-700"><dt>Buy 2 get 1 free</dt><dd>−{money(b.discount)}</dd></div>}
            <div className="flex justify-between"><dt>Shipping</dt><dd>{ship ? money(ship) : "Free"}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><dt>Total</dt><dd>{money(subtotal - b.discount + ship)}</dd></div></dl>
          <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">Pay online at checkout and save another ₹{PREPAID_OFF}.</p>
          <Link href="/checkout" className="btn mt-5 w-full">Go to checkout</Link>
          <Link href="/shop" className="mt-3 block text-center text-sm underline underline-offset-4">Continue shopping</Link>
        </aside>
      </div>
      <section className="mt-20"><h2 className="mb-8 text-3xl">Complete your set</h2><div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">{more.map((p) => <ProductCard key={p.slug} p={p} showAdd />)}</div></section>
    </div>
  );
}
