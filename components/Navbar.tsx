"use client";

import Link from "next/link";
import { Search, ShoppingCart, BookOpen, Menu } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#131921] text-white">
      <div className="container mx-auto flex h-16 items-center px-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <BookOpen className="h-8 w-8 text-[#ff9900]" />
          <span className="hidden sm:inline">BookStation</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-1 items-center">
          <div className="relative flex w-full">
            <input
              type="text"
              placeholder="Search books, stationery..."
              className="h-10 w-full rounded-l-md px-4 text-black focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="flex h-10 w-12 items-center justify-center rounded-r-md bg-[#febd69] text-black hover:bg-[#f3a847]">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Right Nav */}
        <nav className="flex items-center gap-6">
          <Link href="/admin/products" className="hidden text-sm font-medium hover:text-[#ff9900] md:block">
            Admin
          </Link>
          <AuthButton />
          <Link href="/cart" className="relative flex items-center gap-1">
            <ShoppingCart className="h-8 w-8" />
            <span className="absolute -top-1 right-8 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff9900] text-xs font-bold text-black">
              {totalItems}
            </span>
            <span className="hidden text-sm font-bold sm:inline">Cart</span>
          </Link>
        </nav>
      </div>

      {/* Sub-nav */}
      <div className="bg-[#232f3e] px-4 py-2">
        <div className="container mx-auto flex items-center gap-6 text-sm font-medium">
          <button className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white p-1">
            <Menu className="h-5 w-5" /> All
          </button>
          <Link href="/?category=1" className="hover:outline hover:outline-1 hover:outline-white p-1">Fiction</Link>
          <Link href="/?category=2" className="hover:outline hover:outline-1 hover:outline-white p-1">Textbooks</Link>
          <Link href="/?category=3" className="hover:outline hover:outline-1 hover:outline-white p-1">Pens</Link>
          <Link href="/?category=4" className="hover:outline hover:outline-1 hover:outline-white p-1">Notebooks</Link>
          <Link href="/?category=5" className="hover:outline hover:outline-1 hover:outline-white p-1">Stationery</Link>
        </div>
      </div>
    </header>
  );
}
