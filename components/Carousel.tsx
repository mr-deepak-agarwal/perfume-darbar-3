"use client";
import { ReactNode, useRef } from "react";
export default function Carousel({ children }: { children: ReactNode }) {
  const r = useRef<HTMLDivElement>(null);
  const go = (d: number) => r.current?.scrollBy({ left: d * r.current.clientWidth * 0.8, behavior: "smooth" });
  const btn = "absolute top-1/3 z-10 hidden h-11 w-11 place-items-center rounded-full border border-gold bg-plum text-2xl text-gold md:grid";
  return (
    <div className="relative">
      <button aria-label="Previous" onClick={() => go(-1)} className={`${btn} -left-4`}>‹</button>
      <div ref={r} className="flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none]">{children}</div>
      <button aria-label="Next" onClick={() => go(1)} className={`${btn} -right-4`}>›</button>
    </div>
  );
}
