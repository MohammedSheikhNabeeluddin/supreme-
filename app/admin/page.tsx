"use client";

import {
  Users,
  Package,
  ShoppingBag,
  TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Sales", value: "$12,845", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
    { name: "Orders", value: "156", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Products", value: "42", icon: Package, color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Customers", value: "892", icon: Users, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
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
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-2 border-b last:border-0">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <Users size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New customer registered</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-bold mb-4">Low Stock Alert</h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 py-2 border-b last:border-0">
                <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                  <Package size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Product name is running low</p>
                  <p className="text-xs text-gray-500">5 items left in stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
