import Link from "next/link";
const col = (t: string, l: [string, string][]) => <div className="text-sm"><p className="serif mb-4 text-lg text-gold">{t}</p><div className="flex flex-col gap-2.5 text-mist/75">{l.map(([a, h]) => <Link key={h} href={h} className="hover:text-gold">{a}</Link>)}</div></div>;
export default function Footer() {
  return (
    <footer className="mt-24 bg-deep text-mist"><div className="rule-gold" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-5">
        <div className="md:col-span-2"><p className="serif text-3xl">Perfume Darbar</p><p className="mt-3 max-w-sm text-sm text-mist/75">Pure oils and perfumes from Ponda, Goa. 100 fragrances, five sizes, from ₹100.</p>
          <div className="mt-5 flex max-w-sm gap-2"><input className="field !text-ink" placeholder="Email address" aria-label="Email address" /><button className="btn btn-gold">Join</button></div></div>
        {col("Shop", [["All fragrances", "/shop"], ["Oud collection", "/collections/oud"], ["Musk edit", "/collections/musk"], ["Fresh and aquatic", "/collections/fresh-aquatic"], ["Sweet and gourmand", "/collections/sweet-gourmand"], ["Best value", "/collections/best-value"], ["Premium blends", "/collections/premium"], ["Find my scent", "/quiz"]])}
        {col("Help", [["Track order", "/track-order"], ["Shipping and returns", "/help/shipping-returns"], ["FAQ", "/faq"], ["Contact us", "/contact"], ["My account", "/account"]])}
        {col("Company", [["Our story", "/about"], ["Journal", "/blog"], ["Privacy policy", "/help/privacy"], ["Terms of service", "/help/terms"]])}
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-mist/55">© 2026 Perfume Darbar. All rights reserved.</p>
    </footer>
  );
}
