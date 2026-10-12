import Link from "next/link";
export default async function Success({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return (<div className="mx-auto max-w-xl px-5 py-24"><div className="border-2 border-ink bg-lemon p-10 shadow-[8px_8px_0_#0b1020]"><h1 className="text-6xl">It's ordered.</h1><p className="mt-4">Order <b>{order}</b> is confirmed. We'll email tracking details once it ships, usually within 24 hours.</p><div className="mt-6 flex gap-3"><Link href="/account" className="btn">Track order</Link><Link href="/shop" className="btn btn-alt">Keep shopping</Link></div></div></div>);
}
