import Link from "next/link";
import SampleCard from "@/components/SampleCard";
import { samples } from "@/lib/products";
export const metadata = { title: "Order samples | Perfume Darbar" };
const perks = [["Premium quality", "The same juice as the full bottle"], ["Pocket friendly", "From ₹149 for 5 ml"], ["100% authentic", "Filled from sealed stock"], ["Travel ready", "Slim spray fits any bag"]];
export default function Samples() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="rounded-3xl p-8 md:p-14" style={{ background: "linear-gradient(135deg,#d8cbf2,#f6c9d9)" }}>
        <h1 className="text-5xl md:text-6xl">Try before you commit</h1>
        <p className="mt-3 max-w-lg text-lg text-ink/75">Luxury scents made for you. 5 ml travel sprays starting from ₹149, so you can find your signature scent first.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">{perks.map(([t, d]) => <div key={t} className="rounded-2xl bg-white/70 p-4"><b className="block text-sm">{t}</b><span className="text-xs text-ink/65">{d}</span></div>)}</div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">{samples.map((p) => <SampleCard key={p.slug} p={p} />)}</div>
      <div className="mt-14 rounded-3xl bg-ink p-8 text-center text-white md:p-12"><h2 className="text-3xl md:text-4xl">Want five at once?</h2><p className="mx-auto mt-2 max-w-md text-white/70">The Discovery Set has five 10 ml sprays of our bestsellers in a keepsake box.</p><Link href="/product/discovery-set" className="btn mt-6 bg-amber hover:bg-amber/80">View the Discovery Set</Link></div>
    </div>
  );
}
