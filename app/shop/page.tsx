import Shop from "./Shop";
export const metadata = { title: "Shop all fragrances | Perfume Darbar", description: "100 fragrances as pure oils from ₹100 and perfumes from ₹350." };
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return <Shop key={JSON.stringify(sp)} init={{ s: sp.s, g: sp.g, o: sp.o, q: sp.q }} />;
}
