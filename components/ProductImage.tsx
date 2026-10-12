import Bottle from "./Bottle";
import Photo from "./Photo";
import { Product } from "@/lib/products";
export default function ProductImage({ p }: { p: Product }) {
  return <Photo src={`/products/${p.slug}.jpg`} alt={`${p.name} perfume`} fallback={<Bottle liquid={p.liquid} className="absolute inset-0 m-auto h-4/5" />} />;
}
