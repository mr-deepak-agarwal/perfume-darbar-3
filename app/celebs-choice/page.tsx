import { getCatalog } from "@/lib/catalog";
import Combos from "./Combos";
export const metadata = { title: "Celeb's Choice | Perfume Darbar", description: "Ready-made 2 x 50 ml combos from Perfume Darbar. Pick a pair, save time, gift with confidence." };
export default async function Page() {
  const { products } = await getCatalog();
  return <Combos products={products} />;
}
