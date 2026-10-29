import type { Product } from "./products";
export const FREE_SHIP = 3999;
export const SHIP_FEE = 149;
export const PREPAID_OFF = 50;
export const COD_MAX = 10000;
export const OFFERS = ["BUY 2 GET 1 FREE ON PERFUMES", "PAY ONLINE AND SAVE ₹50", "FREE SHIPPING ABOVE ₹3,999", "SAMPLES FROM ₹149", "FREE SAMPLE WITH EVERY ORDER"];
export function bundleInfo(lines: { slug: string; qty: number }[], getProduct: (slug: string) => Product | undefined) {
  const units: number[] = [];
  for (const l of lines) {
    const p = getProduct(l.slug);
    if (!p || p.tag === "Sample" || p.category === "Gift Set") continue;
    for (let i = 0; i < l.qty; i++) units.push(p.price);
  }
  units.sort((a, b) => a - b);
  const free = Math.floor(units.length / 3);
  return { eligible: units.length, free, discount: units.slice(0, free).reduce((a, b) => a + b, 0), needed: (3 - (units.length % 3)) % 3 };
}
