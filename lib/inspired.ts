// "Original vs Inspired" pictures (client comment 3). Add a row per fragrance to show the original bottle next to ours.
// slug -> { brand, name, image }. `image` is a path in /public (e.g. "/inspired/oud-wood.jpg") or a full URL.
// Left EMPTY on purpose: the mapping (which fragrance is inspired by which original) has to come from the client, and
// using another brand's name or bottle photo needs a legal check first (trademark / passing-off). Products without a row
// just show our bottle, so nothing breaks while this is empty.
export type Inspired = { brand: string; name: string; image: string };
export const INSPIRED: Record<string, Inspired> = {
  // "imperial-oud": { brand: "Brand", name: "Original name", image: "/inspired/imperial-oud.jpg" },
};
export const inspiredOf = (slug: string) => INSPIRED[slug];
