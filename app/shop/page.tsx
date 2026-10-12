import Shop from "./Shop";
export const metadata = { title: "Shop all perfumes | Perfume Darbar" };
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return <Shop key={JSON.stringify(sp)} init={{ s: sp.s, g: sp.g, o: sp.o, b: sp.b, k: sp.k, q: sp.q }} />;
}
