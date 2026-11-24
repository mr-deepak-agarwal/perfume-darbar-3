import { Scene } from "./Bottle";
import { Product, VariantId, specOf, variantOf, scentBg } from "@/lib/products";
type P = Omit<React.ComponentProps<typeof Scene>, "items">;
// Pre-composed bottle scenes for banners and tiles (replaces the old photo mockups).
export default function Art({ list, ...rest }: { list: [Product | undefined, VariantId][] } & P) {
  const items = list.flatMap(([p, v]) => (p ? [specOf(p, variantOf(p, v))] : []));
  return items.length ? <Scene items={items} {...rest} /> : null;
}
export const tint = (p?: Product): [string, string] => ["#ffffff", p?.scent ? scentBg[p.scent] : "#f1dcd6"];

// Journal cover: bottle scene picked per article.
export function BlogCover({ slug, products, bg }: { slug: string; products: Product[]; bg: string }) {
  const by = (s: string) => products.find((p) => p.slug === s);
  const list: [Product | undefined, VariantId][] = slug === "attar-vs-edp" ? [[by("kashmiri-oud"), "p30"], [by("imperial-oud"), "p50"]]
    : slug === "gifting-perfume" ? [[by("hulwah"), "p30"], [by("golden-musk"), "p50"], [by("persian-rose"), "p30"]]
    : slug === "understanding-scent-families" ? [[by("aqua-marine"), "p50"], [by("persian-rose"), "p50"], [by("imperial-oud"), "p50"]]
    : [[by("silk-touch"), "p50"], [by("white-musk"), "p30"]];
  return <Art ratio="wide" list={list} bg={["#ffffff", bg]} label="Perfume Darbar bottles" />;
}
