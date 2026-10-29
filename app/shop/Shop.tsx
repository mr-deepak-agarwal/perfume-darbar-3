"use client";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ScentIcon from "@/components/ScentIcon";
import { concs, scents, occasions } from "@/lib/products";
import { useCatalog } from "@/components/CatalogContext";
const bands: [string, string, (n: number) => boolean][] = [["", "Price", () => true], ["u3", "Under ₹3,000", (n) => n < 3000], ["3to6", "₹3,000 to ₹6,000", (n) => n >= 3000 && n <= 6000], ["6to9", "₹6,000 to ₹9,000", (n) => n > 6000 && n <= 9000], ["9p", "Above ₹9,000", (n) => n > 9000]];
const quick = ["Bestseller", "New", "Limited", "Under ₹5,000"];
const sorts = [["pop", "Popularity"], ["low", "Price: low to high"], ["high", "Price: high to low"], ["rating", "Top rated"]];
const cc = (on: boolean) => `shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm ${on ? "border-ink bg-ink text-white" : "border-line bg-white"}`;
function Sel({ v, set, label, opts }: { v: string; set: (s: string) => void; label: string; opts: string[] }) {
  return <select aria-label={label} value={v} onChange={(e) => set(e.target.value)} className={cc(!!v)}><option value="">{label}</option>{opts.map((o) => <option key={o} className="text-ink">{o}</option>)}</select>;
}
export default function Shop({ init }: { init: { s?: string; g?: string; o?: string; b?: string; k?: string; q?: string } }) {
  const { products, brands } = useCatalog();
  const [sc, setSc] = useState(init.s || "");
  const [occ, setOcc] = useState(init.o || "");
  const [gen, setGen] = useState(init.g || "");
  const [brand, setBrand] = useState(init.b || "");
  const [conc, setConc] = useState(init.k || "");
  const [band, setBand] = useState("");
  const [qk, setQk] = useState("");
  const [sort, setSort] = useState("pop");
  const [n, setN] = useState(9);
  const [sheet, setSheet] = useState<"" | "sort" | "filter">("");
  const ql = (init.q || "").toLowerCase();
  const inBand = bands.find((b) => b[0] === band)![2];
  const list = products.filter((p) => (!sc || p.scent === sc) && (!occ || p.occasions.includes(occ)) && (!gen || p.category === gen) && (!brand || p.brand === brand) && (!conc || p.conc === conc) && inBand(p.price) && (!qk || (qk === "Under ₹5,000" ? p.price < 5000 : p.tag === qk)) && (!ql || `${p.name} ${p.brand} ${p.scent ?? ""} ${p.top} ${p.heart} ${p.base}`.toLowerCase().includes(ql)))
    .sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : b.sold - a.sold);
  const reset = () => { setSc(""); setOcc(""); setGen(""); setBrand(""); setConc(""); setBand(""); setQk(""); };
  const on = !!(sc || occ || gen || brand || conc || band);
  const filters = <><Sel v={sc} set={setSc} label="Fragrance family" opts={scents} /><Sel v={occ} set={setOcc} label="Occasion" opts={occasions} /><Sel v={gen} set={setGen} label="Gender" opts={["Women", "Men", "Unisex", "Gift Set"]} /><Sel v={brand} set={setBrand} label="Brand" opts={brands} /><Sel v={conc} set={setConc} label="Type" opts={concs} />
    <select aria-label="Price" value={band} onChange={(e) => setBand(e.target.value)} className={cc(!!band)}>{bands.map(([v, l]) => <option key={v} value={v} className="text-ink">{l}</option>)}</select></>;
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 md:pb-12">
      <h1 className="text-5xl">{ql ? `Results for "${init.q}"` : sc ? `${sc} perfumes` : occ ? `Perfumes for ${occ.toLowerCase()}` : gen ? (gen === "Gift Set" ? "Gift sets" : `${gen}'s perfumes`) : "All perfumes"}</h1>
      <p className="mt-2 text-ink/60">{list.length} products</p>
      <div className="mt-6 flex gap-5 overflow-x-auto pb-2">
        <button onClick={() => setSc("")} className="w-20 shrink-0 text-center"><div className={`mx-auto grid h-16 w-16 place-items-center rounded-full bg-white ${!sc ? "ring-2 ring-plum" : ""}`}><span className="serif text-lg">All</span></div><p className="mt-2 text-xs font-semibold">All</p></button>
        {scents.map((s) => <button key={s} onClick={() => setSc(sc === s ? "" : s)} className="w-20 shrink-0 text-center"><div className={`rounded-full ${sc === s ? "ring-2 ring-plum" : ""}`}><ScentIcon s={s} size="h-16 w-16" /></div><p className="mt-2 text-xs font-semibold">{s}</p></button>)}
      </div>
      <div className="mt-4 hidden items-center justify-between gap-3 md:flex"><div className="flex flex-wrap gap-2">{filters}</div><label className="flex shrink-0 items-center gap-2 text-sm font-semibold">Sort<select className="field !w-auto !py-2" value={sort} onChange={(e) => setSort(e.target.value)}>{sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label></div>
      <div className="mt-4 flex gap-2 overflow-x-auto">{quick.map((q) => <button key={q} className={cc(qk === q)} onClick={() => setQk(qk === q ? "" : q)}>{q}</button>)}{on && <button className="shrink-0 text-sm underline underline-offset-4" onClick={reset}>Clear filters</button>}</div>
      {list.length ? <><div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">{list.slice(0, n).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        {n < list.length && <div className="mt-12 text-center"><button className="btn btn-ghost" onClick={() => setN(n + 9)}>Load more ({list.length - n} left)</button></div>}</>
        : <div className="mt-10 rounded-2xl bg-white p-10 text-center"><p className="serif text-2xl">No perfumes match these filters</p><button className="btn mt-5" onClick={reset}>Clear filters</button><Link href="/quiz" className="ml-4 text-sm underline underline-offset-4">Take the quiz</Link></div>}
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-line bg-white text-sm font-semibold md:hidden"><button className="border-r border-line py-4" onClick={() => setSheet("sort")}>Sort by</button><button className="py-4" onClick={() => setSheet("filter")}>Filter{on ? " (on)" : ""}</button></div>
      {sheet && <><div className="fixed inset-0 z-40 bg-ink/50 md:hidden" onClick={() => setSheet("")} />
        <div className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white p-5 md:hidden"><div className="mb-4 flex justify-between"><h2 className="text-2xl">{sheet === "sort" ? "Sort by" : "Filter"}</h2><button className="text-sm font-semibold underline" onClick={() => setSheet("")}>Done</button></div>
          {sheet === "sort" ? <div className="flex flex-col gap-2">{sorts.map(([v, l]) => <button key={v} className={`${cc(sort === v)} text-left`} onClick={() => { setSort(v); setSheet(""); }}>{l}</button>)}</div> : <div className="flex flex-col gap-3 [&_select]:w-full">{filters}<button className="btn btn-ghost" onClick={reset}>Clear filters</button></div>}</div></>}
    </div>
  );
}
