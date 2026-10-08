"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, brands, families, concs } from "@/lib/products";
const cats = ["All", "Women", "Men", "Unisex", "Gift Set"];
const chip = (on: boolean) => `rounded-full border px-3 py-1.5 ${on ? "border-ink bg-ink text-white" : "border-line bg-white"}`;
export default function Shop({ init }: { init: { c?: string; b?: string; q?: string; f?: string; k?: string } }) {
  const [cat, setCat] = useState(init.c || "All");
  const [brand, setBrand] = useState(init.b || "");
  const [q, setQ] = useState(init.q || "");
  const [fam, setFam] = useState(init.f || "");
  const [conc, setConc] = useState(init.k || "");
  const [max, setMax] = useState(15000);
  const [sort, setSort] = useState("featured");
  const [n, setN] = useState(9);
  const ql = q.trim().toLowerCase();
  const list = products.filter((p) => (cat === "All" || p.category === cat) && (!brand || p.brand === brand) && (!fam || p.family === fam) && (!conc || p.conc === conc) && p.price <= max && (!ql || `${p.name} ${p.brand} ${p.top} ${p.heart} ${p.base} ${p.family}`.toLowerCase().includes(ql)))
    .sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : 0);
  const reset = () => { setCat("All"); setBrand(""); setQ(""); setFam(""); setConc(""); setMax(15000); };
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-5xl">{q ? `Results for "${q}"` : cat === "All" ? "All perfumes" : `${cat === "Gift Set" ? "Gift sets" : cat + "'s perfumes"}`}</h1>
      <p className="mt-2 text-ink/60">{list.length} products</p>
      <div className="mt-8 grid gap-10 md:grid-cols-[230px_1fr]">
        <aside className="space-y-7 text-sm">
          <input className="field" placeholder="Search" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
          <div><p className="mb-2 font-semibold">Category</p><div className="flex flex-wrap gap-2">{cats.map((c) => <button key={c} onClick={() => setCat(c)} className={chip(cat === c)}>{c}</button>)}</div></div>
          <div><label htmlFor="br" className="mb-2 block font-semibold">Brand</label><select id="br" className="field" value={brand} onChange={(e) => setBrand(e.target.value)}><option value="">All brands</option>{brands.map((b) => <option key={b}>{b}</option>)}</select></div>
          <div><p className="mb-2 font-semibold">Type</p><div className="flex flex-wrap gap-2">{concs.map((c) => <button key={c} onClick={() => setConc(conc === c ? "" : c)} className={chip(conc === c)}>{c}</button>)}</div></div>
          <div><p className="mb-2 font-semibold">Scent family</p><div className="flex flex-wrap gap-2">{families.map((f) => <button key={f} onClick={() => setFam(fam === f ? "" : f)} className={chip(fam === f)}>{f}</button>)}</div></div>
          <div><label htmlFor="pr" className="mb-2 block font-semibold">Max price: ₹{max.toLocaleString("en-IN")}</label><input id="pr" type="range" min={1500} max={15000} step={500} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-plum" /></div>
          <div><label htmlFor="so" className="mb-2 block font-semibold">Sort by</label><select id="so" className="field" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select></div>
          <button className="underline underline-offset-4" onClick={reset}>Clear all filters</button>
        </aside>
        <div>{list.length ? <><div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">{list.slice(0, n).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          {n < list.length && <div className="mt-12 text-center"><button className="btn btn-ghost" onClick={() => setN(n + 9)}>Load more ({list.length - n} left)</button></div>}</>
          : <div className="rounded-2xl bg-white p-10 text-center"><p className="serif text-2xl">No perfumes match these filters</p><button className="btn mt-5" onClick={reset}>Clear filters</button></div>}</div>
      </div>
    </div>
  );
}
