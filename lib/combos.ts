// Celeb's Choice page: ready-made 2 x 50 ml combos of our own fragrances.
// No celebrity names or photos are used. To add them later, fill `celeb` (needs the person's permission / legal check).
import type { VariantId } from "./products";
export type Combo = { id: string; title: string; blurb: string; items: { slug: string; v: VariantId }[]; celeb?: string };
export const COMBOS: Combo[] = [
  { id: "fresh-pair", title: "Fresh and bold", blurb: "Aqua Marine + Sport Champion. Clean, cool and easy for the day.", items: [{ slug: "aqua-marine", v: "p50" }, { slug: "sport-champion", v: "p50" }] },
  { id: "oud-night", title: "Oud night out", blurb: "Imperial Oud + Kashmiri Oud. Two deep agarwood blends for the evening.", items: [{ slug: "imperial-oud", v: "p50" }, { slug: "kashmiri-oud", v: "p50" }] },
  { id: "sweet-rose", title: "Sweet and rosy", blurb: "Persian Rose + Hulwah. Rose, dates and amber for gifting.", items: [{ slug: "persian-rose", v: "p50" }, { slug: "hulwah", v: "p50" }] },
  { id: "wedding-musk", title: "Wedding musk", blurb: "Golden Musk + Kesar Chandan. Rich, festive and long lasting.", items: [{ slug: "golden-musk", v: "p50" }, { slug: "kesar-chandan", v: "p50" }] },
  { id: "office-pair", title: "Office pair", blurb: "Premium Cedar + Lavender. Quiet, clean and professional.", items: [{ slug: "premium-cedar", v: "p50" }, { slug: "lavender", v: "p50" }] },
  { id: "date-night", title: "Date night duo", blurb: "Tobacco Amber + Vanilla Royale. Warm, close and sweet.", items: [{ slug: "tobacco-amber", v: "p50" }, { slug: "vanilla-royale", v: "p50" }] },
];
