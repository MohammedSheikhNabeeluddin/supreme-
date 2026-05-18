"use client";

import Image from "next/image";
import Link from "next/link";
import { store } from "@/lib/store";
import { Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Suspense, useState, useEffect } from "react";
import { getProducts, seed } from "@/lib/actions-client";

function ProductList() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const search = searchParams.get("search");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await seed();
        const p = await getProducts(categoryId || undefined, search || undefined);
        setProducts(p);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [categoryId, search]);

  const filteredProducts = products;

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading products...</div>;
  }

  return (
    <>
      {/* Product Grid */}
      <h3 className="mb-6 text-2xl font-bold">
        {categoryId ? "Filtered Results" : "Featured Products"}
      </h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => {
          const hasDiscount = product.discount && product.discount > 0;
          const discountedPrice = hasDiscount
            ? product.price * (1 - product.discount! / 100)
            : product.price;

          let images = [];
          try {
            images = JSON.parse(product.images);
          } catch {
            images = ["https://images.unsplash.com/photo-1544640808-32ca72ac7f67?w=400"];
          }
          return (
            <div key={product.id} className="group flex flex-col overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg">
              <Link href={`/product/${product.id}`} className="relative h-64 w-full bg-gray-100">
                <img
                  src={images[0]}
                  alt={product.name}
                  className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
                />
                {hasDiscount && (
                  <span className="absolute top-2 left-2 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {product.discount}% OFF
                  </span>
                )}
              </Link>

              <div className="flex flex-1 flex-col p-4">
                <Link href={`/product/${product.id}`} className="mb-2 text-lg font-medium text-blue-600 hover:text-orange-600 hover:underline">
                  {product.name}
                </Link>

                <div className="mb-2 flex items-center gap-1 text-orange-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-xs text-gray-500">(1,234)</span>
                </div>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">${discountedPrice.toFixed(2)}</span>
                    {hasDiscount && (
                      <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">FREE delivery Tomorrow</p>

                  <button
                    onClick={() => {
                      addToCart(product);
                      alert("Added to cart!");
                    }}
                    className="mt-4 w-full rounded-full bg-[#ffd814] py-2 text-sm font-bold shadow hover:bg-[#f7ca00] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-xl text-gray-500">No products found in this category.</p>
          <Link href="/" className="mt-4 text-blue-600 hover:underline">View all products</Link>
        </div>
      )}
    </>
  );
}

export default function Home() {

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner */}
      <div className="relative mb-8 h-48 w-full overflow-hidden rounded-lg bg-[#febd69] sm:h-64">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <h2 className="text-3xl font-bold text-[#232f3e] sm:text-5xl">Reading is a Journey</h2>
          <p className="mt-2 text-lg text-[#232f3e] sm:text-xl">Discover your next favorite book today.</p>
          <button className="mt-4 rounded-full bg-[#131921] px-6 py-2 font-bold text-white hover:bg-black">
            Shop Now
          </button>
        </div>
      </div>

      <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
