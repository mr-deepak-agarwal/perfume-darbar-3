"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useCatalog } from "./CatalogContext";
type Line = { slug: string; qty: number };
type Ctx = { lines: Line[]; ready: boolean; add: (s: string, q?: number) => void; setQty: (s: string, q: number) => void; remove: (s: string) => void; clear: () => void; count: number; subtotal: number };
const C = createContext<Ctx | null>(null);
export const useCart = () => useContext(C)!;
const KEY = "cart";
// Drop anything stale or tampered with in localStorage (unknown slug, bad qty) so pages never crash on getProduct(...)!
const clean = (raw: unknown, getProduct: (s: string) => unknown): Line[] =>
  Array.isArray(raw)
    ? raw.filter((l): l is Line => !!l && typeof l.slug === "string" && Number.isInteger(l.qty) && l.qty > 0 && !!getProduct(l.slug)).map((l) => ({ slug: l.slug, qty: Math.min(l.qty, 20) }))
    : [];
export default function CartProvider({ children }: { children: ReactNode }) {
  const { getProduct } = useCatalog();
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setLines(clean(JSON.parse(localStorage.getItem(KEY) || "[]"), getProduct)); } catch {}
    setReady(true);
  }, [getProduct]);
  // Keep tabs in sync
  useEffect(() => {
    const on = (e: StorageEvent) => { if (e.key === KEY) { try { setLines(clean(JSON.parse(e.newValue || "[]"), getProduct)); } catch {} } };
    window.addEventListener("storage", on);
    return () => window.removeEventListener("storage", on);
  }, [getProduct]);
  // Functional updates so rapid clicks never overwrite each other
  const update = useCallback((fn: (l: Line[]) => Line[]) => {
    setLines((prev) => { const next = fn(prev); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {} return next; });
  }, []);
  const add = useCallback((slug: string, q = 1) => update((l) => l.some((x) => x.slug === slug) ? l.map((x) => (x.slug === slug ? { ...x, qty: Math.min(x.qty + q, 20) } : x)) : [...l, { slug, qty: Math.min(q, 20) }]), [update]);
  const setQty = useCallback((slug: string, q: number) => update((l) => (q <= 0 ? l.filter((x) => x.slug !== slug) : l.map((x) => (x.slug === slug ? { ...x, qty: Math.min(q, 20) } : x)))), [update]);
  const remove = useCallback((slug: string) => update((l) => l.filter((x) => x.slug !== slug)), [update]);
  const clear = useCallback(() => update(() => []), [update]);
  const value = useMemo(() => ({
    lines, ready, add, setQty, remove, clear,
    count: lines.reduce((a, l) => a + l.qty, 0),
    subtotal: lines.reduce((a, l) => a + l.qty * (getProduct(l.slug)?.price ?? 0), 0),
  }), [lines, ready, add, setQty, remove, clear, getProduct]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
