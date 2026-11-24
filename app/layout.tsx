import type { Metadata } from "next";
import { Rozha_One, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import CatalogProvider from "@/components/CatalogContext";
import { getCatalog } from "@/lib/catalog";
import CartProvider from "@/components/CartContext";
import WishlistProvider from "@/components/WishlistContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const display = Rozha_One({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Perfume Darbar | Perfumes from India", template: "%s" },
  description: "Perfumes, shipped across India. 100 fragrances in 30, 50 and 100 ml.",
  openGraph: { type: "website", siteName: "Perfume Darbar", url: SITE_URL, title: "Perfume Darbar | Perfumes from India", description: "Perfumes, shipped across India. 100 fragrances in 30, 50 and 100 ml.", images: ["/og.jpg"] },
};
export const revalidate = 60; // re-read the catalog from Supabase at most once a minute

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const catalog = await getCatalog();
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body><CatalogProvider catalog={catalog}><CartProvider><WishlistProvider><Header /><main>{children}</main><Footer /></WishlistProvider></CartProvider></CatalogProvider></body>
    </html>
  );
}
