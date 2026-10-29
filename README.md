# Perfume Darbar (Next.js 15, App Router, Tailwind v4)

    npm install && npm run dev    # http://localhost:3000

Deploy the storefront: push to GitHub and import in Vercel. No env vars are needed for the demo.

## What is real and what is fake
- Catalog, reviews, ratings, "sold" counts, account and order pages are **fake data** (`lib/products.ts`, `lib/content.ts`).
- Cart and wishlist live in the browser's localStorage. Checkout does not charge anyone.
- Product photos: `public/products/<slug>.jpg`. All 30 bottle perfumes have a generated mockup photo. The 3 attars and
  3 gift sets have none yet and show an illustrated bottle.
  See `public/products/README.txt` and `public/categories/README.txt`.

## SEO
Domain is set in `lib/site.ts` (https://perfumedarbar.com). `app/sitemap.ts` serves /sitemap.xml and
`app/robots.ts` serves /robots.txt (cart, checkout, account, login, orders and wishlist are not indexed).

## Catalog: Supabase with built-in fallback
The shop loads its products from Supabase when these are set, and from the built-in catalog (`lib/products.ts`,
36 products + 30 samples) when they are not, or when Supabase is unreachable. So the site never goes blank.

1. Create a Supabase project. In the SQL editor run `supabase/schema.sql`, then `supabase/seed.sql`.
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
Samples are separate rows with `is_sample = true` and slug `<slug>-sample`.

## Backend API (optional)
`backend/` is a FastAPI service for work that needs the service-role key: order creation with server-side prices.

       cd backend && python -m venv venv && source venv/bin/activate
       pip install -r requirements.txt && cp .env.example .env   # add the service-role key here ONLY
       uvicorn main:app --reload --port 8000
Run the storefront with `API_URL=http://localhost:8000 npm run dev` to proxy `/api/*` to it. Deploy it separately
(Render, Railway, Fly) and set `API_URL` on Vercel. Endpoints: `GET /api/health`, `GET /api/products`,
`GET /api/products/{slug}`, `POST /api/orders`. Checkout in the storefront is still a demo and does not call it yet.
