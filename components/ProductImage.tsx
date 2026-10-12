import Bottle from "./Bottle";
import Photo from "./Photo";
import { Product } from "@/lib/products";
export default function ProductImage({ p }: { p: Product }) {
  return <Photo src={`/products/${p.slug}.jpg`} alt={`${p.name} by ${p.brand}`} fallback={<><div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 50% 60%, ${p.c1}, transparent 70%)` }} /><Bottle c1={p.c1} c2={p.c2} id={`img-${p.slug}`} className="absolute inset-0 m-auto h-3/4" /></>} />;
}
