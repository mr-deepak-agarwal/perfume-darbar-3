import Bottle from "./Bottle";
import Photo from "./Photo";
import { scentBg, scentColors, Scent } from "@/lib/products";
export default function ScentIcon({ s, size = "h-24 w-24 md:h-32 md:w-32" }: { s: Scent; size?: string }) {
  const [c1, c2] = scentColors[s];
  return (
    <div className={`relative mx-auto grid place-items-center overflow-hidden rounded-full ${size}`} style={{ background: scentBg[s] }}>
      <Photo src={`/categories/${s.toLowerCase().replace(/ /g, "-")}.jpg`} alt={s} fallback={<Bottle c1={c1} c2={c2} id={`si-${s}`} className="h-4/5" />} />
    </div>
  );
}
