import { useId } from "react";

// Clean-label Perfume Darbar bottles, drawn in SVG. Two formats:
//  - Attar (6 / 12 ml): small roller bottle
//  - Perfume (30 / 50 / 100 ml): square flacon
// The label is a cream sticker with a thin gold keyline: monogram, brand, fragrance name, size, type.
// Swap for real photography via USE_PRODUCT_PHOTOS in lib/site.ts once the client supplies bottle photos.

export type BottleSpec = { name: string; size: string; kind: "Attar" | "Perfume"; c1: string; c2: string };

const GOLD = "#a8741f";
const INK = "#1e1410";
const DISPLAY = "var(--font-display), Georgia, serif";
const SANS = "var(--font-body), system-ui, sans-serif";
// Real-world height in cm, used so a 6 ml attar looks smaller than a 100 ml perfume when shown together.
const CM: Record<string, number> = { "6 ml": 6.5, "12 ml": 8, "30 ml": 8.5, "50 ml": 10.5, "100 ml": 13 };
// Real bottle silhouettes (from the client's bottle photos): 30 ml round-shouldered jar with a ball cap,
// 50 ml tall rounded-rectangle with a cylinder cap, 100 ml squarer flacon with a wide cylinder cap.
// The 6 / 12 ml attar roller is still a stand-in: no photo supplied yet.
type Shape = "ball" | "flat" | "square" | "roller";
const SHAPE: Record<Shape, { h: number; w: number; label: { w: number; k: number; top: number } }> = {
  ball: { h: 152, w: 66, label: { w: 46, k: 0.7, top: -84 } },
  flat: { h: 152, w: 82, label: { w: 58, k: 0.92, top: -94 } },
  square: { h: 136, w: 114, label: { w: 76, k: 1.1, top: -88 } },
  roller: { h: 132, w: 62, label: { w: 44, k: 0.64, top: -72 } },
};
const shapeOf = (b: BottleSpec): Shape => (b.kind === "Attar" ? "roller" : b.size === "30 ml" ? "ball" : b.size === "50 ml" ? "flat" : "square");

const splitName = (name: string): string[] => {
  if (name.length <= 11) return [name];
  const w = name.split(" ");
  if (w.length === 1) return [name];
  let best = 1, bd = 1e9;
  for (let i = 1; i < w.length; i++) { const d = Math.abs(w.slice(0, i).join(" ").length - w.slice(i).join(" ").length); if (d < bd) { bd = d; best = i; } }
  return [w.slice(0, best).join(" "), w.slice(best).join(" ")];
};

