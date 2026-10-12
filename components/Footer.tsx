import Link from "next/link";
const col = (t: string, l: [string, string][]) => <div className="flex flex-col gap-2 text-sm"><p className="mb-1 font-bold">{t}</p>{l.map(([a, h]) => <Link key={h} href={h} className="hover:underline">{a}</Link>)}</div>;
export default function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-lemon">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-5">
        <div className="md:col-span-2"><p className="display text-5xl md:text-6xl">perfume darbar</p><p className="mt-4 max-w-xs text-sm">Everyday perfumes sorted by scent and occasion. Free sample with every order.</p></div>
        {col("Shop", [["All scents", "/shop"], ["Collections", "/collections"], ["Find my scent", "/quiz"], ["Wishlist", "/wishlist"]])}
        {col("Help", [["Track order", "/track-order"], ["Shipping and returns", "/help/shipping-returns"], ["FAQ", "/faq"], ["Contact us", "/contact"]])}
        {col("Company", [["Our story", "/about"], ["Journal", "/blog"], ["Privacy policy", "/help/privacy"], ["Terms of service", "/help/terms"]])}
      </div>
      <p className="border-t-2 border-ink py-4 text-center text-xs">© 2026 Perfume Darbar. Demo store.</p>
    </footer>
  );
}
