"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
const W = createContext<{ ids: string[]; toggle: (s: string) => void; has: (s: string) => boolean } | null>(null);
export const useWishlist = () => useContext(W)!;
export default function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { try { setIds(JSON.parse(localStorage.getItem("wishlist") || "[]")); } catch {} }, []);
  const toggle = (s: string) => { const n = ids.includes(s) ? ids.filter((x) => x !== s) : [...ids, s]; setIds(n); try { localStorage.setItem("wishlist", JSON.stringify(n)); } catch {} };
  return <W.Provider value={{ ids, toggle, has: (s) => ids.includes(s) }}>{children}</W.Provider>;
}
