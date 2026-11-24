import { Product, VariantId, scentBg } from "@/lib/products";
import { photoOf } from "./ProductImage";

// Banner / tile pictures built from the real product photos (scripts/make_photos.py).
// ratio "tall": the first photo fills the frame. ratio "wide": up to `max` photos side by side
// (align "right" keeps the left of the banner free for text).
type Props = { list: [Product | undefined, VariantId][]; ratio?: "tall" | "wide"; align?: "center" | "right"; max?: number; bg?: [string, string]; floor?: string; label?: string; className?: string };
export default function Art({ list, ratio = "tall", align = "center", max, bg = ["#2a1a14", "#120a07"], label = "Perfume Darbar bottles" }: Props) {
  const items = list.flatMap(([p, v]) => (p ? [{ p, v }] : []));
  if (!items.length) return null;
  const n = ratio === "tall" ? 1 : Math.min(items.length, max ?? (align === "right" ? 2 : 3));
  const shown = items.slice(0, n);
  return (
    <div className={`absolute inset-0 flex ${align === "right" ? "justify-end" : ""}`} style={{ background: `linear-gradient(${bg[0]}, ${bg[1]})` }} role="img" aria-label={label}>
      <div className={`flex h-full ${align === "right" ? "w-[62%]" : "w-full"}`}>
        {shown.map(({ p, v }, i) => <img key={i} src={photoOf(p.slug, v)} alt={`${p.name} ${v}`} loading="lazy" className="h-full min-w-0 flex-1 object-cover" />)}
      </div>
      {align === "right" && <div className="pointer-events-none absolute inset-y-0 left-[30%] w-[14%] bg-gradient-to-r from-[#120a07] to-transparent" />}
    </div>
  );
}
export const tint = (p?: Product): [string, string] => ["#ffffff", p?.scent ? scentBg[p.scent] : "#f1dcd6"];

// Journal cover: bottle photos picked per article.
export function BlogCover({ slug, products, bg }: { slug: string; products: Product[]; bg: string }) {
  const by = (s: string) => products.find((p) => p.slug === s);
  const list: [Product | undefined, VariantId][] = slug === "attar-vs-edp" ? [[by("kashmiri-oud"), "p30"], [by("imperial-oud"), "p50"]]
    : slug === "gifting-perfume" ? [[by("hulwah"), "p30"], [by("golden-musk"), "p50"], [by("persian-rose"), "p100"]]
    : slug === "understanding-scent-families" ? [[by("aqua-marine"), "p50"], [by("persian-rose"), "p50"], [by("imperial-oud"), "p50"]]
    : [[by("silk-touch"), "p50"], [by("white-musk"), "p30"]];
  return <Art ratio="wide" list={list} bg={["#ffffff", bg]} label="Perfume Darbar bottles" />;
}
