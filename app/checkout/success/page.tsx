import Link from "next/link";
export default async function Success({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-5xl">Order placed</h1>
      <p className="mt-4 text-ink/70">Thank you. Your order <strong>{order}</strong> is confirmed. A confirmation email is on its way and we'll dispatch within 24 hours.</p>
      <div className="mt-8 flex justify-center gap-3"><Link href="/account" className="btn">Track order</Link><Link href="/shop" className="btn btn-ghost">Keep shopping</Link></div>
    </div>
  );
}
