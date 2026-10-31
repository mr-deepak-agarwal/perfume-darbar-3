export type Cat = "Women" | "Men" | "Unisex";
export type Scent = "Fresh Notes" | "Sweet" | "Oud" | "Woody" | "Spicy";
export type VariantId = "o6" | "o12" | "p30" | "p50" | "p100";
// One fragrance is sold as a pure oil (6 / 12 ml) and as a perfume (30 / 50 / 100 ml), each with its own price.
export type Variant = { id: VariantId; kind: "Pure oil" | "Perfume"; size: string; price: number };
export type Product = { image?: string; scent?: Scent; occasions: string[]; mrp: number; sold: number; slug: string; name: string; brand: string; category: Cat; family: string; conc: string; price: number; size: string; rating: number; reviews: number; tag?: string; top: string; heart: string; base: string; desc: string; c1: string; c2: string; variants: Variant[] };
export const money = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
export const BRAND = "Perfume Darbar";
export const DEFAULT_VARIANT: VariantId = "p50";
export const VARIANT_META: { id: VariantId; kind: Variant["kind"]; size: string }[] = [
  { id: "o6", kind: "Pure oil", size: "6 ml" }, { id: "o12", kind: "Pure oil", size: "12 ml" },
  { id: "p30", kind: "Perfume", size: "30 ml" }, { id: "p50", kind: "Perfume", size: "50 ml" }, { id: "p100", kind: "Perfume", size: "100 ml" },
];
export const variantOf = (p: Product, id?: string) => p.variants.find((v) => v.id === id) ?? p.variants.find((v) => v.id === DEFAULT_VARIANT) ?? p.variants[0];
export const variantLabel = (v: Variant) => `${v.kind} · ${v.size}`;
const pal: Record<Scent, [string, string]> = { Oud: ["#5b3a8a", "#1a0b2a"], Sweet: ["#e8a3b8", "#9c3a66"], "Fresh Notes": ["#7fb59a", "#26584a"], Woody: ["#b98a52", "#4a2f18"], Spicy: ["#e6b04f", "#a8431f"] };
// [name, for, scent family, style, "top / heart / base", occasions, [6ml oil, 12ml oil, 30ml, 50ml, 100ml], tag]
type Row = [string, Cat, Scent, string, string, string[], [number, number, number, number, number], string?];
// Prices: "Price list effective from 1st September 2026" (Perfume Darbar, Ponda).
const rows: Row[] = [
  ["Kaaf Amber", "Unisex", "Woody", "Oriental", "Saffron, bergamot / Amber, sandalwood / Musk, vanilla", ["Wedding", "Daily"], [150, 250, 450, 600, 1000], undefined],
  ["Oud & Roses", "Unisex", "Oud", "Oud", "Rose, saffron / Oud, damask rose / Amber, musk", ["Wedding", "Date night"], [200, 350, 500, 700, 1000], undefined],
  ["Hulwah", "Unisex", "Sweet", "Gourmand", "Dates, honey / Rose, vanilla / Amber, musk", ["Daily", "Date night"], [100, 200, 350, 500, 800], undefined],
  ["Morning Dive", "Men", "Fresh Notes", "Aquatic", "Bergamot, apple / Marine, lavender / Cedar, musk", ["Daily", "Office"], [200, 350, 500, 700, 1000], undefined],
  ["Evening Vanilla", "Men", "Sweet", "Gourmand", "Apple, cinnamon / Lavender, orange blossom / Vanilla, tonka", ["Party", "Date night"], [200, 350, 500, 700, 1000], undefined],
  ["Arabian Nights", "Unisex", "Spicy", "Oriental", "Saffron, cardamom / Rose, oud / Amber, sandalwood", ["Wedding", "Party"], [250, 450, 600, 800, 1500], "Premium"],
  ["Azure Blue", "Men", "Fresh Notes", "Aquatic", "Bergamot, sea notes / Lavender, sage / Cedar, musk", ["Daily", "Office"], [200, 350, 500, 700, 1000], undefined],
  ["Golden Musk", "Men", "Woody", "Musk", "Saffron / Musk, amber / Sandalwood, vanilla", ["Wedding", "Date night"], [250, 450, 600, 800, 1500], "Premium"],
  ["Royal Musk Special", "Men", "Woody", "Musk", "Saffron, rose / Pure musk, amber / Sandalwood, oud", ["Wedding"], [500, 950, 800, 1200, 2000], "Premium"],
  ["Musk Rose", "Women", "Sweet", "Floral", "Rose petals / Musk, peony / Cedar, vanilla", ["Daily", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["First Rain", "Unisex", "Fresh Notes", "Fresh", "Green notes, petrichor / Wet earth, vetiver / Cedar, musk", ["Daily", "Office"], [150, 250, 450, 600, 1000], undefined],
  ["Oasis Musk", "Unisex", "Sweet", "Musk", "Rose, bergamot / Jasmine, soft musk / Sandalwood, vanilla", ["Daily", "Wedding"], [150, 250, 450, 600, 1000], undefined],
  ["Silk Touch", "Women", "Sweet", "Floral", "Pear, bergamot / Jasmine, rose / Musk, vanilla", ["Daily", "Office"], [150, 250, 450, 600, 1000], undefined],
  ["Midnight Citrus", "Men", "Woody", "Woody", "Lemon, bergamot / Birch, jasmine / Musk, ambergris", ["Party", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Midnight Reserve", "Men", "Woody", "Woody", "Pineapple, bergamot / Birch, rose / Musk, oakmoss, patchouli", ["Party", "Date night"], [250, 450, 600, 800, 1500], "Premium"],
  ["Saffron Amber", "Unisex", "Spicy", "Oriental", "Saffron, nutmeg / Jasmine, ambergris / Amber, vanilla", ["Wedding", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Midnight Blossom", "Women", "Sweet", "Floral", "Pineapple, bergamot / Rose, jasmine / Musk, vanilla", ["Party", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Aqua Marine", "Men", "Fresh Notes", "Aquatic", "Lime, bergamot, marine / Jasmine, rosemary / Cedar, musk", ["Daily", "Office"], [100, 200, 350, 500, 800], undefined],
  ["Aqua Noir", "Men", "Fresh Notes", "Aquatic", "Bergamot, sea notes / Geranium, sage / Incense, patchouli", ["Office", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Dark Silk", "Men", "Spicy", "Oriental", "Bergamot, lemon / Star anise, olive blossom / Tonka, leather", ["Date night", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["White Bloom", "Women", "Sweet", "Floral", "Bergamot, orange blossom / Tuberose, jasmine / Vanilla, cedar", ["Daily", "Wedding"], [150, 250, 450, 600, 1000], undefined],
  ["Cassis Rose", "Women", "Sweet", "Floral", "Blackcurrant, pear / Rose, freesia / Vanilla, woods", ["Date night", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Amber Chestnut", "Men", "Sweet", "Gourmand", "Pink pepper, juniper / Cinnamon, lavender / Chestnut, vanilla, amber", ["Party", "Date night"], [200, 350, 500, 700, 1000], undefined],
  ["Toffee Amber", "Men", "Sweet", "Gourmand", "Cardamom, bergamot / Toffee, cinnamon / Amber, vanilla", ["Date night", "Party"], [200, 350, 500, 700, 1000], undefined],
  ["Black Musk", "Unisex", "Woody", "Musk", "Bergamot / Musk, cedar / Amber, vanilla", ["Date night", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Deep Blue", "Men", "Fresh Notes", "Aquatic", "Citrus, mint / Ginger, jasmine / Cedar, sandalwood", ["Daily", "Office"], [200, 350, 500, 700, 1000], undefined],
  ["Blueberry Musk", "Women", "Sweet", "Fruity", "Blueberry, raspberry / Jasmine, soft musk / Vanilla", ["Daily", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Uptown Special", "Men", "Woody", "Woody", "Bergamot, grapefruit / Ginger, sage / Cedar, musk", ["Office", "Daily"], [150, 250, 450, 600, 1000], undefined],
  ["Tuberose Noir", "Women", "Sweet", "Gourmand", "Almond, coffee / Tuberose, jasmine / Tonka, cacao", ["Party", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Rose Patchouli", "Women", "Sweet", "Floral", "Orange, bergamot / Rose, jasmine / Patchouli, vanilla, vetiver", ["Office", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Aldehyde Bloom", "Women", "Sweet", "Floral", "Aldehydes, neroli / Jasmine, rose / Sandalwood, vanilla, musk", ["Wedding", "Office"], [150, 250, 450, 600, 1000], undefined],
  ["Green Tea Citrus", "Unisex", "Fresh Notes", "Fresh", "Bergamot, lemon / Green tea, jasmine / Musk, amber", ["Daily", "Office"], [150, 250, 450, 600, 1000], undefined],
  ["Copper Amber", "Unisex", "Woody", "Woody", "Bergamot, pepper / Leather, amber / Cedar, musk", ["Daily", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Sport Champion", "Men", "Fresh Notes", "Fresh", "Citrus, mint / Lavender, apple / Cedar, musk", ["Daily"], [100, 200, 350, 500, 800], undefined],
  ["Smoked Pineapple", "Men", "Woody", "Woody", "Pineapple, bergamot, apple / Birch, rose, jasmine / Musk, oakmoss, vanilla", ["Party", "Office"], [200, 350, 500, 700, 1000], undefined],
  ["Deep Sea", "Men", "Fresh Notes", "Aquatic", "Mint, lavender, marine / Geranium, sandalwood / Musk, amber", ["Daily", "Office"], [150, 250, 450, 600, 1000], undefined],
  ["Leather Violet", "Men", "Woody", "Leather", "Lavender, mandarin / Violet leaf, nutmeg / Leather, vetiver", ["Office", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Wild Elixir", "Men", "Spicy", "Spicy", "Grapefruit, cinnamon / Lavender, nutmeg / Licorice, amber, sandalwood", ["Date night", "Party"], [250, 450, 600, 800, 1500], "Premium"],
  ["Wild Bergamot", "Men", "Spicy", "Spicy", "Bergamot, pepper / Lavender, geranium / Ambroxan, cedar", ["Daily", "Date night"], [200, 350, 500, 700, 1000], undefined],
  ["Sandal Forest", "Unisex", "Woody", "Woody", "Cypress, rosewood / Sandalwood, amber / Musk, cedar", ["Office", "Daily"], [200, 350, 500, 700, 1000], undefined],
  ["Golden Dirham", "Unisex", "Spicy", "Oriental", "Saffron, rose / Oud, amber / Musk", ["Wedding", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Soft Cream", "Women", "Sweet", "Powdery", "Aldehydes, powder / Lily, jasmine / Musk, vanilla", ["Daily", "Office"], [100, 200, 350, 500, 800], undefined],
  ["Gold Oud", "Unisex", "Oud", "Oud", "Saffron / Oud, amber / Musk", ["Wedding", "Party"], [100, 200, 350, 500, 800], undefined],
  ["Valley Amber", "Unisex", "Woody", "Woody", "Bergamot, cardamom / Amber, patchouli / Sandalwood, musk", ["Daily", "Date night"], [250, 450, 600, 800, 1500], "Premium"],
  ["Gold Sandal", "Unisex", "Woody", "Woody", "Saffron / Mysore sandalwood / Amber, musk", ["Wedding", "Daily"], [150, 250, 450, 600, 1000], undefined],
  ["Peony Garden", "Women", "Sweet", "Floral", "Citrus, peony / Rose, osmanthus / Sandalwood, musk", ["Daily", "Office"], [150, 250, 450, 600, 1000], undefined],
  ["Premium Cedar", "Men", "Fresh Notes", "Fresh", "Apple, mint / Lavender, cedar / Oakmoss, vanilla", ["Office", "Daily"], [150, 250, 450, 600, 1000], undefined],
  ["Glacier", "Men", "Fresh Notes", "Fresh", "Mint, lemon / Lavender, cedar / Musk", ["Daily", "Office"], [100, 200, 350, 500, 800], undefined],
  ["Imperial Oud", "Unisex", "Oud", "Oud", "Saffron, nutmeg, lavender / Oud, patchouli / Musk, vanilla", ["Wedding", "Party"], [200, 350, 500, 700, 1000], undefined],
  ["Dark Cedar", "Men", "Woody", "Woody", "Bergamot, pepper / Cedar, leather / Patchouli, amber", ["Date night", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Jasmine", "Women", "Sweet", "Floral", "Green leaves / Jasmine sambac / Musk, sandalwood", ["Daily", "Wedding"], [150, 250, 450, 600, 1000], undefined],
  ["Lavender Vanilla", "Men", "Sweet", "Gourmand", "Mint, lavender / Cinnamon, orange blossom / Vanilla, tonka", ["Party", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Honey Lavender", "Men", "Sweet", "Gourmand", "Lavender, mint / Honey, tonka / Tobacco, vanilla", ["Date night", "Party"], [200, 350, 500, 700, 1000], undefined],
  ["Pear Vanilla", "Men", "Sweet", "Gourmand", "Pear, bergamot / Lavender, cinnamon / Vanilla, amber", ["Party", "Daily"], [200, 350, 500, 700, 1000], undefined],
  ["Kashmiri Oud", "Unisex", "Oud", "Oud", "Saffron, rose / Oud, sandalwood / Amber, musk", ["Wedding", "Party"], [200, 350, 500, 700, 1000], undefined],
  ["Kasturi", "Unisex", "Spicy", "Musk", "Saffron / Deer musk accord, rose / Amber, sandalwood", ["Wedding", "Daily"], [100, 200, 350, 500, 800], undefined],
  ["Vanilla Royale", "Women", "Sweet", "Gourmand", "Vanilla, brown sugar / Orchid, jasmine / Amber, musk", ["Date night", "Daily"], [150, 250, 450, 600, 1000], undefined],
  ["Kesar Chandan", "Unisex", "Woody", "Woody", "Saffron / Mysore sandalwood / Amber resin", ["Wedding", "Daily"], [150, 250, 450, 600, 1000], undefined],
  ["Crisp White", "Men", "Fresh Notes", "Fresh", "Grapefruit, cardamom / Rosemary, cedar / Musk", ["Daily", "Office"], [150, 250, 450, 600, 1000], undefined],
  ["Spiced Dates", "Unisex", "Sweet", "Gourmand", "Cinnamon, nutmeg / Dates, praline / Vanilla, tonka, amber", ["Date night", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Coffee Dates", "Unisex", "Sweet", "Gourmand", "Cinnamon, cardamom / Coffee, praline / Vanilla, tonka", ["Date night", "Party"], [200, 350, 500, 700, 1000], undefined],
  ["Amber Dates", "Unisex", "Sweet", "Gourmand", "Saffron, cinnamon / Dates, honey / Amber, vanilla, musk", ["Wedding", "Date night"], [250, 450, 600, 800, 1500], "Premium"],
  ["Velvet Oud", "Unisex", "Oud", "Oud", "Pink pepper / Oud, rose / Amber, vanilla", ["Wedding", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Prince Oud", "Unisex", "Oud", "Oud", "Saffron, bergamot / Oud, leather / Amber, sandalwood", ["Wedding", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Lavender", "Men", "Fresh Notes", "Fresh", "Lavender, bergamot / Geranium, sage / Musk, tonka", ["Daily", "Office"], [150, 250, 450, 600, 1000], undefined],
  ["Lavender Oud", "Unisex", "Oud", "Oud", "Lavender, bergamot / Oud, geranium / Amber, musk", ["Date night", "Party"], [200, 350, 500, 700, 1000], undefined],
  ["Lemon", "Unisex", "Fresh Notes", "Citrus", "Lemon, lime / Green notes / White musk", ["Daily"], [100, 200, 350, 500, 800], undefined],
  ["Sunlit Swim", "Unisex", "Fresh Notes", "Aquatic", "Mandarin, orange / Sea salt, jasmine / Musk, driftwood", ["Daily", "Party"], [200, 350, 500, 700, 1000], undefined],
  ["Citrus Tea", "Unisex", "Fresh Notes", "Fresh", "Orange, bergamot, ginger / Black tea, cinnamon / Ambroxan, incense", ["Daily", "Office"], [200, 350, 500, 700, 1000], undefined],
  ["Magnetic Woods", "Men", "Woody", "Woody", "Bergamot, lavender / Cedar, geranium / Amber, musk", ["Date night", "Office"], [100, 200, 350, 500, 800], undefined],
  ["Black Vanilla", "Unisex", "Sweet", "Gourmand", "Lemon, vanilla / Tonka, amber / Musk, sandalwood", ["Date night", "Daily"], [100, 200, 350, 500, 800], undefined],
  ["Mixed Fruit", "Women", "Sweet", "Fruity", "Peach, apple / Berries, jasmine / Vanilla, musk", ["Daily", "Party"], [100, 200, 350, 500, 800], undefined],
  ["Mogra", "Women", "Sweet", "Floral", "Green leaves / Mogra jasmine / Sandalwood", ["Daily", "Wedding"], [100, 200, 350, 500, 800], undefined],
  ["Crystal Musk", "Unisex", "Sweet", "Musk", "Aldehydes, bergamot / Soft musk, lily / Amber, vanilla", ["Daily", "Office"], [250, 450, 500, 800, 1500], "Premium"],
  ["Soft Breeze", "Women", "Sweet", "Floral", "Pear, bergamot / Jasmine, rose / Musk, sandalwood", ["Daily", "Office"], [150, 250, 450, 600, 1000], undefined],
  ["Open Sky", "Men", "Fresh Notes", "Fresh", "Citrus, mint / Lavender, sage / Cedar, musk", ["Daily"], [150, 250, 450, 600, 1000], undefined],
  ["Oud Sensation", "Unisex", "Oud", "Oud", "Saffron, bergamot / Oud, rose / Amber, musk", ["Wedding", "Party"], [200, 350, 500, 700, 1000], undefined],
  ["Golden Spice", "Men", "Spicy", "Spicy", "Grapefruit, blood orange / Cinnamon, rose / Leather, amber", ["Party", "Date night"], [100, 200, 350, 500, 800], undefined],
  ["Black Licorice", "Men", "Spicy", "Spicy", "Lime, pepper / Licorice, vanilla / Patchouli, tonka", ["Date night", "Party"], [100, 200, 350, 500, 800], undefined],
  ["Victory Laurel", "Men", "Fresh Notes", "Aquatic", "Grapefruit, marine / Bay leaf, jasmine / Oakmoss, ambergris", ["Daily", "Party"], [200, 350, 500, 700, 1000], undefined],
  ["Victory Aqua", "Men", "Fresh Notes", "Aquatic", "Grapefruit, sea notes / Bay leaf, jasmine / Musk, driftwood", ["Daily", "Office"], [200, 350, 500, 700, 1000], undefined],
  ["Purple Oud", "Unisex", "Oud", "Oud", "Rose, saffron / Oud, violet / Amber, musk", ["Wedding", "Date night"], [200, 350, 500, 700, 1000], undefined],
  ["Persian Rose", "Women", "Sweet", "Floral", "Rose, saffron / Jasmine, rose absolute / Musk, amber", ["Wedding", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Splash Apple", "Men", "Fresh Notes", "Fresh", "Apple, cinnamon, bergamot / Plum, sea notes / Ambergris, musk", ["Daily", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Dark Splash", "Men", "Woody", "Woody", "Apple, bergamot / Cedar, sea notes / Amber, patchouli", ["Party", "Date night"], [200, 350, 500, 700, 1000], undefined],
  ["Ice Splash", "Men", "Fresh Notes", "Fresh", "Mint, apple / Lavender, sea notes / Musk, cedar", ["Daily", "Office"], [200, 350, 500, 700, 1000], undefined],
  ["Royal Sandal Oud", "Men", "Oud", "Oud", "Saffron, rose / Sandalwood, oud / Amber, musk", ["Wedding", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Field Sport", "Men", "Fresh Notes", "Fresh", "Citrus, mint / Lavender, geranium / Cedar, musk", ["Daily"], [100, 200, 350, 500, 800], undefined],
  ["Rose", "Women", "Sweet", "Floral", "Rose water / Damask rose / Sandalwood", ["Daily", "Wedding"], [100, 200, 350, 500, 800], undefined],
  ["Pearl Bloom", "Women", "Sweet", "Floral", "Peach, bergamot / Jasmine, lily / Musk, vanilla", ["Daily", "Office"], [100, 200, 350, 500, 800], undefined],
  ["Moonlit Rose", "Women", "Sweet", "Floral", "Pink pepper / Rose, jasmine / Musk, sandalwood", ["Date night", "Party"], [200, 350, 500, 700, 1000], undefined],
  ["Paradise Garden", "Unisex", "Sweet", "Floral", "Fruits, bergamot / Rose, jasmine / Musk, amber", ["Daily", "Wedding"], [150, 250, 450, 600, 1000], undefined],
  ["Rosewood Oud", "Unisex", "Oud", "Oud", "Rosewood, cardamom / Oud, sandalwood / Vetiver, tonka", ["Date night", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Tobacco Amber", "Unisex", "Spicy", "Oriental", "Tobacco leaf, spices / Vanilla, cacao / Dried fruit, amber", ["Date night", "Party"], [150, 250, 450, 600, 1000], undefined],
  ["Mint Tonka", "Men", "Sweet", "Gourmand", "Mint, green apple, lemon / Tonka, geranium / Vanilla, cedar", ["Party", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Fruit Peony", "Women", "Sweet", "Fruity", "Passion fruit, grapefruit / Peony, vanilla orchid / Musk", ["Party", "Date night"], [100, 200, 350, 500, 800], undefined],
  ["White Musk", "Unisex", "Sweet", "Musk", "Bergamot / White musk, lily / Sandalwood, vanilla", ["Daily", "Office"], [100, 200, 350, 500, 800], undefined],
  ["White Oud", "Unisex", "Oud", "Oud", "Bergamot, pink pepper / White oud, jasmine / Musk, amber", ["Daily", "Wedding"], [150, 250, 450, 600, 1000], undefined],
  ["Coffee Blossom", "Women", "Sweet", "Gourmand", "Pear, pink pepper / Coffee, jasmine / Vanilla, patchouli", ["Party", "Date night"], [150, 250, 450, 600, 1000], undefined],
  ["Apple Sage", "Men", "Fresh Notes", "Fresh", "Apple, ginger, bergamot / Sage, geranium / Amberwood, tonka, cedar", ["Office", "Daily"], [150, 250, 450, 600, 1000], undefined],
];

export const scents: Scent[] = ["Fresh Notes", "Sweet", "Oud", "Woody", "Spicy"];
export const scentBg: Record<Scent, string> = { "Fresh Notes": "#cdeee2", Sweet: "#f6c9d9", Oud: "#d8cbf2", Woody: "#efdcb8", Spicy: "#f6c5b3" };
export const scentBlurb: Record<Scent, string> = { "Fresh Notes": "Citrus, mint and sea air", Sweet: "Florals, vanilla and fruit", Oud: "Deep, resinous agarwood", Woody: "Sandal, vetiver and cedar", Spicy: "Saffron, pepper and amber" };
export const occasions = ["Daily", "Office", "Date night", "Party", "Wedding"];
export const occBlurb: Record<string, string> = { Daily: "Easy wear, any day", Office: "Clean and quiet", "Date night": "Close and warm", Party: "Loud and fun", Wedding: "Rich and festive" };
export const products: Product[] = rows.map((r, i) => {
  const [name, category, scent, family, notes, occasions, [o6, o12, p30, p50, p100], tag] = r;
  const [top, heart, base] = notes.split(" / ");
  const [c1, c2] = pal[scent];
  const price = [o6, o12, p30, p50, p100];
  return {
    scent, occasions, category, family, name, brand: BRAND, tag, top, heart, base, c1, c2,
    slug: name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    conc: "Pure oil and perfume", size: "50 ml", price: p50, mrp: p50,
    variants: VARIANT_META.map((v, k) => ({ ...v, price: price[k] })),
    desc: `${name} is a ${family.toLowerCase()} fragrance for ${category === "Unisex" ? "everyone" : category.toLowerCase()}. It opens with ${top.toLowerCase()}, settles into ${heart.toLowerCase()} and dries down to ${base.toLowerCase()}. Available as an alcohol-free pure oil and as a perfume.`,
    sold: 120 + ((i * 97) % 480), rating: +(4.3 + ((i * 3) % 7) / 10).toFixed(1), reviews: 20 + ((i * 53) % 260),
  };
});
export const off = (p: Product) => (p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0);
export const fromPrice = (p: Product) => Math.min(...p.variants.map((v) => v.price));
// Hours of wear differ by format
export const hoursOf = (v: Variant) => (v.kind === "Pure oil" ? "10+" : "6 to 8");

export type Collection = { slug: string; title: string; desc: string; test: (p: Product) => boolean };
export const collections: Collection[] = [
  { slug: "oud", title: "Oud collection", desc: "Deep, resinous agarwood for the evening.", test: (p) => p.scent === "Oud" || /oud/i.test(p.name) },
  { slug: "musk", title: "Musk edit", desc: "Soft, skin-close musks, white to black.", test: (p) => /musk/i.test(p.name) || p.family === "Musk" },
  { slug: "fresh-aquatic", title: "Fresh and aquatic", desc: "Citrus, mint and sea air for everyday wear.", test: (p) => p.scent === "Fresh Notes" },
  { slug: "sweet-gourmand", title: "Sweet and gourmand", desc: "Vanilla, dates, florals and fruit.", test: (p) => p.scent === "Sweet" },
  { slug: "best-value", title: "Best value", desc: "50 ml perfumes at ₹500.", test: (p) => p.price <= 500 },
  { slug: "premium", title: "Premium blends", desc: "Our richest, longest-lasting formulas.", test: (p) => p.price >= 800 },
];
export const priceBands: [string, string, (n: number) => boolean][] = [["", "Price (50 ml)", () => true], ["u500", "₹500", (n) => n <= 500], ["600", "₹600", (n) => n === 600], ["700", "₹700", (n) => n === 700], ["800p", "₹800 and above", (n) => n >= 800]];

// A Catalog is what the pages render. It comes from Supabase when configured (lib/catalog.ts) and
// from the built-in list above otherwise, so the site always has something to show.
export type Catalog = { products: Product[]; source: "supabase" | "static" };
export const staticCatalog = (): Catalog => ({ products, source: "static" });
export const findProduct = (c: Catalog, slug: string) => c.products.find((p) => p.slug === slug);
export const scentColors: Record<Scent, [string, string]> = { "Fresh Notes": ["#7fb59a", "#26584a"], Sweet: ["#e8a3b8", "#9c3a66"], Oud: ["#5b3a8a", "#1a0b2a"], Woody: ["#b98a52", "#4a2f18"], Spicy: ["#e6b04f", "#a8431f"] };

// Placeholder reviews (not real customer data). Replace with real reviews when you collect them.
const rn = ["Aarav M.", "Meera K.", "Rohan S.", "Ishita P.", "Karan T.", "Sana R.", "Neha B.", "Vikram J.", "Deepak S.", "Yash G.", "Pooja L.", "Imran A."];
const rt = ["Lasts well past 8 hours and the dry down is beautiful.", "Got compliments the first day I wore it. Packaging felt premium.", "Not too loud, works for office and evenings. Will reorder.", "Smells like the notes list says. Great value for the price.", "Opening is fresh, then it settles into something warm. Daily wear ke liye perfect.", "Gifted this to my brother and he loved it. Sealed and well packed.", "Good projection for the first two hours, then it stays close to the skin.", "I tried the 6 ml oil first and then bought the 50 ml. Good quality for the price."];
export const reviewsFor = (p: Product) => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ name: rn[(p.slug.length + i * 5) % 12], rating: [5, 5, 4, 5, 4, 5, 5, 4][i], text: rt[(p.slug.length + i * 3) % 8], date: ["12 Oct 2026", "04 Oct 2026", "28 Sep 2026", "19 Sep 2026", "11 Sep 2026", "30 Aug 2026", "21 Aug 2026", "09 Aug 2026"][i], verified: true }));
