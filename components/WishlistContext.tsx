"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
const W = createContext<{ ids: string[]; toggle: (s: string) => void; has: (s: string) => boolean } | null>(null);
export const useWishlist = () => useContext(W)!;
export default function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { try { const v = JSON.parse(localStorage.getItem("wishlist") || "[]"); if (Array.isArray(v)) setIds(v.filter((x) => typeof x === "string")); } catch {} }, []);
  const toggle = useCallback((s: string) => setIds((prev) => { const n = prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]; try { localStorage.setItem("wishlist", JSON.stringify(n)); } catch {} return n; }), []);
  const value = useMemo(() => ({ ids, toggle, has: (s: string) => ids.includes(s) }), [ids, toggle]);
  return <W.Provider value={value}>{children}</W.Provider>;
}
