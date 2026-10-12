import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });
export const metadata: Metadata = { title: "Perfume Darbar | Perfume for the best part of your day", description: "Everyday perfumes sorted by scent and occasion. Free shipping above ₹1,999." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${display.variable} ${sans.variable}`}><body><CartProvider><Header /><main>{children}</main><Footer /></CartProvider></body></html>);
}
