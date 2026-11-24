export const SITE_URL = "https://perfumedarbar.com";
// Product photos are public/products/<slug>-<p30|p50|p100>.webp (4:5), made by scripts/make_photos.py from the client's
// bottle photos. If one is missing, the drawn bottle (components/Bottle.tsx) is shown instead. image_url in Supabase wins.
export const USE_PRODUCT_PHOTOS = true;
