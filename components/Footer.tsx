import Link from "next/link";
export default function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-lemon">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 text-sm md:grid-cols-4">
        <div className="md:col-span-2"><p className="display text-5xl md:text-7xl">perfume darbar</p></div>
        <div className="flex flex-col gap-2 font-semibold"><Link href="/shop">Shop all</Link><Link href="/quiz">Find my scent</Link><Link href="/about">Our story</Link></div>
        <div className="flex flex-col gap-2"><Link href="/account" className="font-semibold">Track order</Link><span>hello@perfumedarbar.in</span><span>Shipping and returns</span></div>
      </div>
      <p className="border-t-2 border-ink py-4 text-center text-xs">© 2026 Perfume Darbar. Demo store.</p>
    </footer>
  );
}
