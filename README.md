# Perfume Darbar (Next.js 15, App Router, Tailwind v4)

    npm install && npm run dev    # http://localhost:3000

Deploy the storefront: push to GitHub and import in Vercel. No env vars are needed for the demo.

## What is real and what is fake
- The catalog is the 100-fragrance Perfume Darbar Ponda price list (effective 1 Sep 2026): each fragrance in pure oil
  (6 ml, 12 ml) and perfume (30, 50, 100 ml). Fragrance names on the site are Perfume Darbar's own public names.
- Still placeholders: reviews, ratings, "sold" counts, account and order pages, free shipping (Rs 3,999), shipping fee
  (Rs 149), prepaid discount (Rs 50), COD limit (Rs 10,000), phone number, returns/FAQ wording. Check `lib/offers.ts`, `lib/content.ts`.
- Cart and wishlist live in the browser's localStorage. Checkout does not charge anyone.
- All imagery (products, gallery views, banners, categories, blog, collections) is generated from the real bottle
  photo, so there are no illustrated placeholders left. Replace any file with real photography using the same name
  (see `public/products/README.txt` and `public/categories/README.txt`). Photos are mockups on the single 50 ml bottle.

## SEO
Domain is set in `lib/site.ts` (https://perfumedarbar.com). `app/sitemap.ts` serves /sitemap.xml and
`app/robots.ts` serves /robots.txt (cart, checkout, account, login, orders and wishlist are not indexed).

## Catalog: Supabase with built-in fallback
The shop loads its products from Supabase when these are set, and from the built-in catalog (`lib/products.ts`,
the same 100 products) when they are not, or when Supabase is unreachable. So the site never goes blank.

1. Create a Supabase project. In the SQL editor run `supabase/schema.sql`, then `supabase/seed.sql`.
   If you ran an older schema before, run `supabase/reset.sql` first (it drops the old tables and orders).
2. Copy `.env.local.example` to `.env.local` (and add the same two values in Vercel > Settings > Environment Variables):
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Done. Edit a product's price, name, tag or `is_active` in the Supabase table editor and the site updates within
   about a minute (the catalog is cached for 60 s). Console logs `[catalog] Supabase unavailable` if it falls back.

How it works: `lib/catalog.ts` (server) reads the `products` table through `lib/supabaseClient.ts` (anon key, read-only by
Row Level Security) and the layout hands the result to every page and to client components (`components/CatalogContext.tsx`).
If a refresh fails, the last good data keeps being served.

### Adding a product
Insert a row in Supabase (or add a row in `lib/products.ts` and re-run `npx tsx scripts/make-seed.mts` to regenerate `seed.sql`).
Photo: put `public/products/<slug>.jpg` (4:5, ~1000x1250), or set `image_url` to any full URL (e.g. Supabase Storage).
Each product row has a `variants` jsonb array: `[{id:"o6",kind:"Pure oil",size:"6 ml",price:150}, ... p100]`.

## Backend API (optional)
`backend/` is a FastAPI service for work that needs the service-role key: order creation with server-side prices.

       cd backend && python -m venv venv && source venv/bin/activate
       pip install -r requirements.txt && cp .env.example .env   # add the service-role key here ONLY
       uvicorn main:app --reload --port 8000
Run the storefront with `API_URL=http://localhost:8000 npm run dev` to proxy `/api/*` to it. Deploy it separately
(Render, Railway, Fly) and set `API_URL` on Vercel. Endpoints: `GET /api/health`, `GET /api/products`,
`GET /api/products/{slug}`, `POST /api/orders`. Checkout in the storefront is still a demo and does not call it yet.
