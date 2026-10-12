"use client";
import Link from "next/link";
import { useCart } from "./CartContext";
import CartLines from "./CartLines";
import { money } from "@/lib/products";
export default function Header() {
  const { count, open, setOpen, lines, subtotal } = useCart();
  const links = [["Shop", "/shop"], ["Find my scent", "/quiz"], ["Our story", "/about"]];
  return (
    <>
      <div className="bg-lemon border-b-2 border-ink px-4 py-2 text-center text-sm font-semibold">Free shipping above ₹1,999. Try the 5-scent discovery set for ₹999.</div>
      <header className="sticky top-0 z-30 border-b-2 border-ink bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-4">
          <nav className="hidden gap-6 text-sm font-semibold md:flex">{links.map(([l, h]) => <Link key={h} href={h} className="hover:text-blue">{l}</Link>)}</nav>
          <Link href="/shop" className="md:hidden text-sm font-semibold">Shop</Link>
          <Link href="/" className="display text-xl sm:text-3xl">perfume darbar</Link>
          <div className="flex items-center justify-end gap-5 text-sm font-semibold"><Link href="/account" className="hover:text-blue">Account</Link><button onClick={() => setOpen(true)} className="border-2 border-ink bg-ink px-3 py-1.5 text-white">Bag {count}</button></div>
        </div>
      </header>
      {open && <div className="fixed inset-0 z-40 bg-ink/50" onClick={() => setOpen(false)} />}
      <aside aria-label="Shopping bag" className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l-2 border-ink bg-white transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b-2 border-ink p-5"><h2 className="text-3xl">Your bag</h2><button onClick={() => setOpen(false)} className="font-semibold underline">Close</button></div>
        <div className="flex-1 overflow-y-auto p-5">{lines.length ? <CartLines /> : <p className="text-ink/60">Your bag is empty. <Link href="/shop" onClick={() => setOpen(false)} className="font-semibold underline">Browse scents</Link></p>}</div>
        {lines.length > 0 && <div className="space-y-3 border-t-2 border-ink p-5"><div className="flex justify-between font-bold"><span>Subtotal</span><span>{money(subtotal)}</span></div><Link href="/checkout" onClick={() => setOpen(false)} className="btn w-full">Checkout</Link><Link href="/cart" onClick={() => setOpen(false)} className="btn btn-alt w-full">View full bag</Link></div>}
      </aside>
    </>
  );
}
