"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getProduct, sizePrice } from "@/lib/products";
type Line = { slug: string; size: number; qty: number };
type Ctx = { lines: Line[]; add: (s: string, size?: number, q?: number) => void; setQty: (s: string, size: number, q: number) => void; clear: () => void; count: number; subtotal: number; open: boolean; setOpen: (o: boolean) => void };
const C = createContext<Ctx | null>(null);
export const useCart = () => useContext(C)!;
export default function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => { try { setLines(JSON.parse(localStorage.getItem("perfume-darbar-bag") || "[]")); } catch {} }, []);
  const save = (l: Line[]) => { setLines(l); try { localStorage.setItem("perfume-darbar-bag", JSON.stringify(l)); } catch {} };
  const same = (l: Line, s: string, z: number) => l.slug === s && l.size === z;
  const add = (slug: string, size = 50, q = 1) => { save(lines.some((l) => same(l, slug, size)) ? lines.map((l) => (same(l, slug, size) ? { ...l, qty: l.qty + q } : l)) : [...lines, { slug, size, qty: q }]); setOpen(true); };
  const setQty = (slug: string, size: number, q: number) => save(q <= 0 ? lines.filter((l) => !same(l, slug, size)) : lines.map((l) => (same(l, slug, size) ? { ...l, qty: q } : l)));
  const clear = () => save([]);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => a + l.qty * sizePrice(getProduct(l.slug)!, l.size), 0);
  return <C.Provider value={{ lines, add, setQty, clear, count, subtotal, open, setOpen }}>{children}</C.Provider>;
}
