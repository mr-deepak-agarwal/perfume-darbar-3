import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/CartContext";
import WishlistProvider from "@/components/WishlistContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
export const metadata: Metadata = { title: "Perfume Darbar | Small-batch perfumes", description: "Niche perfumes blended in India. Free shipping above ₹3,999." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body><CartProvider><WishlistProvider><Header /><main>{children}</main><Footer /></WishlistProvider></CartProvider></body>
    </html>
  );
}
