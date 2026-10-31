"use client";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { scents, occasions, priceBands, Product } from "@/lib/products";
import { useCatalog } from "@/components/CatalogContext";

type Key = "g" | "s" | "o" | "b" | "c";
const collectionTests: [string, (p: Product) => boolean][] = [
  ["Oud", (p) => /oud/i.test(`${p.name} ${p.top} ${p.heart} ${p.base}`)],
  ["Musk", (p) => /musk/i.test(`${p.name} ${p.base}`)],
  ["Vanilla", (p) => /vanilla/i.test(`${p.name} ${p.base}`)],
  ["Best value", (p) => p.price <= 500],
  ["Premium", (p) => p.price >= 800],
];
const bands = priceBands.filter((b) => b[0]);
const sorts = [["pop", "Popularity"], ["low", "Price: low to high"], ["high", "Price: high to low"], ["rating", "Top rated"]];
type F = Record<Key, string>;

function Group({ title, opts, value, set }: { title: string; opts: [string, string, number][]; value: string; set: (v: string) => void }) {
  return (
    <div role="radiogroup" aria-label={title} className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <p className="mb-3 text-sm font-semibold text-ink">{title}</p>
      <div className="space-y-0.5">
        {opts.map(([v, l, n]) => {
          const on = value === v;
          return (
            <button key={v} type="button" role="radio" aria-checked={on} onClick={() => set(on ? "" : v)} disabled={!on && n === 0}
              className={`flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${on ? "bg-plum/10 font-semibold" : "hover:bg-plum/5"} ${!on && n === 0 ? "cursor-not-allowed opacity-40" : ""}`}>
              <span aria-hidden className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${on ? "border-plum bg-plum" : "border-ink/30 bg-white"}`}>{on && <span className="h-1.5 w-1.5 rounded-full bg-white" />}</span>
              <span className="flex-1">{l}</span><span className="text-xs text-ink/45">{n}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Shop({ init }: { init: { s?: string; g?: string; o?: string; q?: string } }) {
  const { products } = useCatalog();
  const [f, setF] = useState<F>({ g: init.g || "", s: init.s || "", o: init.o || "", b: "", c: "" });
  const [sort, setSort] = useState("pop");
  const [n, setN] = useState(9);
  const [sheet, setSheet] = useState(false);
  const ql = (init.q || "").toLowerCase();
  const set = (k: Key) => (v: string) => { setF((x) => ({ ...x, [k]: v })); setN(9); };
  const match = (p: Product, skip?: Key) =>
    (skip === "g" || !f.g || p.category === f.g) && (skip === "s" || !f.s || p.scent === f.s) && (skip === "o" || !f.o || p.occasions.includes(f.o)) &&
    (skip === "b" || !f.b || bands.find((b) => b[0] === f.b)![2](p.price)) && (skip === "c" || !f.c || collectionTests.find((c) => c[0] === f.c)![1](p)) &&
    (!ql || `${p.name} ${p.family} ${p.category} ${p.scent ?? ""} ${p.top} ${p.heart} ${p.base}`.toLowerCase().includes(ql));
  const count = (k: Key, test: (p: Product) => boolean) => products.filter((p) => match(p, k) && test(p)).length;
  const list = products.filter((p) => match(p)).sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : b.sold - a.sold);
  const reset = () => { setF({ g: "", s: "", o: "", b: "", c: "" }); setN(9); };
  const label: Record<Key, (v: string) => string> = { g: (v) => v, s: (v) => v, o: (v) => v, b: (v) => bands.find((b) => b[0] === v)![1], c: (v) => v };
  const active = (Object.keys(f) as Key[]).filter((k) => f[k]);

  const panel = (
    <div>
      <Group title="For" value={f.g} set={set("g")} opts={["Women", "Men", "Unisex"].map((v) => [v, v, count("g", (p) => p.category === v)])} />
      <Group title="Fragrance family" value={f.s} set={set("s")} opts={scents.map((v) => [v, v, count("s", (p) => p.scent === v)])} />
      <Group title="Occasion" value={f.o} set={set("o")} opts={occasions.map((v) => [v, v, count("o", (p) => p.occasions.includes(v))])} />
      <Group title="Price (50 ml)" value={f.b} set={set("b")} opts={bands.map(([v, l, t]) => [v, l, count("b", (p) => t(p.price))])} />
      <Group title="Collection" value={f.c} set={set("c")} opts={collectionTests.map(([v, t]) => [v, v, count("c", t)])} />
    </div>
  );
  const heading = ql ? `Results for "${init.q}"` : f.s ? `${f.s} fragrances` : f.o ? `Fragrances for ${f.o.toLowerCase()}` : f.g ? `${f.g === "Unisex" ? "Unisex" : f.g + "'s"} fragrances` : "All fragrances";

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 md:pb-12">
      <h1 className="text-5xl">{heading}</h1>
      <p className="mt-2 text-ink/60">Pure oils from ₹100 and perfumes from ₹350.</p>
      <div className="mt-8 grid gap-10 md:grid-cols-[15rem_1fr]">
        <aside className="hidden md:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <div className="mb-4 flex items-center justify-between"><p className="text-sm font-semibold">Filters</p>{active.length > 0 && <button className="text-sm underline underline-offset-4" onClick={reset}>Clear all</button>}</div>
            {panel}
          </div>
        </aside>
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-sm text-ink/70"><span className="font-semibold text-ink">{list.length}</span> {list.length === 1 ? "fragrance" : "fragrances"}</p>
            <label className="hidden items-center gap-2 text-sm md:flex"><span className="text-ink/60">Sort by</span>
              <select className="field !w-auto !py-2" value={sort} onChange={(e) => setSort(e.target.value)}>{sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
          </div>
          {active.length > 0 && <div className="mt-4 flex flex-wrap items-center gap-2">
            {active.map((k) => <button key={k} onClick={() => set(k)("")} aria-label={`Remove filter ${label[k](f[k])}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm">{label[k](f[k])}<span aria-hidden className="text-ink/50">×</span></button>)}
            <button className="text-sm underline underline-offset-4 md:hidden" onClick={reset}>Clear all</button>
          </div>}
          {list.length ? <><div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">{list.slice(0, n).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
            {n < list.length && <div className="mt-12 text-center"><button className="btn btn-ghost" onClick={() => setN(n + 9)}>Show more ({list.length - n} left)</button></div>}</>
            : <div className="mt-10 rounded-2xl bg-white p-10 text-center"><p className="serif text-2xl">No fragrances match these filters</p><button className="btn mt-5" onClick={reset}>Clear filters</button><Link href="/quiz" className="ml-4 text-sm underline underline-offset-4">Take the quiz</Link></div>}
        </section>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-line bg-white text-sm font-semibold md:hidden">
        <label className="relative border-r border-line"><span className="block py-4 text-center">Sort by</span><select aria-label="Sort by" value={sort} onChange={(e) => setSort(e.target.value)} className="absolute inset-0 opacity-0">{sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <button className="py-4" onClick={() => setSheet(true)}>Filters{active.length ? ` (${active.length})` : ""}</button>
      </div>
      {sheet && <><div className="fixed inset-0 z-40 bg-ink/50 md:hidden" onClick={() => setSheet(false)} />
        <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-3xl bg-white md:hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4"><h2 className="text-2xl">Filters</h2><button className="text-sm font-semibold underline" onClick={() => setSheet(false)}>Close</button></div>
          <div className="overflow-y-auto px-5 py-4">{panel}</div>
          <div className="grid grid-cols-2 gap-3 border-t border-line p-4"><button className="btn btn-ghost" onClick={reset}>Clear all</button><button className="btn" onClick={() => setSheet(false)}>Show {list.length}</button></div>
        </div></>}
    </div>
  );
}
