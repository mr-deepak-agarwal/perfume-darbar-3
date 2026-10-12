"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { products } from "@/lib/products";
type Line = { slug: string; qty: number };
type Ctx = { lines: Line[]; add: (s: string, q?: number) => void; setQty: (s: string, q: number) => void; remove: (s: string) => void; clear: () => void; count: number; subtotal: number };
const C = createContext<Ctx | null>(null);
export const useCart = () => useContext(C)!;
export default function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => { try { setLines(JSON.parse(localStorage.getItem("cart") || "[]")); } catch {} }, []);
  const save = (l: Line[]) => { setLines(l); try { localStorage.setItem("cart", JSON.stringify(l)); } catch {} };
  const add = (slug: string, q = 1) => save(lines.some((l) => l.slug === slug) ? lines.map((l) => (l.slug === slug ? { ...l, qty: l.qty + q } : l)) : [...lines, { slug, qty: q }]);
  const setQty = (slug: string, q: number) => save(q <= 0 ? lines.filter((l) => l.slug !== slug) : lines.map((l) => (l.slug === slug ? { ...l, qty: q } : l)));
  const remove = (slug: string) => save(lines.filter((l) => l.slug !== slug));
  const clear = () => save([]);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => a + l.qty * (products.find((p) => p.slug === l.slug)?.price ?? 0), 0);
  return <C.Provider value={{ lines, add, setQty, remove, clear, count, subtotal }}>{children}</C.Provider>;
}
