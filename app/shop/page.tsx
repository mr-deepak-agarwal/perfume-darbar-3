import Shop from "./Shop";
export const metadata = { title: "Shop all perfumes | Perfume Darbar" };
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return <Shop key={JSON.stringify(sp)} init={{ c: sp.c, b: sp.b, q: sp.q, f: sp.f, k: sp.k }} />;
}
