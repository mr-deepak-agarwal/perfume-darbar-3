import Bottle from "./Bottle";
import Photo from "./Photo";
import { Product, VariantId, DEFAULT_VARIANT, variantOf, specOf, tintOf } from "@/lib/products";
import { inspiredOf } from "@/lib/inspired";
import { USE_PRODUCT_PHOTOS } from "@/lib/site";

// Product picture. Order: Supabase image_url / real photo (when USE_PRODUCT_PHOTOS) -> clean-label bottle drawing.
// When the fragrance has an "Original vs Inspired" entry (lib/inspired.ts), shows the original bottle beside ours.
export default function ProductImage({ p, vid = DEFAULT_VARIANT, pair = true }: { p: Product; vid?: VariantId; pair?: boolean }) {
  const v = variantOf(p, vid);
  const art = <Bottle b={specOf(p, v)} bg={tintOf(p)} />;
  const ins = pair ? inspiredOf(p.slug) : undefined;
  if (ins) {
    return (
      <div className="absolute inset-0 grid grid-cols-2" style={{ background: tintOf(p)[1] }}>
        <figure className="relative"><img src={ins.image} alt={`${ins.brand} ${ins.name}, the original`} className="absolute inset-0 h-full w-full object-contain p-2" /><figcaption className="absolute inset-x-0 bottom-2 text-center text-[10px] font-semibold uppercase tracking-wider text-ink/70">Original</figcaption></figure>
        <figure className="relative"><Bottle b={specOf(p, v)} bg={tintOf(p)} /><figcaption className="absolute inset-x-0 bottom-2 text-center text-[10px] font-semibold uppercase tracking-wider text-ink/70">Inspired</figcaption></figure>
      </div>
    );
  }
  const src = p.image ?? (USE_PRODUCT_PHOTOS ? `/products/${p.slug}.jpg` : undefined);
  if (!src) return art;
  return <Photo src={src} alt={`${p.name} by ${p.brand}`} fallback={art} />;
}
