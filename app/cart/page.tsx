"use client";
import Link from "next/link";
import CartLines from "@/components/CartLines";
import { useCart } from "@/components/CartContext";
import { money } from "@/lib/products";
export default function Cart() {
  const { lines, subtotal } = useCart();
  if (!lines.length) return <div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-6xl">Your bag is empty</h1><Link href="/shop" className="btn mt-8">Shop all scents</Link></div>;
  const ship = subtotal >= 1999 ? 0 : 99;
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="text-6xl">Your bag</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
        <CartLines />
        <aside className="h-fit border-2 border-ink p-6 shadow-[6px_6px_0_#0b1020]">
          <dl className="space-y-3 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div><div className="flex justify-between"><dt>Shipping</dt><dd>{ship ? money(ship) : "Free"}</dd></div><div className="flex justify-between border-t-2 border-ink pt-3 text-lg font-bold"><dt>Total</dt><dd>{money(subtotal + ship)}</dd></div></dl>
          <Link href="/checkout" className="btn mt-6 w-full">Checkout</Link>
        </aside>
      </div>
    </div>
  );
}
