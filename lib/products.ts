export type Cat = "Women" | "Men" | "Unisex" | "Gift Set";
export type Scent = "Fresh Notes" | "Sweet" | "Oud" | "Woody" | "Spicy";
export type Product = { image?: string; scent?: Scent; occasions: string[]; mrp: number; sold: number; slug: string; name: string; brand: string; category: Cat; family: string; conc: string; price: number; size: string; rating: number; reviews: number; tag?: string; top: string; heart: string; base: string; desc: string; c1: string; c2: string };
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
  ["Sultan Reserve", "Nawab Oud", "Men", "Woody", "Parfum", 11499, "Saffron, nutmeg / Oud, cedar / Amber, benzoin", "Premium"],
  ["Oud Rose Mehfil", "Nawab Oud", "Unisex", "Woody", "EDP", 8499, "Rose, pink pepper / Oud, damask rose / Patchouli, musk", "New"],
  ["Kashmir Saffron", "Zafran House", "Unisex", "Spicy", "EDP", 6899, "Saffron, cardamom / Rose, almond / Sandalwood, amber"],
  ["Spice Market", "Zafran House", "Men", "Spicy", "EDP", 5699, "Black pepper, cinnamon / Clove, leather / Amber, patchouli"],
  ["Chai Masala", "Mehfil", "Unisex", "Gourmand", "EDP", 4799, "Cardamom, ginger / Black tea, cinnamon / Vanilla, tonka", "New"],
  ["Mango Mirage", "Mehfil", "Women", "Gourmand", "EDT", 3899, "Mango, mandarin / Peach, jasmine / Vanilla, musk"],
  ["Lavender Haveli", "Mehfil", "Men", "Fresh", "EDT", 3999, "Lavender, bergamot / Geranium, sage / Tonka, cedar"],
  ["Lotus Dew", "Rani Parfums", "Women", "Floral", "EDT", 4299, "Water lily, green leaves / Lotus, jasmine / White musk, cedar"],
  ["Kewda Breeze", "Rani Parfums", "Women", "Fresh", "EDT", 4599, "Cucumber, kewda / Water jasmine, lotus / Musk, driftwood", "New"],
  ["Himalayan Cedar", "Darbar Atelier", "Men", "Woody", "EDP", 5299, "Juniper, bergamot / Cedar, fir balsam / Vetiver, oakmoss"],
  ["Mitti Rain", "Darbar Atelier", "Unisex", "Fresh", "EDT", 4199, "Green notes, petrichor / Wet earth, vetiver / Cedar, musk", "Limited"],
  ["Sandal Sutra", "Kesar & Co", "Unisex", "Woody", "EDP", 5999, "Cardamom, saffron / Mysore sandalwood, iris / Musk, vanilla", "Bestseller"],
  ["Discovery Set", "Darbar Atelier", "Gift Set", "Set", "Set", 2499, "Five 10 ml sprays of our bestsellers / Ideal first-time gift / Arrives in a keepsake box", "Bestseller", "5 × 10 ml"],
  ["Attar Gift Box", "Kesar & Co", "Gift Set", "Set", "Set", 3999, "Three 6 ml roll-on attars / Rose, mogra and sandalwood / Hand-wrapped box", undefined, "3 × 6 ml"],
  ["Date Night Duo", "Zafran House", "Gift Set", "Set", "Set", 8999, "Amber Noir 50 ml for him / Zafran Nights 50 ml for her / Gift-wrapped with a note", "New", "2 × 50 ml"],
];

