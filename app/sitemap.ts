import type { MetadataRoute } from "next";
import { products, collections } from "@/lib/products";
import { posts } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const b = "https://perfumedarbar.in";
  return [...["", "/shop", "/brands", "/collections", "/blog", "/contact", "/faq", "/about", "/track-order"].map((p) => ({ url: b + p })), ...products.map((p) => ({ url: `${b}/product/${p.slug}` })), ...collections.map((c) => ({ url: `${b}/collections/${c.slug}` })), ...posts.map((p) => ({ url: `${b}/blog/${p.slug}` }))];
}
