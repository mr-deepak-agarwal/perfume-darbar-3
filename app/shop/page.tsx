import Shop from "./Shop";
export const metadata = { title: "Shop all scents | Perfume Darbar" };
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return <Shop key={JSON.stringify(sp)} init={{ c: sp.c, o: sp.o, g: sp.g, q: sp.q }} />;
}
