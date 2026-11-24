import Link from "next/link";
import { NOTIFICATIONS_LIVE } from "@/lib/offers";
export default async function Success({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-5xl">Order placed</h1>
      <p className="mt-4 text-ink/70">Thank you. Your order <strong>{order}</strong> is confirmed. {NOTIFICATIONS_LIVE ? "A confirmation email and SMS are on their way, and we'll dispatch within 24 hours." : "This is a draft store: no payment was taken, and order email and SMS confirmations are not switched on yet."}</p>
      <div className="mt-8 flex justify-center gap-3"><Link href="/account" className="btn">Track order</Link><Link href="/shop" className="btn btn-ghost">Keep shopping</Link></div>
    </div>
  );
}
