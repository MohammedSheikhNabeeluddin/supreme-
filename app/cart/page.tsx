"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <ShoppingBag className="h-20 w-20 text-gray-300" />
          <h2 className="mt-4 text-2xl font-bold">Your Cart is empty</h2>
          <p className="mt-2 text-gray-600">Check out some books and stationery!</p>
          <Link href="/" className="mt-6 rounded-md bg-[#ffd814] px-8 py-2 font-medium hover:bg-[#f7ca00]">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-9">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
            <div className="hidden border-b pb-2 text-right text-sm text-gray-500 md:block">Price</div>

            <div className="divide-y">
              {items.map((item) => {
                const product = item.product;
                const hasDiscount = product.discount && product.discount > 0;
                const price = hasDiscount
                  ? product.price * (1 - product.discount! / 100)
                  : product.price;

                return (
                  <div key={product.id} className="flex flex-col py-6 md:flex-row md:items-start">
                    <Link href={`/product/${product.id}`} className="mb-4 h-44 w-44 flex-shrink-0 md:mb-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col px-0 md:px-6">
                      <Link href={`/product/${product.id}`} className="text-xl font-medium text-blue-600 hover:text-orange-600 hover:underline">
                        {product.name}
                      </Link>
                      <p className="mt-1 text-sm text-green-700">In Stock</p>
                      <p className="mt-1 text-xs text-gray-500">Eligible for FREE Shipping</p>

                      <div className="mt-4 flex items-center gap-4">
                        <select
                          className="rounded border bg-gray-50 px-2 py-1 text-sm"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <option key={n} value={n}>Qty: {n}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 text-right md:mt-0">
                      <p className="text-xl font-bold">${price.toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t pt-4 text-right">
              <p className="text-xl">
                Subtotal ({totalItems} items): <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Card */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm text-green-700">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-700 text-[10px] text-white">✓</div>
              <p>Your order qualifies for FREE Shipping.</p>
            </div>

            <p className="mb-4 text-xl">
              Subtotal ({totalItems} items): <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </p>

            <button className="w-full rounded-full bg-[#ffd814] py-2 text-sm font-medium shadow hover:bg-[#f7ca00]">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
