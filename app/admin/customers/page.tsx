"use client";

import { Users } from "lucide-react";

export default function AdminCustomersPage() {
  return (
    <div className="bg-white p-8 rounded-xl border shadow-sm text-center">
      <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
        <Users size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-2">Customers</h2>
      <p className="text-gray-500">Manage your customer relationships and view their order history here.</p>
      <div className="mt-8 p-12 border-2 border-dashed rounded-lg text-gray-400">
        Customer list component coming soon...
      </div>
    </div>
  );
}