export const scents: Scent[] = ["Fresh Notes", "Sweet", "Oud", "Woody", "Spicy"];
export const scentBg: Record<Scent, string> = { "Fresh Notes": "#cdeee2", Sweet: "#f6c9d9", Oud: "#d8cbf2", Woody: "#efdcb8", Spicy: "#f6c5b3" };
export const scentBlurb: Record<Scent, string> = { "Fresh Notes": "Citrus, mint and sea air", Sweet: "Florals, vanilla and fruit", Oud: "Deep, resinous agarwood", Woody: "Sandal, vetiver and cedar", Spicy: "Saffron, pepper and amber" };
export const occasions = ["Daily", "Office", "Date night", "Party", "Wedding"];
export const occBlurb: Record<string, string> = { Daily: "Easy wear, any day", Office: "Clean and quiet", "Date night": "Close and warm", Party: "Loud and fun", Wedding: "Rich and festive" };
const scentOf: Record<string, Scent> = { "Midnight Oud": "Oud", "Royal Oud Intense": "Oud", "Black Leather Oud": "Oud", "Jaipur Rose": "Sweet", "Rani Jasmine": "Sweet", "Velvet Iris": "Sweet", "Blush Peony": "Sweet", "Gulab Attar": "Sweet", "Mogra Attar": "Sweet", "Vanilla Bazaar": "Sweet", "Kesar Chandan Attar": "Woody", "Silk Route Musk": "Woody", "Monsoon Vetiver": "Woody", "Amber Noir": "Spicy", "Saffron Silk": "Spicy", "Zafran Nights": "Spicy", "Pink Pepper Haze": "Spicy", "Majlis Tobacco": "Spicy", "Ocean Salt": "Fresh Notes", "Desert Mint": "Fresh Notes", "Citrus Mehfil": "Fresh Notes", "Sultan Reserve": "Oud", "Oud Rose Mehfil": "Oud", "Kashmir Saffron": "Spicy", "Spice Market": "Spicy", "Chai Masala": "Sweet", "Mango Mirage": "Sweet", "Lavender Haveli": "Fresh Notes", "Lotus Dew": "Sweet", "Kewda Breeze": "Fresh Notes", "Himalayan Cedar": "Woody", "Mitti Rain": "Fresh Notes", "Sandal Sutra": "Woody" };
const occOf: Record<string, string[]> = { "Midnight Oud": ["Party", "Wedding"], "Royal Oud Intense": ["Wedding"], "Black Leather Oud": ["Date night", "Party"], "Jaipur Rose": ["Date night", "Wedding"], "Rani Jasmine": ["Daily", "Wedding"], "Velvet Iris": ["Office", "Date night"], "Blush Peony": ["Daily", "Office"], "Gulab Attar": ["Wedding", "Daily"], "Mogra Attar": ["Daily", "Wedding"], "Kesar Chandan Attar": ["Wedding", "Daily"], "Amber Noir": ["Party", "Date night"], "Saffron Silk": ["Wedding", "Party"], "Silk Route Musk": ["Office", "Daily"], "Zafran Nights": ["Date night", "Wedding"], "Monsoon Vetiver": ["Office", "Daily"], "Ocean Salt": ["Daily", "Party"], "Desert Mint": ["Office", "Daily"], "Pink Pepper Haze": ["Party", "Date night"], "Citrus Mehfil": ["Daily", "Party"], "Majlis Tobacco": ["Date night", "Party"], "Vanilla Bazaar": ["Date night", "Daily"], "Discovery Set": ["Daily"], "Attar Gift Box": ["Wedding"], "Date Night Duo": ["Date night"], "Sultan Reserve": ["Wedding", "Party"], "Oud Rose Mehfil": ["Wedding", "Date night"], "Kashmir Saffron": ["Wedding", "Daily"], "Spice Market": ["Party", "Date night"], "Chai Masala": ["Daily", "Date night"], "Mango Mirage": ["Daily", "Party"], "Lavender Haveli": ["Office", "Daily"], "Lotus Dew": ["Daily", "Office"], "Kewda Breeze": ["Daily", "Party"], "Himalayan Cedar": ["Office", "Daily"], "Mitti Rain": ["Daily", "Office"], "Sandal Sutra": ["Wedding", "Office"] };
export const products: Product[] = rows.map((r, i) => {
  const [name, brand, category, family, conc, price, notes, tag, size] = r;
  const [top, heart, base] = notes.split(" / ");
  const [c1, c2] = pal[family] ?? pal.Woody;
  const desc = category === "Gift Set" ? `A ready-to-gift set from ${brand}. ${top}. ${heart}.` : `${name} is a ${family.toLowerCase()} ${conc === "Attar" ? "attar" : conc} from ${brand}. It opens with ${top.toLowerCase()}, settles into ${heart.toLowerCase()} and dries down to ${base.toLowerCase()}.`;
  return { scent: scentOf[name], occasions: occOf[name] ?? ["Daily"], mrp: Math.round((price * 1.25) / 100) * 100, sold: 150 + ((i * 97) % 450) + (tag === "Bestseller" ? 200 : 0), slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), name, brand, category, family, conc, price, tag, top, heart, base, desc, c1, c2,
    size: size ?? (conc === "Attar" ? "12 ml" : "50 ml") /* all bottles use the 50 ml product photo */, rating: +(4.3 + ((i * 3) % 7) / 10).toFixed(1), reviews: 40 + ((i * 53) % 260) };
});
export const off = (p: Product) => Math.round((1 - p.price / p.mrp) * 100);
export const hoursOf = (p: Product) => (p.conc === "Attar" ? "10+" : p.conc === "Parfum" ? "10 to 12" : p.conc === "EDP" ? "8 to 10" : p.conc === "EDT" ? "5 to 7" : "");
// A Catalog is what the pages render. It comes from Supabase when configured (lib/catalog.ts) and
// from the static seed in this file otherwise, so the site always has something to show.
export type Catalog = { products: Product[]; samples: Product[]; source: "supabase" | "static" };
export const staticCatalog = (): Catalog => ({ products, samples, source: "static" });
export const findProduct = (c: Catalog, slug: string) => c.products.find((p) => p.slug === slug) ?? c.samples.find((p) => p.slug === slug);
export const brandsOf = (c: Catalog) => [...new Set(c.products.map((p) => p.brand))];
export const scentColors: Record<Scent, [string, string]> = { "Fresh Notes": ["#7fb59a", "#26584a"], Sweet: ["#e8a3b8", "#9c3a66"], Oud: ["#5b3a8a", "#1a0b2a"], Woody: ["#b98a52", "#4a2f18"], Spicy: ["#e6b04f", "#a8431f"] };
export const concs = ["EDT", "EDP", "Parfum", "Attar"];
export const collections: { slug: string; title: string; desc: string; test: (p: Product) => boolean }[] = [
  { slug: "new-arrivals", title: "New arrivals", desc: "Fresh releases from this season.", test: (p) => p.tag === "New" },
  { slug: "bestsellers", title: "Bestsellers", desc: "The bottles our customers keep reordering.", test: (p) => p.tag === "Bestseller" || p.rating >= 4.8 },
  { slug: "attars", title: "Attars and oils", desc: "Alcohol-free, long-lasting and rooted in Kannauj tradition.", test: (p) => p.conc === "Attar" },
  { slug: "oud", title: "Oud collection", desc: "Deep, resinous and made for the evening.", test: (p) => /oud|agarwood/i.test(p.name + p.heart + p.top + p.base) },
  { slug: "gift-sets", title: "Gift sets", desc: "Wrapped, boxed and ready to give.", test: (p) => p.category === "Gift Set" },
  { slug: "under-5000", title: "Under ₹5,000", desc: "Easy-to-love perfumes at friendly prices.", test: (p) => p.price < 5000 && p.category !== "Gift Set" },
  { slug: "wedding-edit", title: "The wedding edit", desc: "Rich, festive scents for the season.", test: (p) => p.occasions.includes("Wedding") },
  { slug: "office-picks", title: "Office picks", desc: "Clean, quiet and polite.", test: (p) => p.occasions.includes("Office") },
  { slug: "date-night", title: "Date night", desc: "Close, warm and memorable.", test: (p) => p.occasions.includes("Date night") },
];
export const samples: Product[] = products.filter((p) => p.category !== "Gift Set" && p.conc !== "Attar").map((p) => { const price = p.conc === "EDT" ? 149 : p.conc === "EDP" ? 199 : 299; return { ...p, slug: `${p.slug}-sample`, name: `${p.name} Sample`, size: "5 ml", price, mrp: price, tag: "Sample" }; });
const rn = ["Aarav M.", "Meera K.", "Rohan S.", "Ishita P.", "Karan T.", "Sana R.", "Neha B.", "Vikram J.", "Deepak S.", "Yash G.", "Pooja L.", "Imran A."];
const rt = ["Lasts well past 8 hours and the dry down is beautiful.", "Got compliments the first day I wore it. Packaging felt premium.", "Not too loud, works for office and evenings. Will reorder.", "Smells like the notes list says. Great value for the price.", "Opening is fresh, then it settles into something warm. Daily wear ke liye perfect.", "Gifted this to my brother and he loved it. Sealed and well packed.", "Good projection for the first two hours, then it stays close to the skin.", "Quality is solid for the price. The sample helped me decide before buying."];
export const reviewsFor = (p: Product) => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ name: rn[(p.slug.length + i * 5) % 12], rating: [5, 5, 4, 5, 4, 5, 5, 4][i], text: rt[(p.slug.length + i * 3) % 8], date: ["12 Oct 2026", "04 Oct 2026", "28 Sep 2026", "19 Sep 2026", "11 Sep 2026", "30 Aug 2026", "21 Aug 2026", "09 Aug 2026"][i], verified: true }));
