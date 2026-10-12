"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { getProduct, money, sizePrice } from "@/lib/products";
function In({ l, v, set, ...r }: { l: string; v: string; set: (s: string) => void } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className="block text-sm"><span className="mb-1 block font-bold">{l}</span><input required className="field" value={v} onChange={(e) => set(e.target.value)} {...r} /></label>;
}
const steps = ["Details", "Delivery", "Payment"];
export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ email: "", phone: "", name: "", address: "", city: "", pin: "", ship: "std", pay: "upi" });
  const s = (k: string) => (v: string) => setF((o) => ({ ...o, [k]: v }));
  const ship = f.ship === "exp" ? 199 : subtotal >= 1999 ? 0 : 99;
  if (!lines.length) return <div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-6xl">Nothing to check out</h1><Link href="/shop" className="btn mt-8">Shop all scents</Link></div>;
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (step < 2) return setStep(step + 1); const id = "PD" + Math.floor(100000 + Math.random() * 900000); clear(); router.push(`/checkout/success?order=${id}`); };
  return (
    <form onSubmit={submit} className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-6xl">Checkout</h1>
      <ol className="mt-6 flex gap-2">{steps.map((t, i) => <li key={t} className="flex-1"><div className={`h-2 border-2 border-ink ${i <= step ? "bg-blue" : "bg-white"}`} /><p className={`mt-1 text-sm ${i === step ? "font-bold" : "text-ink/50"}`}>{t}</p></li>)}</ol>
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {step === 0 && <><In l="Email" type="email" v={f.email} set={s("email")} /><In l="Phone" type="tel" v={f.phone} set={s("phone")} /><In l="Full name" v={f.name} set={s("name")} /></>}
          {step === 1 && <><In l="Address" v={f.address} set={s("address")} /><div className="grid grid-cols-2 gap-4"><In l="City" v={f.city} set={s("city")} /><In l="PIN code" inputMode="numeric" v={f.pin} set={s("pin")} /></div>
            <p className="pt-2 text-sm font-bold">Delivery speed</p>{[["std", "Standard, 3 to 6 days", subtotal >= 1999 ? "Free" : money(99)], ["exp", "Express, 1 to 2 days", money(199)]].map(([v, l, pr]) => <label key={v} className={`flex cursor-pointer justify-between border-2 border-ink p-4 text-sm ${f.ship === v ? "bg-lemon" : ""}`}><span><input type="radio" className="mr-3 accent-blue" checked={f.ship === v} onChange={() => s("ship")(v)} />{l}</span><b>{pr}</b></label>)}</>}
          {step === 2 && <><p className="text-sm font-bold">Payment method</p>{[["upi", "UPI"], ["card", "Card"], ["cod", "Cash on delivery"]].map(([v, l]) => <label key={v} className={`flex cursor-pointer items-center border-2 border-ink p-4 text-sm ${f.pay === v ? "bg-lemon" : ""}`}><input type="radio" className="mr-3 accent-blue" checked={f.pay === v} onChange={() => s("pay")(v)} />{l}</label>)}
            {f.pay === "upi" && <input required className="field" placeholder="name@bank" aria-label="UPI ID" />}{f.pay === "card" && <div className="grid grid-cols-2 gap-4"><input required className="field col-span-2" placeholder="Card number (demo only)" aria-label="Card number" /><input required className="field" placeholder="MM/YY" aria-label="Expiry" /><input required className="field" placeholder="CVV" aria-label="CVV" /></div>}</>}
          <div className="flex gap-3 pt-4">{step > 0 && <button type="button" className="btn btn-alt" onClick={() => setStep(step - 1)}>Back</button>}<button className="btn flex-1">{step < 2 ? `Continue to ${steps[step + 1].toLowerCase()}` : `Place order · ${money(subtotal + ship)}`}</button></div>
        </div>
        <aside className="h-fit border-2 border-ink p-6 shadow-[6px_6px_0_#0b1020]"><h2 className="text-2xl">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">{lines.map((l) => { const p = getProduct(l.slug)!; return <li key={l.slug + l.size} className="flex justify-between gap-3"><span>{p.name}, {l.size} ml × {l.qty}</span><span>{money(sizePrice(p, l.size) * l.qty)}</span></li>; })}</ul>
          <div className="mt-4 space-y-1 border-t-2 border-ink pt-3 text-sm"><div className="flex justify-between"><span>Shipping</span><span>{ship ? money(ship) : "Free"}</span></div><div className="flex justify-between text-lg font-bold"><span>Total</span><span>{money(subtotal + ship)}</span></div></div></aside>
      </div>
    </form>
  );
}
