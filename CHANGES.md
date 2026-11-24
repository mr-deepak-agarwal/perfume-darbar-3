# Draft 2 changes (from client comments of 13 Nov)
1. Bottles: old dark-label photo mockups removed (archived in design-archive/). Clean cream-label bottles drawn in components/Bottle.tsx using the client's real silhouettes: 30 ml ball-cap jar, 50 ml tall rounded-rectangle, 100 ml square flacon (6/12 ml attar roller is still a stand-in). Real photos: public/products/<slug>.jpg + USE_PRODUCT_PHOTOS=true in lib/site.ts.
2. Copy: "Pure oil" -> "Attar" everywhere (UI, FAQ, blog, schema, seed, backend); hero "Attars and perfumes, made in India"; Goa dropped from marketing copy (legal/manufacturer address kept).
3. Original vs Inspired: built (lib/inspired.ts, ProductImage/Gallery) but EMPTY until client supplies the mapping + images and legal ok.
4. Discounts: struck-through M.R.P + % off (components/Price.tsx). MRP = price x 1.5 placeholder in lib/offers.ts.
5. Size dropdown (6/12 ml attar, 30/50/100 ml perfume, default 50 ml) on product page and cards (components/SizeSelect.tsx).
6. Celeb's Choice page + nav: /celebs-choice, combos in lib/combos.ts (no celebrity names/photos).
7. Order emails/SMS: not built (later, per client). Success page no longer claims an email was sent (NOTIFICATIONS_LIVE in lib/offers.ts).
Re-run supabase/seed.sql (regenerated) so DB variants say "Attar"; the app also maps old "Pure oil" rows automatically.

# Update: 3 sizes only (30 / 50 / 100 ml)
- Only the three bottles the client shared are sold. ATTARS_ENABLED = false in lib/offers.ts hides the 6 / 12 ml variants everywhere (catalog, DB rows, dropdown, cards, cart). Seed regenerated: 3 variants per product.
- Removed: attar band on home, "Attars from" lines, 6 / 12 ml copy (hero, About, FAQ, footer, meta, offers bar, product page).
- Client comment 2 ("Pure Oil" -> "Attar") now has nothing to apply to while attars are off. To bring them back: set ATTARS_ENABLED = true and re-add the copy.
- The blog post "Attar vs eau de parfum" is still there as general reading; retitle or drop it if the client wants no attar mentions.
