"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { DEFAULT_VARIANT, variantOf } from "@/lib/products";
import { useCatalog } from "./CatalogContext";
// A cart line is one fragrance in one size/format.
type Line = { slug: string; v: string; qty: number };
type Ctx = { lines: Line[]; ready: boolean; add: (slug: string, v?: string, q?: number) => void; setQty: (slug: string, v: string, q: number) => void; remove: (slug: string, v: string) => void; clear: () => void; count: number; subtotal: number; priceOfLine: (l: Line) => number };
const C = createContext<Ctx | null>(null);
export const useCart = () => useContext(C)!;
const KEY = "cart-v2";
const MAX = 20;
export default function CartProvider({ children }: { children: ReactNode }) {
  const { getProduct } = useCatalog();
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  // Drop anything stale or tampered with in localStorage (unknown fragrance or size, bad qty) so pages never crash.
  const clean = useCallback((raw: unknown): Line[] => {
    if (!Array.isArray(raw)) return [];
    const out: Line[] = [];
    for (const l of raw) {
      const p = l && typeof l.slug === "string" ? getProduct(l.slug) : undefined;
      if (!p || !Number.isInteger(l.qty) || l.qty < 1 || !p.variants.some((x) => x.id === l.v)) continue;
      const i = out.findIndex((o) => o.slug === l.slug && o.v === l.v);
      if (i >= 0) out[i] = { ...out[i], qty: Math.min(out[i].qty + l.qty, MAX) }; else out.push({ slug: l.slug, v: l.v, qty: Math.min(l.qty, MAX) });
    }
    return out;
  }, [getProduct]);
  useEffect(() => { try { setLines(clean(JSON.parse(localStorage.getItem(KEY) || "[]"))); } catch {} setReady(true); }, [clean]);
  useEffect(() => {
    const on = (e: StorageEvent) => { if (e.key === KEY) { try { setLines(clean(JSON.parse(e.newValue || "[]"))); } catch {} } };
    window.addEventListener("storage", on);
    return () => window.removeEventListener("storage", on);
  }, [clean]);
  // Functional updates so rapid clicks never overwrite each other
  const update = useCallback((fn: (l: Line[]) => Line[]) => {
    setLines((prev) => { const next = fn(prev); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {} return next; });
  }, []);
  const same = (a: Line, slug: string, v: string) => a.slug === slug && a.v === v;
  const add = useCallback((slug: string, v: string = DEFAULT_VARIANT, q = 1) => update((l) => l.some((x) => same(x, slug, v)) ? l.map((x) => (same(x, slug, v) ? { ...x, qty: Math.min(x.qty + q, MAX) } : x)) : [...l, { slug, v, qty: Math.min(q, MAX) }]), [update]);
  const setQty = useCallback((slug: string, v: string, q: number) => update((l) => (q <= 0 ? l.filter((x) => !same(x, slug, v)) : l.map((x) => (same(x, slug, v) ? { ...x, qty: Math.min(q, MAX) } : x)))), [update]);
  const remove = useCallback((slug: string, v: string) => update((l) => l.filter((x) => !same(x, slug, v))), [update]);
  const clear = useCallback(() => update(() => []), [update]);
  const priceOfLine = useCallback((l: Line) => { const p = getProduct(l.slug); return p ? variantOf(p, l.v).price : 0; }, [getProduct]);
  const value = useMemo(() => ({
    lines, ready, add, setQty, remove, clear, priceOfLine,
    count: lines.reduce((a, l) => a + l.qty, 0),
    subtotal: lines.reduce((a, l) => a + l.qty * priceOfLine(l), 0),
  }), [lines, ready, add, setQty, remove, clear, priceOfLine]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
