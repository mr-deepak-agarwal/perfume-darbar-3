import Link from "next/link";
import { faqs } from "@/lib/content";
export const metadata = { title: "FAQ | Perfume Darbar" };
export default function Faq() {
  return (<div className="mx-auto max-w-3xl px-5 py-14"><h1 className="text-6xl">Questions, answered</h1><div className="mt-8 border-t-2 border-ink">{faqs.map(([q, a]) => <details key={q} className="group border-b-2 border-ink py-5"><summary className="display flex cursor-pointer list-none justify-between text-2xl">{q}<span className="transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-xl">{a}</p></details>)}</div><p className="mt-8">Still stuck? <Link href="/contact" className="font-bold underline">Contact us</Link></p></div>);
}
