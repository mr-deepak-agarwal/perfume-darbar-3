"use client";
import { createContext, useContext, useMemo, ReactNode } from "react";
import { Catalog, Product, findProduct } from "@/lib/products";
type Ctx = { products: Product[]; getProduct: (slug: string) => Product | undefined };
const C = createContext<Ctx | null>(null);
export const useCatalog = () => useContext(C)!;
export default function CatalogProvider({ catalog, children }: { catalog: Catalog; children: ReactNode }) {
  const value = useMemo<Ctx>(() => ({ products: catalog.products, getProduct: (slug) => findProduct(catalog, slug) }), [catalog]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
