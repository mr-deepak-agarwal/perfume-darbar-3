"use client";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Bottle from "@/components/Bottle";
import { products, categories, catBg, occasions } from "@/lib/products";
const bands: [string, string, (n: number) => boolean][] = [["", "Price", () => true], ["u3", "Under ₹3,000", (n) => n < 3000], ["3to4", "₹3,000 to ₹4,000", (n) => n >= 3000 && n <= 4000], ["4p", "Above ₹4,000", (n) => n > 4000]];
const quick = ["Bestseller", "New", "Limited", "Under ₹3,500"];
const sorts = [["pop", "Popularity"], ["low", "Price: low to high"], ["high", "Price: high to low"], ["rating", "Top rated"]];
function Sel({ v, set, label, opts }: { v: string; set: (s: string) => void; label: string; opts: string[] }) {
  return <select aria-label={label} value={v} onChange={(e) => set(e.target.value)} data-on={!!v} className="chip shrink-0 cursor-pointer"><option value="">{label}</option>{opts.map((o) => <option key={o}>{o}</option>)}</select>;
}
export default function Shop({ init }: { init: { c?: string; o?: string; g?: string; q?: string } }) {
  const [cat, setCat] = useState(init.c || "");
  const [occ, setOcc] = useState(init.o || "");
  const [gen, setGen] = useState(init.g || "");
  const [band, setBand] = useState("");
  const [qk, setQk] = useState("");
  const [sort, setSort] = useState("pop");
  const [sheet, setSheet] = useState<"" | "sort" | "filter">("");
  const ql = (init.q || "").toLowerCase();
  const inBand = bands.find((b) => b[0] === band)![2];
  const list = products.filter((p) => (!cat || p.category === cat) && (!occ || p.occasions.includes(occ)) && (!gen || p.gender === gen) && inBand(p.price) && (!qk || (qk === "Under ₹3,500" ? p.price < 3500 : p.tag === qk)) && (!ql || `${p.name} ${p.category} ${p.top} ${p.heart} ${p.base}`.toLowerCase().includes(ql)))
    .sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : b.sold - a.sold);
  const reset = () => { setCat(""); setOcc(""); setGen(""); setBand(""); setQk(""); };
  const filters = <><Sel v={cat} set={setCat} label="Fragrance family" opts={categories} /><Sel v={occ} set={setOcc} label="Occasion" opts={occasions} /><Sel v={gen} set={setGen} label="Gender" opts={["Men", "Women", "Unisex"]} />
    <select aria-label="Price" value={band} onChange={(e) => setBand(e.target.value)} data-on={!!band} className="chip shrink-0 cursor-pointer">{bands.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></>;
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:pb-12">
      <h1 className="text-5xl md:text-7xl">{ql ? `Results for "${init.q}"` : cat ? `${cat} perfumes` : occ ? `Perfumes for ${occ.toLowerCase()}` : "All scents"}</h1>
      <p className="mt-2 text-ink/60">{list.length} products</p>
      <div className="noscroll mt-6 flex gap-5 overflow-x-auto pb-2">
        <button onClick={() => setCat("")} className="w-20 shrink-0 text-center"><div className={`mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-ink bg-white ${!cat ? "ring-4 ring-blue" : ""}`}><span className="display text-lg">All</span></div><p className="mt-2 text-xs font-semibold">All</p></button>
        {categories.map((c) => <button key={c} onClick={() => setCat(cat === c ? "" : c)} className="w-20 shrink-0 text-center"><div className={`mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-ink ${cat === c ? "ring-4 ring-blue" : ""}`} style={{ background: catBg[c] }}><Bottle liquid={products.find((p) => p.category === c)!.liquid} className="h-3/4" /></div><p className="mt-2 text-xs font-semibold">{c}</p></button>)}
      </div>
      <div className="mt-4 hidden items-center justify-between gap-3 md:flex"><div className="flex gap-2">{filters}</div><label className="flex items-center gap-2 text-sm font-semibold">Sort<select className="field !w-auto !py-2" value={sort} onChange={(e) => setSort(e.target.value)}>{sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label></div>
      <div className="noscroll mt-4 flex gap-2 overflow-x-auto">{quick.map((q) => <button key={q} className="chip shrink-0" data-on={qk === q} onClick={() => setQk(qk === q ? "" : q)}>{q}</button>)}</div>
      {list.length ? <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        : <div className="mt-10 border-2 border-ink p-10 text-center"><p className="display text-3xl">No perfumes match</p><button className="btn mt-5" onClick={reset}>Clear filters</button><Link href="/quiz" className="ml-3 font-semibold underline">Take the quiz</Link></div>}
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t-2 border-ink bg-white text-sm font-bold md:hidden"><button className="border-r-2 border-ink py-4" onClick={() => setSheet("sort")}>Sort by</button><button className="py-4" onClick={() => setSheet("filter")}>Filter{cat || occ || gen || band ? " (on)" : ""}</button></div>
      {sheet && <><div className="fixed inset-0 z-40 bg-ink/50 md:hidden" onClick={() => setSheet("")} />
        <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-ink bg-white p-5 md:hidden"><div className="mb-4 flex justify-between"><h2 className="text-2xl">{sheet === "sort" ? "Sort by" : "Filter"}</h2><button className="font-semibold underline" onClick={() => setSheet("")}>Done</button></div>
          {sheet === "sort" ? <div className="flex flex-col gap-2">{sorts.map(([v, l]) => <button key={v} className="chip text-left" data-on={sort === v} onClick={() => { setSort(v); setSheet(""); }}>{l}</button>)}</div> : <div className="flex flex-col gap-3 [&_select]:w-full">{filters}<button className="btn btn-alt" onClick={reset}>Clear filters</button></div>}</div></>}
    </div>
  );
}
