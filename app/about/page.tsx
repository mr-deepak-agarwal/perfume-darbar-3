import Link from "next/link";
import Photo from "@/components/Photo";
export const metadata = { title: "Our story | Perfume Darbar" };
export default function About() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-white"><Photo src="/about.jpg" alt="The Perfume Darbar collection" /></div>
      <h1 className="text-5xl">Perfume made slowly, on purpose</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink/75">Perfume Darbar is a perfume and attar house in Ponda, Goa. Choose from 100 fragrances, each available as an alcohol-free pure oil in 6 ml and 12 ml, and as a perfume in 30, 50 and 100 ml.</p>
      <p className="mt-5 text-lg leading-relaxed text-ink/75">Start small with a pure oil, find the family you keep reaching for, then step up to a bigger bottle. Clear notes, honest descriptions and fragrances that last on skin.</p>
      <Link href="/shop" className="btn mt-8">Shop all perfumes</Link>
    </div>
  );
}
