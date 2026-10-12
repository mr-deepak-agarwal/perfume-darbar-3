export type Cat = "Fresh Notes" | "Sweet" | "Oud" | "Woody" | "Spicy";
export type Product = { slug: string; name: string; category: Cat; gender: "Men" | "Women" | "Unisex"; occasions: string[]; line: string; price: number; mrp: number; sold: number; rating: number; reviews: number; tag?: string; top: string; heart: string; base: string; desc: string; bg: string; liquid: string };
export const money = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
export const sizes = [30, 50, 100] as const;
export const sizePrice = (p: Product, s: number) => (s === 30 ? Math.round(p.price * 0.65) : s === 100 ? Math.round(p.price * 1.7) : p.price);
export const categories: Cat[] = ["Fresh Notes", "Sweet", "Oud", "Woody", "Spicy"];
export const catBg: Record<Cat, string> = { "Fresh Notes": "#9fe3d0", Sweet: "#ffb3d1", Oud: "#c9b8ff", Woody: "#f2d49b", Spicy: "#ffa28a" };
export const catBlurb: Record<Cat, string> = { "Fresh Notes": "Citrus, mint and sea air", Sweet: "Vanilla, fruit and cocoa", Oud: "Deep, resinous agarwood", Woody: "Sandal, cedar and smoke", Spicy: "Pepper, saffron and chai" };
export const occasions = ["Daily", "Office", "Date night", "Party", "Wedding"];
export const occBlurb: Record<string, string> = { Daily: "Easy wear, any day", Office: "Clean and quiet", "Date night": "Close and warm", Party: "Loud and fun", Wedding: "Rich and festive" };
type R = [string, string, Cat, Product["gender"], string[], string, number, number, number, number, string | undefined, string, string, string, string, string, string];
const rows: R[] = [
  ["rooftop-rain", "Rooftop Rain", "Fresh Notes", "Unisex", ["Party", "Daily"], "For 9pm rooftops", 3499, 520, 4.8, 412, "Bestseller", "Petrichor, lime", "Green tea, jasmine", "Cedar, white musk", "The smell of a warm roof when the first rain lands. Clean, bright and a little electric.", "#9fe3d0", "#1f9d8a"],
  ["green-hour", "Green Hour", "Fresh Notes", "Unisex", ["Daily", "Office"], "For morning walks", 2999, 300, 4.6, 189, undefined, "Basil, bergamot", "Fig leaf, mint", "Vetiver, moss", "Crushed leaves and cold air. An easy everyday scent that never gets loud.", "#c8f27a", "#5c9a12"],
  ["citrus-splash", "Citrus Splash", "Fresh Notes", "Men", ["Office", "Daily"], "For gym to office", 2799, 260, 4.5, 143, "New", "Lemon, grapefruit", "Mint, neroli", "White musk, cedar", "Sharp citrus over a clean musk base. Wakes you up and stays polite.", "#d9f56a", "#7aa600"],
  ["cold-brew", "Cold Brew", "Sweet", "Unisex", ["Office", "Daily"], "For deadline days", 3799, 410, 4.7, 244, undefined, "Coffee, orange peel", "Cacao, almond", "Vanilla, amber", "Dark roast with a sweet finish. Wakes you up without shouting.", "#f4a26b", "#6b3410"],
  ["paper-moon", "Paper Moon", "Sweet", "Women", ["Date night", "Wedding"], "For first dates", 3999, 480, 4.7, 301, "Bestseller", "Pear, pink pepper", "Peony, rose", "Musk, sandalwood", "Soft petals over clean skin. Romantic without being heavy.", "#ffb3d1", "#d6407f"],
  ["neon-fig", "Neon Fig", "Sweet", "Women", ["Party", "Daily"], "For weekend plans", 3599, 190, 4.5, 127, undefined, "Fig, grapefruit", "Orange blossom, iris", "Coconut wood, musk", "Juicy fig with a creamy white-flower heart. Playful and bright.", "#d9b8ff", "#7a35c9"],
  ["velvet-dusk", "Velvet Dusk", "Oud", "Unisex", ["Wedding", "Date night"], "For late dinners", 4499, 450, 4.9, 366, undefined, "Saffron, plum", "Oud, leather", "Amber, patchouli", "Dark fruit, smooth leather and a long amber trail. Made for the evening.", "#b9a2ff", "#2b1a66"],
  ["midnight-oud", "Midnight Oud", "Oud", "Men", ["Party", "Wedding"], "For big nights", 4999, 530, 4.8, 398, "Bestseller", "Saffron, bergamot", "Oud, rose", "Amber, sandalwood", "A dark, resinous oud softened by rose. Built for evenings that run late.", "#a99bff", "#1a0b3a"],
  ["royal-oud", "Royal Oud", "Oud", "Men", ["Wedding"], "For the groom", 5499, 220, 4.7, 96, "Limited", "Cardamom, pink pepper", "Agarwood, leather", "Musk, amber", "Pure agarwood with a leather edge. Rich, regal and long lasting.", "#8d7bff", "#3b0f3b"],
  ["smoke-ghat", "Smoke Ghat", "Woody", "Unisex", ["Daily", "Date night"], "For bonfire nights", 4199, 330, 4.6, 158, undefined, "Incense, black pepper", "Sandalwood, birch", "Smoke, vetiver", "Sandalwood smoke drifting over water. Calm, deep and grounding.", "#a8c4ff", "#2b3cff"],
  ["sandal-sutra", "Sandal Sutra", "Woody", "Unisex", ["Wedding", "Daily"], "For festive days", 3999, 390, 4.8, 211, "New", "Cardamom, saffron", "Mysore sandalwood, iris", "Cedar, musk", "Creamy sandalwood with a touch of saffron. Warm, calm and festive.", "#f2d49b", "#a8742a"],
  ["cedar-rain", "Cedar Rain", "Woody", "Men", ["Office", "Daily"], "For long workdays", 3699, 270, 4.5, 118, undefined, "Bergamot, juniper", "Cedar, vetiver", "Oakmoss, white musk", "Fresh cedar after the rain. Understated and professional.", "#b7e0a5", "#3f6b2a"],
  ["chai-hour", "Chai Hour", "Spicy", "Unisex", ["Daily", "Office"], "For slow afternoons", 3299, 610, 4.9, 538, "Bestseller", "Cardamom, ginger", "Black tea, cinnamon", "Milk accord, tonka", "Spiced tea in a steel glass. Warm, creamy and instantly familiar.", "#ffc65c", "#c9731a"],
  ["kesar-spice", "Kesar Spice", "Spicy", "Unisex", ["Wedding", "Party"], "For wedding season", 4299, 340, 4.7, 164, "New", "Saffron, cardamom", "Clove, rose", "Amber, oud", "Saffron and clove over a soft amber base. Festive and glowing.", "#ffa28a", "#c2410c"],
  ["black-pepper-noir", "Black Pepper Noir", "Spicy", "Men", ["Date night", "Party"], "For after dark", 3899, 280, 4.6, 132, undefined, "Black pepper, ginger", "Leather, nutmeg", "Patchouli, vetiver", "Peppery, smoky and confident. A late-night scent with an edge.", "#ff9f9f", "#7f1d1d"],
];
export const products: Product[] = rows.map(([slug, name, category, gender, occ, line, price, sold, rating, reviews, tag, top, heart, base, desc, bg, liquid]) => ({ slug, name, category, gender, occasions: occ, line, price, mrp: Math.round((price * 1.25) / 100) * 100, sold, rating, reviews, tag, top, heart, base, desc, bg, liquid }));
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const off = (p: Product) => Math.round((1 - p.price / p.mrp) * 100);
export const collections: { slug: string; title: string; desc: string; bg: string; test: (p: Product) => boolean }[] = [
  { slug: "new-arrivals", title: "New arrivals", desc: "Fresh releases this season.", bg: "#9fe3d0", test: (p) => p.tag === "New" },
  { slug: "bestsellers", title: "Bestsellers", desc: "The bottles people keep reordering.", bg: "#ffc65c", test: (p) => p.sold >= 450 },
  { slug: "wedding-edit", title: "The wedding edit", desc: "Rich, festive scents for the season.", bg: "#ffb3d1", test: (p) => p.occasions.includes("Wedding") },
  { slug: "office-picks", title: "Office picks", desc: "Clean, quiet and polite.", bg: "#a8c4ff", test: (p) => p.occasions.includes("Office") },
  { slug: "date-night", title: "Date night", desc: "Close, warm and memorable.", bg: "#c9b8ff", test: (p) => p.occasions.includes("Date night") },
  { slug: "under-3500", title: "Under ₹3,500", desc: "Easy-to-love scents at friendly prices.", bg: "#ffa28a", test: (p) => p.price < 3500 },
];
const rn = ["Aarav", "Meera", "Rohan", "Ishita", "Karan", "Sana", "Neha", "Vikram"];
const rt = ["Lasts well past 6 hours and the dry down is lovely.", "Got compliments the first day I wore it. Packaging felt premium.", "Not too loud, works for office and evenings. Will reorder.", "Smells like the notes list says. Great value for the price."];
export const reviewsFor = (p: Product) => [0, 1, 2].map((i) => ({ name: rn[(p.slug.length + i * 3) % 8], rating: i === 1 ? 4 : 5, text: rt[(p.slug.length + i) % 4], date: ["12 Sep 2026", "30 Aug 2026", "14 Aug 2026"][i] }));
