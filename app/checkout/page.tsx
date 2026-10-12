"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { getProduct, money } from "@/lib/products";
function F({ l, ...r }: { l: string } & React.InputHTMLAttributes<HTMLInputElement>) { return <label className="block text-sm"><span className="mb-1 block font-semibold">{l}</span><input required className="field" {...r} /></label>; }
export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();
  const [pay, setPay] = useState("upi");
  const ship = subtotal >= 3999 ? 0 : 149;
  if (!lines.length) return <div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-4xl">Nothing to check out</h1><Link href="/shop" className="btn mt-6">Shop all perfumes</Link></div>;
  const submit = (e: React.FormEvent) => { e.preventDefault(); const id = "PD" + Math.floor(100000 + Math.random() * 900000); clear(); router.push(`/checkout/success?order=${id}`); };
  return (
    <form onSubmit={submit} className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-5xl">Checkout</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <section><h2 className="mb-4 text-2xl">Contact</h2><div className="grid gap-4 sm:grid-cols-2"><F l="Email" type="email" /><F l="Phone" type="tel" /></div></section>
          <section><h2 className="mb-4 text-2xl">Delivery address</h2><div className="grid gap-4 sm:grid-cols-2"><F l="First name" /><F l="Last name" /><div className="sm:col-span-2"><F l="Address" /></div><F l="City" /><F l="State" /><F l="PIN code" inputMode="numeric" /><F l="Country" defaultValue="India" /></div></section>
          <section><h2 className="mb-4 text-2xl">Payment</h2>
            <div className="space-y-3">{[["upi", "UPI"], ["card", "Credit or debit card"], ["cod", "Cash on delivery"]].map(([v, l]) => <label key={v} className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-4 text-sm ${pay === v ? "border-ink" : "border-line"}`}><input type="radio" name="pay" checked={pay === v} onChange={() => setPay(v)} className="accent-plum" />{l}</label>)}</div>
            {pay === "card" && <div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><F l="Card number" inputMode="numeric" placeholder="Demo only" /></div><F l="Expiry" placeholder="MM/YY" /><F l="CVV" /></div>}
            {pay === "upi" && <div className="mt-4"><F l="UPI ID" placeholder="name@bank" /></div>}
          </section>
        </div>
        <aside className="h-fit rounded-2xl bg-white p-6">
          <h2 className="text-2xl">Your order</h2>
          <ul className="mt-4 space-y-3 text-sm">{lines.map((l) => { const p = getProduct(l.slug)!; return <li key={l.slug} className="flex justify-between gap-3"><span>{p.name} × {l.qty}</span><span>{money(p.price * l.qty)}</span></li>; })}</ul>
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div><div className="flex justify-between"><dt>Shipping</dt><dd>{ship ? money(ship) : "Free"}</dd></div><div className="flex justify-between pt-2 text-base font-semibold"><dt>Total</dt><dd>{money(subtotal + ship)}</dd></div></dl>
          <button className="btn mt-6 w-full">{pay === "cod" ? "Place order" : `Pay ${money(subtotal + ship)}`}</button>
        </aside>
      </div>
    </form>
  );
}
