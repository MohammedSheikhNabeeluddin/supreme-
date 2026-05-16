"use client";

import { use, useState } from "react";
import { store } from "@/lib/store";
import { Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart();
  const { id } = use(params);
  const product = store.getProductById(id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    notFound();
  }

  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount! / 100)
    : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-orange-600 hover:underline">Home</Link>
        <span className="mx-2">›</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Images */}
        <div className="lg:col-span-5">
          <div className="rounded-lg border bg-white p-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-auto w-full object-contain max-h-[500px]"
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <Link href="#" className="mt-1 block text-sm font-medium text-blue-600 hover:text-orange-600 hover:underline">
            Visit the Store
          </Link>

          <div className="mt-2 flex items-center gap-1 text-orange-400">
            <div className="flex">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <span className="text-sm font-medium text-blue-600 hover:text-orange-600 hover:underline">456 ratings</span>
          </div>

          <hr className="my-4" />

          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              {hasDiscount && (
                <span className="text-3xl font-light text-red-600">-{product.discount}%</span>
              )}
              <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
            </div>
            {hasDiscount && (
              <p className="text-sm text-gray-500">
                Was: <span className="line-through">${product.price.toFixed(2)}</span>
              </p>
            )}
          </div>

          <div className="space-y-4 text-sm">
            <p className="font-bold">About this item</p>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <ul className="list-inside list-disc space-y-1 text-gray-700">
              <li>High-quality materials</li>
              <li>Perfect for daily use</li>
              <li>Sourced responsibly</li>
            </ul>
          </div>
        </div>

        {/* Purchase Card */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 text-2xl font-bold">${discountedPrice.toFixed(2)}</div>

            <p className="mb-2 text-sm text-blue-600 hover:text-orange-600 hover:underline">FREE Returns</p>
            <p className="mb-2 text-sm">FREE delivery <span className="font-bold">Tomorrow</span></p>

            <div className="my-4">
              {product.stock > 0 ? (
                <span className="text-lg font-medium text-green-700">In Stock</span>
              ) : (
                <span className="text-lg font-medium text-red-600">Out of Stock</span>
              )}
            </div>

            <div className="mb-4 flex items-center gap-2">
              <label htmlFor="qty" className="text-sm font-medium">Qty:</label>
              <select
                id="qty"
                className="rounded border bg-gray-50 px-2 py-1 text-sm focus:outline-none"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className="w-full rounded-full bg-[#ffd814] py-2 text-sm font-medium hover:bg-[#f7ca00]"
              >
                Add to Cart
              </button>
              <button className="w-full rounded-full bg-[#ffa41c] py-2 text-sm font-medium hover:bg-[#fa8900]">
                Buy Now
              </button>
            </div>

            <div className="mt-6 space-y-3 border-t pt-4 text-xs">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gray-500" />
                <span>Ships from BookStation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gray-500" />
                <span>Secure transaction</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-gray-500" />
                <span>Return Policy: 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
