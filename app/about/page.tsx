import Link from "next/link";
export const metadata = { title: "Our story | Perfume Darbar" };
export default function About() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="text-5xl">Perfume made slowly, on purpose</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink/75">Perfume Darbar started in a small Jaipur studio with one idea: Indian raw materials deserve better than being exported and bottled elsewhere. We work with growers of rose, jasmine and saffron, blend in batches of 500 bottles, and age every batch for six weeks before it ships.</p>
      <p className="mt-5 text-lg leading-relaxed text-ink/75">No celebrity names, no filler. Just clear notes, honest descriptions and perfumes that last on skin.</p>
      <Link href="/shop" className="btn mt-8">Shop all perfumes</Link>
    </div>
  );
}
