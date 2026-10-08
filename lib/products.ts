export type Cat = "Women" | "Men" | "Unisex" | "Gift Set";
export type Product = { slug: string; name: string; brand: string; category: Cat; family: string; conc: string; price: number; size: string; rating: number; reviews: number; tag?: string; top: string; heart: string; base: string; desc: string; c1: string; c2: string };
export const money = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const pal: Record<string, [string, string]> = { Woody: ["#5b3a8a", "#1a0b2a"], Floral: ["#e8a3b8", "#9c3a66"], Fresh: ["#7fb59a", "#26584a"], Oriental: ["#d79a3a", "#6b3a0c"], Spicy: ["#e6b04f", "#a8431f"], Aquatic: ["#8ec5e0", "#2a6a96"], Powdery: ["#b9a2d6", "#5a3d86"], Gourmand: ["#d9a273", "#6b3a22"], Citrus: ["#f5d54a", "#d98a1c"], Attar: ["#c27c1a", "#4a2158"], Set: ["#e9c46a", "#8a5a14"] };
type Row = [string, string, Cat, string, string, number, string, string?, string?];
const rows: Row[] = [
  ["Midnight Oud", "Nawab Oud", "Unisex", "Woody", "EDP", 7499, "Saffron, bergamot / Oud, rose / Amber, sandalwood", "Bestseller"],
  ["Royal Oud Intense", "Nawab Oud", "Men", "Woody", "Parfum", 12999, "Cardamom, pink pepper / Agarwood, leather / Musk, amber", "Premium"],
  ["Black Leather Oud", "Nawab Oud", "Men", "Woody", "Parfum", 10999, "Black pepper, bergamot / Leather, oud / Vetiver, patchouli", "Premium"],
  ["Jaipur Rose", "Rani Parfums", "Women", "Floral", "EDP", 5999, "Pink pepper, lychee / Damask rose, jasmine / Musk, vanilla", "New"],
  ["Rani Jasmine", "Rani Parfums", "Women", "Floral", "EDP", 5499, "Neroli, pear / Jasmine sambac, tuberose / White musk, cedar"],
  ["Velvet Iris", "Rani Parfums", "Women", "Powdery", "EDP", 6999, "Mandarin, aldehydes / Orris, violet / Suede, sandalwood", "Bestseller"],
  ["Blush Peony", "Rani Parfums", "Women", "Floral", "EDT", 4799, "Bergamot, raspberry / Peony, magnolia / Cashmeran, musk"],
  ["Gulab Attar", "Kesar & Co", "Unisex", "Attar", "Attar", 1999, "Saffron, rose water / Damask rose / Sandalwood oil", "Bestseller"],
  ["Mogra Attar", "Kesar & Co", "Women", "Attar", "Attar", 1799, "Green leaves / Mogra jasmine / Sandalwood oil"],
  ["Kesar Chandan Attar", "Kesar & Co", "Unisex", "Attar", "Attar", 2499, "Saffron / Mysore sandalwood / Amber resin", "New"],
  ["Amber Noir", "Zafran House", "Men", "Oriental", "EDP", 6799, "Cardamom, black pepper / Labdanum, tobacco / Amber, tonka", "Bestseller"],
  ["Saffron Silk", "Zafran House", "Unisex", "Spicy", "EDP", 6299, "Saffron, orange blossom / Iris, cashmere wood / Benzoin, musk", "Limited"],
  ["Silk Route Musk", "Zafran House", "Unisex", "Powdery", "EDP", 5799, "Pink pepper / Rose, powdery musk / Sandalwood, vanilla"],
  ["Zafran Nights", "Zafran House", "Women", "Oriental", "EDP", 6599, "Saffron, plum / Rose, incense / Amber, patchouli"],
  ["Monsoon Vetiver", "Darbar Atelier", "Men", "Fresh", "EDT", 4999, "Green mandarin, mint / Vetiver, geranium / Cedar, moss"],
  ["Ocean Salt", "Darbar Atelier", "Unisex", "Aquatic", "EDT", 4499, "Sea salt, grapefruit / Sage, driftwood / Ambergris, white cedar"],
  ["Desert Mint", "Darbar Atelier", "Men", "Fresh", "EDT", 4299, "Mint, lemon / Juniper, lavender / Cedar, oakmoss", "New"],
  ["Pink Pepper Haze", "Darbar Atelier", "Women", "Spicy", "EDT", 4599, "Pink pepper, mandarin / Rose, geranium / Musk, amber"],
  ["Citrus Mehfil", "Mehfil", "Unisex", "Citrus", "EDT", 3999, "Lemon, bergamot / Neroli, green tea / White musk", "New"],
  ["Majlis Tobacco", "Mehfil", "Men", "Oriental", "EDP", 6199, "Cinnamon, rum / Tobacco leaf, honey / Vanilla, tonka"],
  ["Vanilla Bazaar", "Mehfil", "Women", "Gourmand", "EDP", 4999, "Cardamom, pear / Vanilla orchid, caramel / Tonka, sandalwood", "New"],
  ["Discovery Set", "Darbar Atelier", "Gift Set", "Set", "Set", 2499, "Five 10 ml sprays of our bestsellers / Ideal first-time gift / Arrives in a keepsake box", "Bestseller", "5 × 10 ml"],
  ["Attar Gift Box", "Kesar & Co", "Gift Set", "Set", "Set", 3999, "Three 6 ml roll-on attars / Rose, mogra and sandalwood / Hand-wrapped box", undefined, "3 × 6 ml"],
  ["Date Night Duo", "Zafran House", "Gift Set", "Set", "Set", 8999, "Amber Noir 50 ml for him / Zafran Nights 50 ml for her / Gift-wrapped with a note", "New", "2 × 50 ml"],
];
export const products: Product[] = rows.map((r, i) => {
  const [name, brand, category, family, conc, price, notes, tag, size] = r;
  const [top, heart, base] = notes.split(" / ");
  const [c1, c2] = pal[family] ?? pal.Woody;
  const desc = category === "Gift Set" ? `A ready-to-gift set from ${brand}. ${top}. ${heart}.` : `${name} is a ${family.toLowerCase()} ${conc === "Attar" ? "attar" : conc} from ${brand}. It opens with ${top.toLowerCase()}, settles into ${heart.toLowerCase()} and dries down to ${base.toLowerCase()}.`;
  return { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), name, brand, category, family, conc, price, tag, top, heart, base, desc, c1, c2,
    size: size ?? (conc === "Attar" ? "12 ml" : conc === "Parfum" ? "50 ml" : "100 ml"), rating: +(4.3 + ((i * 3) % 7) / 10).toFixed(1), reviews: 40 + ((i * 53) % 260) };
});
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const brands = [...new Set(products.map((p) => p.brand))];
export const families = [...new Set(products.map((p) => p.family))].filter((f) => f !== "Set");
export const concs = ["EDT", "EDP", "Parfum", "Attar"];
export const collections: { slug: string; title: string; desc: string; test: (p: Product) => boolean }[] = [
  { slug: "new-arrivals", title: "New arrivals", desc: "Fresh releases from this season.", test: (p) => p.tag === "New" },
  { slug: "bestsellers", title: "Bestsellers", desc: "The bottles our customers keep reordering.", test: (p) => p.tag === "Bestseller" || p.rating >= 4.8 },
  { slug: "attars", title: "Attars and oils", desc: "Alcohol-free, long-lasting and rooted in Kannauj tradition.", test: (p) => p.conc === "Attar" },
  { slug: "oud", title: "Oud collection", desc: "Deep, resinous and made for the evening.", test: (p) => /oud|agarwood/i.test(p.name + p.heart + p.top + p.base) },
  { slug: "gift-sets", title: "Gift sets", desc: "Wrapped, boxed and ready to give.", test: (p) => p.category === "Gift Set" },
  { slug: "under-5000", title: "Under ₹5,000", desc: "Easy-to-love perfumes at friendly prices.", test: (p) => p.price < 5000 && p.category !== "Gift Set" },
];
const rn = ["Aarav", "Meera", "Rohan", "Ishita", "Karan", "Sana", "Neha", "Vikram"];
const rt = ["Lasts well past 8 hours and the dry down is beautiful.", "Got compliments the first day I wore it. Packaging felt premium.", "Not too loud, perfect for office and evenings. Will reorder.", "Smells like the notes list says. Great value for the price."];
export const reviewsFor = (p: Product) => [0, 1, 2].map((i) => ({ name: rn[(p.slug.length + i * 3) % 8], rating: i === 1 ? 4 : 5, text: rt[(p.slug.length + i) % 4], date: ["12 Sep 2026", "30 Aug 2026", "14 Aug 2026"][i] }));
