"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { getProducts, getOrders, getCategories, seed } from "@/lib/actions-client";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        await seed();
        const [p, o, c] = await Promise.all([
          getProducts(),
          getOrders(),
          getCategories(),
        ]);
        setProducts(p);
        setOrders(o);
        setCategories(c);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalRevenue = orders.reduce((sum: number, o: any) => sum + o.total, 0);
  const LOW_STOCK_THRESHOLD = 5;
  const RECENT_ORDERS_LIMIT = 5;

  const lowStockProducts = products.filter((p: any) => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD);
  const recentOrders = orders.slice(0, RECENT_ORDERS_LIMIT);

  const stats = [
    {
      name: "Total Revenue",
      value: loading ? "…" : `₹${totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      name: "Orders",
      value: loading ? "…" : String(orders.length),
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      name: "Products",
      value: loading ? "…" : String(products.length),
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      name: "Categories",
      value: loading ? "…" : String(categories.length),
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "SHIPPED":
        return "bg-blue-100 text-blue-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4"
          >
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Orders</h3>
            <Link
              href="/admin/orders"
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading…</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-gray-400 text-sm">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center gap-4 py-2 border-b last:border-0"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <ShoppingBag size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{order.customer}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()} · ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${getStatusStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-500" />
              Low Stock Alert
            </h3>
            <Link
              href="/admin/products"
              className="text-sm text-blue-600 hover:underline"
            >
              Manage
            </Link>
          </div>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading…</p>
          ) : lowStockProducts.length === 0 ? (
            <p className="text-gray-400 text-sm">All products are well stocked.</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product: any) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 py-2 border-b last:border-0"
                >
                  <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
                    <Package size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-red-500 font-semibold">
                      Only {product.stock} left in stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
