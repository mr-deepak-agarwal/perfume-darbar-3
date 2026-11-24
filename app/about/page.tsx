import Link from "next/link";
import Art from "@/components/Art";
import { getCatalog } from "@/lib/catalog";
export const metadata = { title: "Our story | Perfume Darbar" };
export default async function About() {
  const { products } = await getCatalog();
  const p = products.find((x) => x.slug === "imperial-oud");
  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-white"><Art ratio="wide" list={(["p30", "p50", "p100"] as const).map((v) => [p, v])} bg={["#ffffff", "#e9d8cf"]} label="Perfume Darbar in three sizes" /></div>
      <h1 className="text-5xl">Perfume made slowly, on purpose</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink/75">Perfume Darbar is a perfume house serving customers across India. Choose from 100 fragrances, each available in 30, 50 and 100 ml.</p>
      <p className="mt-5 text-lg leading-relaxed text-ink/75">Start with a 30 ml, find the family you keep reaching for, then step up to a bigger bottle. Clear notes, honest descriptions and fragrances that last on skin.</p>
      <Link href="/shop" className="btn mt-8">Shop all perfumes</Link>
    </div>
  );
}
