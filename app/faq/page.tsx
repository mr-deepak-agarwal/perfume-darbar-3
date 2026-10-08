import Link from "next/link";
import { faqs } from "@/lib/content";
export const metadata = { title: "FAQ | Perfume Darbar" };
export default function Faq() {
  return (<div className="mx-auto max-w-2xl px-5 py-14"><h1 className="text-5xl">Frequently asked questions</h1><div className="mt-8 divide-y divide-line rounded-2xl bg-white">{faqs.map(([q, a]) => <details key={q} className="group px-6 py-5"><summary className="serif flex cursor-pointer list-none justify-between text-lg">{q}<span className="transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 text-ink/70">{a}</p></details>)}</div><p className="mt-8 text-sm">Still stuck? <Link href="/contact" className="font-semibold underline">Contact us</Link></p></div>);
}
