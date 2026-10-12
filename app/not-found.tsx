import Link from "next/link";
export default function NotFound() {
  return (<div className="mx-auto max-w-xl px-5 py-28 text-center"><h1 className="text-7xl">404</h1><p className="mt-3 text-lg">That scent seems to have evaporated.</p><Link href="/shop" className="btn mt-8">Back to shop</Link></div>);
}
