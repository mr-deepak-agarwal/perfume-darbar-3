"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
export default function Photo({ src, alt, fallback, className = "" }: { src: string; alt: string; fallback?: ReactNode; className?: string }) {
  const [bad, setBad] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => { const i = ref.current; if (i && i.complete && i.naturalWidth === 0) setBad(true); }, []);
  if (bad) return <>{fallback}</>;
  return <img ref={ref} src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={`absolute inset-0 h-full w-full object-cover ${className}`} />;
}