function Glyph({ b, id, x, y, s, labelOnly = false }: { b: BottleSpec; id: string; x: number; y: number; s: number; labelOnly?: boolean }) {
  const shape = shapeOf(b);
  const L = SHAPE[shape].label;
  const lines = splitName(b.name);
  const longest = Math.max(...lines.map((l) => l.length));
  const SZ = b.size.toUpperCase();
  const labelText = (top: number, w: number, k: number) => {
    const two = lines.length === 2;
    const fs = Math.min((two ? 7.6 : 9.5) * k, (w - 8 * k) / (0.62 * longest));
    const nameY = top + (two ? 33.5 : 37) * k;
    return (
      <g textAnchor="middle">
        <text x={0} y={top + 12.5 * k} fontSize={8 * k} fill={GOLD} fontFamily={DISPLAY}>PD</text>
        <text x={0} y={top + 20 * k} fontSize={3.6 * k} letterSpacing={0.9 * k} fontWeight={600} fill={INK} fontFamily={SANS}>PERFUME DARBAR</text>
        <line x1={-7 * k} x2={7 * k} y1={top + 24.5 * k} y2={top + 24.5 * k} stroke={GOLD} strokeWidth={0.5 * k} />
        {lines.map((l, i) => <text key={i} x={0} y={nameY + i * (fs + 1 * k)} fontSize={fs} fill={INK} fontFamily={DISPLAY}>{l}</text>)}
        <text x={0} y={top + 50 * k} fontSize={3.8 * k} letterSpacing={0.8 * k} fontWeight={600} fill={INK} fontFamily={SANS}>{SZ}</text>
        <text x={0} y={top + 54.5 * k} fontSize={3 * k} letterSpacing={0.6 * k} fill="#6b5a48" fontFamily={SANS}>{b.kind === "Attar" ? "ATTAR" : "EXTRAIT DE PARFUM"}</text>
      </g>
    );
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <linearGradient id={`${id}-cap`} x1="0" x2="1"><stop offset="0" stopColor="#e2bd6a" /><stop offset=".3" stopColor="#fbeab4" /><stop offset=".7" stopColor="#c9973a" /><stop offset="1" stopColor="#8a5f17" /></linearGradient>
        <linearGradient id={`${id}-liq`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={b.c1} /><stop offset="1" stopColor={b.c2} /></linearGradient>
        <linearGradient id={`${id}-gl`} x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity=".8" /><stop offset=".45" stopColor="#fff" stopOpacity=".18" /><stop offset="1" stopColor="#fff" stopOpacity=".65" /></linearGradient>
        <linearGradient id={`${id}-hl`} x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity=".4" /><stop offset=".25" stopColor="#fff" stopOpacity="0" /><stop offset=".85" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".18" /></linearGradient>
      </defs>
      {!labelOnly && shape === "ball" && (
        <>
          <ellipse cx="0" cy="2" rx="36" ry="4" fill="#000" opacity=".16" />
          <rect x="-31" y="-93" width="62" height="93" rx="15" fill={`url(#${id}-gl)`} stroke="#fff" strokeOpacity=".7" strokeWidth="1" />
          <rect x="-26" y="-88" width="52" height="78" rx="11" fill={`url(#${id}-liq)`} />
          <rect x="-26" y="-88" width="52" height="78" rx="11" fill={`url(#${id}-hl)`} />
          <rect x="-20" y="-102" width="40" height="12" rx="5" fill={`url(#${id}-gl)`} stroke="#fff" strokeOpacity=".7" strokeWidth=".8" />
          <circle cx="0" cy="-126" r="25" fill={`url(#${id}-cap)`} />
          <ellipse cx="-8" cy="-134" rx="8" ry="5" fill="#fff" opacity=".35" />
        </>
      )}
      {!labelOnly && shape === "flat" && (
        <>
          <ellipse cx="0" cy="2" rx="46" ry="4.5" fill="#000" opacity=".16" />
          <rect x="-40" y="-106" width="80" height="106" rx="15" fill={`url(#${id}-gl)`} stroke="#fff" strokeOpacity=".7" strokeWidth="1" />
          <rect x="-33" y="-99" width="66" height="88" rx="10" fill={`url(#${id}-liq)`} />
          <rect x="-33" y="-99" width="66" height="88" rx="10" fill={`url(#${id}-hl)`} />
          <rect x="-22" y="-112" width="44" height="10" rx="4" fill={`url(#${id}-gl)`} stroke="#fff" strokeOpacity=".7" strokeWidth=".8" />
          <rect x="-15" y="-153" width="30" height="44" rx="2.5" fill={`url(#${id}-cap)`} />
        </>
      )}
      {!labelOnly && shape === "square" && (
        <>
          <ellipse cx="0" cy="2" rx="62" ry="5" fill="#000" opacity=".16" />
          <rect x="-54" y="-100" width="108" height="100" rx="8" fill={`url(#${id}-gl)`} stroke="#fff" strokeOpacity=".7" strokeWidth="1" />
          <rect x="-47" y="-93" width="94" height="84" rx="5" fill={`url(#${id}-liq)`} />
          <rect x="-47" y="-93" width="94" height="84" rx="5" fill={`url(#${id}-hl)`} />
          <rect x="-16" y="-106" width="32" height="8" rx="3" fill={`url(#${id}-gl)`} stroke="#fff" strokeOpacity=".7" strokeWidth=".8" />
          <rect x="-19" y="-138" width="38" height="36" rx="2.5" fill={`url(#${id}-cap)`} />
        </>
      )}
      {!labelOnly && shape === "roller" && (
        <>
          <ellipse cx="0" cy="2" rx="34" ry="4" fill="#000" opacity=".16" />
          <rect x="-29" y="-88" width="58" height="88" rx="11" fill={`url(#${id}-gl)`} stroke="#fff" strokeOpacity=".7" strokeWidth="1" />
          <rect x="-25" y="-84" width="50" height="76" rx="8" fill={`url(#${id}-liq)`} />
          <rect x="-25" y="-84" width="50" height="76" rx="8" fill={`url(#${id}-hl)`} />
          <rect x="-9" y="-99" width="18" height="13" fill={`url(#${id}-cap)`} />
          <rect x="-14" y="-131" width="28" height="36" rx="6" fill={`url(#${id}-cap)`} />
          <rect x="-14" y="-99" width="28" height="3" fill="#8a5f17" opacity=".5" />
        </>
      )}
      <rect x={-L.w / 2} y={L.top} width={L.w} height={60 * L.k} rx="1.2" fill="#faf6ee" />
      <rect x={-L.w / 2 + 2.5 * L.k} y={L.top + 2.5 * L.k} width={L.w - 5 * L.k} height={55 * L.k} fill="none" stroke="#c9973a" strokeWidth={0.5 * L.k} />
      {labelText(L.top, L.w, L.k)}
    </g>
  );
}

type SceneProps = {
  items: BottleSpec[];
  bg?: [string, string]; floor?: string;
  ratio?: "tall" | "wide";
  // "single": one bottle fills the frame (product page). "row": several bottles packed with real relative sizes.
  mode?: "single" | "row";
  align?: "center" | "right";
  className?: string; label?: string;
};
const DIM = { tall: [300, 375], wide: [480, 270] } as const;

export function Scene({ items, bg = ["#fbf1ee", "#f1dcd6"], floor, ratio = "tall", mode = "row", align = "center", className = "absolute inset-0 h-full w-full", label = "Perfume Darbar bottles" }: SceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [W, H] = DIM[ratio];
  const floorY = Math.round(H * 0.8);
  const baseY = floorY + H * 0.045;
  const cms = items.map((b) => CM[b.size] ?? 10);
  const hs = mode === "single" ? cms.map((cm) => H * (0.5 + 0.14 * ((cm - 6.5) / 6.5))) : cms.map((cm) => cm * ((H * 0.62) / 13));
  let sc = hs.map((h, i) => h / SHAPE[shapeOf(items[i])].h);
  let ws = sc.map((s, i) => SHAPE[shapeOf(items[i])].w * s);
  const gap = W * 0.025;
  const region = align === "right" ? [W * 0.42, W * 0.97] : [W * 0.06, W * 0.94];
  const avail = region[1] - region[0];
  const k = Math.min(1, avail / (ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1)));
  sc = sc.map((s) => s * k); ws = ws.map((w) => w * k);
  const g = gap * k;
  const used = ws.reduce((a, b) => a + b, 0) + g * (items.length - 1);
  let cx = region[0] + (avail - used) / 2;
  const [t, bt] = bg;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className={className} role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${uid}bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={t} /><stop offset="1" stopColor={bt} /></linearGradient>
        <radialGradient id={`${uid}glow`} cx=".5" cy=".55" r=".6"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${uid}bg)`} />
      <rect width={W} height={H} fill={`url(#${uid}glow)`} />
      <rect y={floorY} width={W} height={H - floorY} fill={floor ?? bt} />
      {!floor && <rect y={floorY} width={W} height={H - floorY} fill="#000" opacity=".1" />}
      <rect y={floorY} width={W} height="0.8" fill="#c9973a" opacity=".7" />
      {items.map((b, i) => {
        const x = cx + ws[i] / 2; cx += ws[i] + g;
        return <Glyph key={i} b={b} id={`${uid}${i}`} x={x} y={baseY} s={sc[i]} />;
      })}
    </svg>
  );
}

// Single bottle on a tinted ground.
export default function Bottle({ b, bg, className }: { b: BottleSpec; bg?: [string, string]; className?: string }) {
  return <Scene items={[b]} mode="single" bg={bg} className={className} label={`${b.name} ${b.size} ${b.kind}`} />;
}

// Just the label artwork (flat), for the print/sticker brief and demo samples.
export function LabelArt({ b, className }: { b: BottleSpec; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const L = SHAPE[shapeOf(b)].label;
  const pad = 3;
  return (
    <svg viewBox={`${-L.w / 2 - pad} ${L.top - pad} ${L.w + pad * 2} ${60 * L.k + pad * 2}`} className={className} role="img" aria-label={`${b.name} ${b.size} label`}>
      <Glyph b={b} id={uid} x={0} y={0} s={1} labelOnly />
    </svg>
  );
}
