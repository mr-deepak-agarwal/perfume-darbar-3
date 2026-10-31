"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { money, variantOf, variantLabel } from "@/lib/products";
import { useCatalog } from "@/components/CatalogContext";
import { FREE_SHIP, SHIP_FEE, PREPAID_OFF, COD_MAX } from "@/lib/offers";
function F({ l, ...r }: { l: string } & React.InputHTMLAttributes<HTMLInputElement>) { return <label className="block text-sm"><span className="mb-1 block font-semibold">{l}</span><input required className="field" {...r} /></label>; }
export default function Checkout() {
  const { lines, ready, subtotal, clear } = useCart();
  const { getProduct } = useCatalog();
  const router = useRouter();
  const [pay, setPay] = useState("upi");
  const ship = subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
  // FAQ promises COD only up to ₹10,000, so enforce it here too
  const codOk = subtotal + ship <= COD_MAX;
  const method = pay === "cod" && !codOk ? "upi" : pay;
  const prepaidOff = method === "cod" ? 0 : PREPAID_OFF;
  const total = subtotal - prepaidOff + ship;
  if (!ready) return <div className="mx-auto max-w-xl px-5 py-24 text-center text-ink/50" aria-busy="true">Loading…</div>;
  if (!lines.length) return <div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-4xl">Nothing to check out</h1><Link href="/shop" className="btn mt-6">Shop all perfumes</Link></div>;
  const submit = (e: React.FormEvent) => { e.preventDefault(); const id = "PD" + Math.floor(100000 + Math.random() * 900000); clear(); router.push(`/checkout/success?order=${id}`); };
  return (
    <form onSubmit={submit} className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-5xl">Checkout</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <section><h2 className="mb-4 text-2xl">Contact</h2><div className="grid gap-4 sm:grid-cols-2"><F l="Email" type="email" /><F l="Phone" type="tel" inputMode="tel" pattern="[+0-9 ()-]{10,15}" title="Enter a valid phone number" /></div></section>
          <section><h2 className="mb-4 text-2xl">Delivery address</h2><div className="grid gap-4 sm:grid-cols-2"><F l="First name" /><F l="Last name" /><div className="sm:col-span-2"><F l="Address" /></div><F l="City" /><F l="State" /><F l="PIN code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} title="6-digit PIN code" /><F l="Country" defaultValue="India" /></div></section>
          <section><h2 className="mb-4 text-2xl">Payment</h2>
            <div className="space-y-3">{[["upi", "UPI (save ₹50)"], ["card", "Credit or debit card (save ₹50)"], ["cod", codOk ? "Cash on delivery" : "Cash on delivery (orders up to ₹10,000 only)"]].map(([v, l]) => <label key={v} className={`flex items-center gap-3 rounded-xl border bg-white p-4 text-sm ${method === v ? "border-ink" : "border-line"} ${v === "cod" && !codOk ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}><input type="radio" name="pay" checked={method === v} disabled={v === "cod" && !codOk} onChange={() => setPay(v)} className="accent-plum" />{l}</label>)}</div>
            {method === "card" && <div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><F l="Card number" inputMode="numeric" placeholder="Demo only" /></div><F l="Expiry" placeholder="MM/YY" /><F l="CVV" /></div>}
            {method === "upi" && <div className="mt-4"><F l="UPI ID" placeholder="name@bank" /></div>}
          </section>
        </div>
        <aside className="h-fit rounded-2xl bg-white p-6">
          <h2 className="text-2xl">Your order</h2>
          <ul className="mt-4 space-y-3 text-sm">{lines.map((l) => { const p = getProduct(l.slug)!; const v = variantOf(p, l.v); return <li key={l.slug + l.v} className="flex justify-between gap-3"><span>{p.name} <span className="text-ink/55">· {variantLabel(v)} × {l.qty}</span></span><span>{money(v.price * l.qty)}</span></li>; })}</ul>
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>{prepaidOff > 0 && <div className="flex justify-between text-emerald-700"><dt>Online payment offer</dt><dd>−{money(prepaidOff)}</dd></div>}<div className="flex justify-between"><dt>Shipping</dt><dd>{ship ? money(ship) : "Free"}</dd></div><div className="flex justify-between pt-2 text-base font-semibold"><dt>Total</dt><dd>{money(total)}</dd></div></dl>
          <button className="btn mt-6 w-full">{method === "cod" ? "Place order" : `Pay ${money(total)}`}</button>
        </aside>
      </div>
    </form>
  );
}
