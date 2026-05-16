"use client";

import { useState, useEffect } from "react";
import { store } from "@/lib/store";
import { Order } from "@/lib/mock-data";
import {
  Search,
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Seed an order if none exist for demo
    if (store.getOrders().length === 0) {
      store.createOrder({
        customer: "John Doe (john@example.com)",
        total: 35.98,
        status: "PENDING",
        items: [
          { id: "oi1", productId: "p1", quantity: 1, price: 15.99 },
          { id: "oi2", productId: "p4", quantity: 1, price: 19.99 }
        ]
      });
    }
    setOrders([...store.getOrders()]);
  }, []);

  const handleStatusChange = (id: string, status: Order['status']) => {
    store.updateOrderStatus(id, status);
    setOrders([...store.getOrders()]);
  };

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "SHIPPED": return "bg-blue-100 text-blue-700 border-blue-200";
      case "DELIVERED": return "bg-green-100 text-green-700 border-green-200";
      case "CANCELLED": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case "PENDING": return <Clock size={14} />;
      case "SHIPPED": return <Truck size={14} />;
      case "DELIVERED": return <CheckCircle size={14} />;
      case "CANCELLED": return <XCircle size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-gray-600 text-sm">Order ID</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Customer</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Total</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-blue-600">#{order.id}</td>
                <td className="p-4 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-gray-900 font-medium">{order.customer}</td>
                <td className="p-4 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <select
                      className="text-xs border rounded p-1 focus:outline-none bg-white"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    >
                      <option value="PENDING">Set Pending</option>
                      <option value="SHIPPED">Set Shipped</option>
                      <option value="DELIVERED">Set Delivered</option>
                      <option value="CANCELLED">Set Cancelled</option>
                    </select>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}
