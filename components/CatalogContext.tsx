"use client";
import { createContext, useContext, useMemo, ReactNode } from "react";
import { Catalog, Product, brandsOf, findProduct } from "@/lib/products";
type Ctx = { products: Product[]; samples: Product[]; brands: string[]; getProduct: (slug: string) => Product | undefined };
const C = createContext<Ctx | null>(null);
export const useCatalog = () => useContext(C)!;
export default function CatalogProvider({ catalog, children }: { catalog: Catalog; children: ReactNode }) {
  const value = useMemo<Ctx>(() => ({ products: catalog.products, samples: catalog.samples, brands: brandsOf(catalog), getProduct: (slug) => findProduct(catalog, slug) }), [catalog]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
