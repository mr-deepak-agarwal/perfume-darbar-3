import "server-only";
import { unstable_cache } from "next/cache";
import { supabase } from "./supabaseClient";
import { Catalog, Product, Cat, Scent, staticCatalog, findProduct } from "./products";

// One row of the Supabase `products` table (see supabase/schema.sql).
type Row = {
  slug: string; name: string; brand: string; category: Cat; scent: Scent | null; family: string; conc: string; size: string;
  price: number; mrp: number; tag: string | null; is_sample: boolean; top: string | null; heart: string | null; base: string | null;
  description: string | null; occasions: string[] | null; rating: number | string; review_count: number; sold: number;
  c1: string | null; c2: string | null; image_url: string | null;
};

const fromRow = (r: Row): Product => ({
  slug: r.slug, name: r.name, brand: r.brand, category: r.category, scent: r.scent ?? undefined, family: r.family, conc: r.conc, size: r.size,
  price: r.price, mrp: r.mrp, tag: r.tag ?? undefined, top: r.top ?? "", heart: r.heart ?? "", base: r.base ?? "", desc: r.description ?? "",
  occasions: r.occasions ?? [], rating: Number(r.rating), reviews: r.review_count, sold: r.sold, c1: r.c1 ?? "#5b3a8a", c2: r.c2 ?? "#1a0b2a",
  image: r.image_url ?? undefined,
});

async function load(): Promise<Catalog> {
  if (!supabase) return staticCatalog();
  const { data, error } = await supabase.from("products").select("*").eq("is_active", true).order("position", { ascending: true });
  // Throw on failure so Next keeps serving the last good cached catalog instead of caching a fallback.
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("products table is empty (run supabase/seed.sql)");
  const all = (data as Row[]).map((r) => ({ p: fromRow(r), sample: r.is_sample }));
  return { products: all.filter((x) => !x.sample).map((x) => x.p), samples: all.filter((x) => x.sample).map((x) => x.p), source: "supabase" };
}

const cached = unstable_cache(load, ["catalog-v1"], { revalidate: 60, tags: ["catalog"] });

// Cached for 60 s so page views don't each hit Supabase; edits in Supabase show up within about a minute.
// If Supabase is unreachable and nothing is cached yet, fall back to the built-in catalog so the shop never goes blank.
export async function getCatalog(): Promise<Catalog> {
  try {
    return await cached();
  } catch (e) {
    console.error("[catalog] Supabase unavailable, using built-in catalog:", e instanceof Error ? e.message : e);
    return staticCatalog();
  }
}

export async function getProductBySlug(slug: string) {
  return findProduct(await getCatalog(), slug);
}
