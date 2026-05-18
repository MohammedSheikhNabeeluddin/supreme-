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
          <span className="hidden sm:inline">Supreme Book Depot</span>
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
      <div className="bg-[#232f3e] px-4 py-2 overflow-x-auto">
        <div className="container mx-auto flex items-center gap-6 text-sm font-medium whitespace-nowrap">
          <button className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white p-1">
            <Menu className="h-5 w-5" /> All
          </button>
          <Link href="/?category=cat-bio" className="hover:outline hover:outline-1 hover:outline-white p-1">Biographies</Link>
          <Link href="/?category=cat-cbse" className="hover:outline hover:outline-1 hover:outline-white p-1">CBSE Books</Link>
          <Link href="/?category=cat-coll" className="hover:outline hover:outline-1 hover:outline-white p-1">College Books</Link>
          <Link href="/?category=cat-comp" className="hover:outline hover:outline-1 hover:outline-white p-1">Competitive Exam</Link>
          <Link href="/?category=cat-kids" className="hover:outline hover:outline-1 hover:outline-white p-1">Kids Books</Link>
          <Link href="/?category=cat-novels" className="hover:outline hover:outline-1 hover:outline-white p-1">Novels</Link>
          <Link href="/?category=cat-rel" className="hover:outline hover:outline-1 hover:outline-white p-1">Religious</Link>
          <Link href="/?category=cat-story" className="hover:outline hover:outline-1 hover:outline-white p-1">Story Books</Link>
          <Link href="/?category=cat-stat" className="hover:outline hover:outline-1 hover:outline-white p-1 font-bold text-[#ff9900]">Stationery</Link>
        </div>
      </div>
    </header>
  );
}
