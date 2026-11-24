"use client";
import { useState } from "react";
import ProductImage from "./ProductImage";
import { Product, VariantId, DEFAULT_VARIANT } from "@/lib/products";
import { inspiredOf } from "@/lib/inspired";

// Views: the bottle photo in the chosen size and the "original vs inspired" pair when one exists.
export default function Gallery({ p, vid = DEFAULT_VARIANT }: { p: Product; vid?: VariantId }) {
  const extra: string[] = [];
  const [i, setI] = useState(0);
  const hasPair = !!inspiredOf(p.slug);
  // view 0 = bottle alone (follows the size dropdown); view 1 = original vs inspired (if any); then real photos
  const views: React.ReactNode[] = [<ProductImage key="a" p={p} vid={vid} pair={false} />];
  if (hasPair) views.push(<ProductImage key="b" p={p} vid={vid} pair />);
  extra.forEach((s, k) => views.push(<img key={s} src={s} alt={`${p.name} view ${k + 2}`} className="absolute inset-0 h-full w-full object-cover" />));
  const count = views.length;
  const idx = Math.min(i, count - 1);
  const arrow = "absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl shadow";
  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row md:items-start">
      {count > 1 && <div className="flex gap-3 md:flex-col">{views.map((v, k) => <button key={k} onClick={() => setI(k)} aria-label={`View ${k + 1}`} className={`relative h-20 w-16 overflow-hidden rounded-md bg-white ${idx === k ? "ring-2 ring-gold ring-offset-2 ring-offset-mist" : ""}`}>{v}</button>)}</div>}
      <div className="arch-frame min-w-0 flex-1"><div className="arch relative aspect-[4/5] overflow-hidden bg-white">{views[idx]}
        {p.tag && <span className="absolute bottom-4 left-4 z-10 rounded-sm bg-plum px-3 py-1 text-xs text-gold">{p.tag}</span>}
        {count > 1 && <><button aria-label="Previous image" onClick={() => setI((idx - 1 + count) % count)} className={`${arrow} left-3`}>‹</button><button aria-label="Next image" onClick={() => setI((idx + 1) % count)} className={`${arrow} right-3`}>›</button></>}</div></div>
    </div>
  );
}
