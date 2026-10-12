"use client";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
const qs = [
  { q: "Pick a perfect evening", o: [["Rooftop with friends", "Fresh Notes"], ["Dessert date", "Sweet"], ["A wedding night", "Oud"], ["Bonfire by the river", "Woody"], ["Street food and chai", "Spicy"]] },
  { q: "Your weekend colour", o: [["Mint green", "Fresh Notes"], ["Pink", "Sweet"], ["Deep purple", "Oud"], ["Sandstone", "Woody"], ["Saffron orange", "Spicy"]] },
  { q: "You want people to think", o: [["Clean and effortless", "Fresh Notes"], ["Soft and charming", "Sweet"], ["Rich and regal", "Oud"], ["Calm and grounded", "Woody"], ["Bold and warm", "Spicy"]] },
];
export default function Quiz() {
  const [i, setI] = useState(0);
  const [a, setA] = useState<string[]>([]);
  const done = a.length === qs.length;
  const top = done ? Object.entries(a.reduce<Record<string, number>>((m, x) => ({ ...m, [x]: (m[x] || 0) + 1 }), {})).sort((x, y) => y[1] - x[1])[0][0] : "";
  const match = products.filter((p) => p.category === top).sort((x, y) => y.rating - x.rating);
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      {!done ? (<><p className="font-semibold">Question {i + 1} of {qs.length}</p><h1 className="mt-2 text-6xl">{qs[i].q}</h1>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">{qs[i].o.map(([l, m]) => <button key={l} className="btn btn-alt !justify-start !py-5 text-left text-lg" onClick={() => { setA([...a, m]); setI(i + 1); }}>{l}</button>)}</div></>)
      : (<><h1 className="text-6xl">Your match: {top}.</h1><p className="mt-3">Here are your matches, best fit first.</p>
        <div className="mt-8 grid grid-cols-2 gap-5">{match.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        <button className="btn btn-alt mt-10" onClick={() => { setA([]); setI(0); }}>Retake quiz</button> <Link href="/shop" className="ml-3 font-semibold underline">Browse everything</Link></>)}
    </div>
  );
}
