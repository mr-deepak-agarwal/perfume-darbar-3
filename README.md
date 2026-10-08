# Perfume Darbar – Store v1 (Next.js 15, App Router, Tailwind v4)
npm install && npm run dev    # http://localhost:3000
Deploy: push to GitHub, import in Vercel (no env vars).

## Real photos
Put product photos in public/products/ named by slug (see public/products/README.txt for all 24 filenames).
Optional: public/hero.jpg and public/categories/*.jpg (see public/categories/README.txt).
Any missing photo falls back to an illustrated bottle, so you can add them gradually.

## Data
Catalog: lib/products.ts (24 products, 6 brands, 6 collections). Blog, FAQ, policies: lib/content.ts.
Cart and wishlist use localStorage. Checkout, login, account and orders use demo data.
