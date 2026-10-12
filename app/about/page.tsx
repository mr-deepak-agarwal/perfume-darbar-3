import Link from "next/link";
export const metadata = { title: "Our story | Perfume Darbar" };
export default function About() {
  return (<div className="mx-auto max-w-3xl px-5 py-20"><h1 className="text-6xl md:text-7xl">Perfume shouldn't need a dress code.</h1><p className="mt-8 text-xl leading-relaxed">Perfume Darbar began with a simple annoyance: good perfume was either expensive or boring. We make everyday scents named for the moment you'd wear them, priced under ₹5,500, and blended in small batches in India.</p><p className="mt-5 text-xl leading-relaxed">Scents are sorted by family and occasion, so you can shop by how you want to feel. Every bottle comes in 30, 50 and 100 ml, so you can try before you commit.</p><Link href="/shop" className="btn mt-8">Shop all scents</Link></div>);
}
