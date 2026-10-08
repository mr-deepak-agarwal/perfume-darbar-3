"use client";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { useCart } from "@/components/CartContext";
import { getProduct, money } from "@/lib/products";
export default function Cart() {
  const { lines, setQty, remove, subtotal } = useCart();
  const ship = subtotal >= 3999 || !subtotal ? 0 : 149;
  if (!lines.length) return <div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-4xl">Your cart is empty</h1><p className="mt-3 text-ink/60">Find a scent worth wearing every day.</p><Link href="/shop" className="btn mt-6">Shop all perfumes</Link></div>;
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-5xl">Your cart</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-line">
          {lines.map((l) => { const p = getProduct(l.slug)!; return (
            <li key={l.slug} className="flex gap-5 py-5">
              <Link href={`/product/${p.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-white"><ProductImage p={p} /></Link>
              <div className="flex-1"><div className="flex justify-between gap-3"><div><h3 className="serif text-xl">{p.name}</h3><p className="text-sm text-ink/60">{p.size}</p></div><p className="font-semibold">{money(p.price * l.qty)}</p></div>
                <div className="mt-4 flex items-center gap-5 text-sm">
                  <div className="flex items-center rounded-full border border-line bg-white"><button aria-label="Decrease" className="px-3 py-1.5" onClick={() => setQty(l.slug, l.qty - 1)}>−</button><span className="w-5 text-center">{l.qty}</span><button aria-label="Increase" className="px-3 py-1.5" onClick={() => setQty(l.slug, l.qty + 1)}>+</button></div>
                  <button className="underline underline-offset-4" onClick={() => remove(l.slug)}>Remove</button></div></div>
            </li>); })}
        </ul>
        <aside className="h-fit rounded-2xl bg-white p-6">
          <h2 className="text-2xl">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div><div className="flex justify-between"><dt>Shipping</dt><dd>{ship ? money(ship) : "Free"}</dd></div><div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><dt>Total</dt><dd>{money(subtotal + ship)}</dd></div></dl>
          <Link href="/checkout" className="btn mt-6 w-full">Go to checkout</Link>
          <Link href="/shop" className="mt-3 block text-center text-sm underline underline-offset-4">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
