import type { MetadataRoute } from "next";
import { collections } from "@/lib/products";
import { getCatalog } from "@/lib/catalog";
import { posts, policies } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

// Only public, indexable pages. Cart, checkout, account, login, order and wishlist are
// private/per-user and are excluded here and disallowed in robots.ts.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products } = await getCatalog();
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" = "weekly") => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page("", 1, "daily"),
    page("/shop", 0.9, "daily"),
    page("/quiz", 0.7, "monthly"),
    page("/collections", 0.7),
    ...collections.map((c) => page(`/collections/${c.slug}`, 0.8)),
    ...products.map((p) => page(`/product/${p.slug}`, 0.9)),
    page("/blog", 0.6),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.5, "monthly")),
    page("/about", 0.4, "monthly"),
    page("/contact", 0.4, "monthly"),
    page("/faq", 0.5, "monthly"),
    page("/track-order", 0.3, "monthly"),
    ...Object.keys(policies).map((s) => page(`/help/${s}`, 0.3, "monthly")),
  ];
}
