import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supreme Book Depot | Premium Books & Stationery",
  description: "Your one-stop shop for books and stationery items.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Providers>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="bg-[#232f3e] py-12 text-center text-white">
              <div className="container mx-auto px-4">
                <p className="font-bold text-lg mb-2 italic text-[#ff9900]">Supreme Book Depot</p>
                <p className="text-gray-400 text-sm">&copy; 2025 Supreme Book Depot. All rights reserved.</p>
              </div>
            </footer>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
