import Link from "next/link";
export default function NotFound() {
  return (<div className="mx-auto max-w-xl px-5 py-28 text-center"><h1 className="text-6xl">Page not found</h1><p className="mt-3 text-ink/60">That scent seems to have evaporated.</p><Link href="/shop" className="btn mt-8">Back to shop</Link></div>);
}
