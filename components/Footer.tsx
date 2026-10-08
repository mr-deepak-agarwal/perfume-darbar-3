import Link from "next/link";
const col = (t: string, l: [string, string][]) => <div className="text-sm"><p className="mb-3 font-semibold">{t}</p><div className="flex flex-col gap-2 text-white/70">{l.map(([a, h]) => <Link key={h} href={h}>{a}</Link>)}</div></div>;
export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-5">
        <div className="md:col-span-2"><p className="serif text-2xl">Perfume Darbar</p><p className="mt-3 max-w-sm text-sm text-white/70">Authentic perfumes, attars and gift sets from India's finest houses. Every order ships with a free sample.</p>
          <div className="mt-5 flex max-w-sm gap-2"><input className="field !text-ink" placeholder="Email address" aria-label="Email address" /><button className="btn bg-amber hover:bg-amber/80">Join</button></div></div>
        {col("Shop", [["All perfumes", "/shop"], ["New arrivals", "/collections/new-arrivals"], ["Bestsellers", "/collections/bestsellers"], ["Attars", "/collections/attars"], ["Gift sets", "/collections/gift-sets"], ["Brands", "/brands"]])}
        {col("Help", [["Track order", "/track-order"], ["Shipping and returns", "/help/shipping-returns"], ["FAQ", "/faq"], ["Contact us", "/contact"], ["My account", "/account"]])}
        {col("Company", [["Our story", "/about"], ["Journal", "/blog"], ["Privacy policy", "/help/privacy"], ["Terms of service", "/help/terms"]])}
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-white/50">© 2026 Perfume Darbar. Demo store.</p>
    </footer>
  );
}
