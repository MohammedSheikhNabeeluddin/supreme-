"use client";

import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="bg-white p-8 rounded-xl border shadow-sm text-center">
      <div className="mx-auto w-16 h-16 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mb-4">
        <Settings size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-2">Settings</h2>
      <p className="text-gray-500">Configure your store settings, payment gateways, and admin preferences.</p>
      <div className="mt-8 p-12 border-2 border-dashed rounded-lg text-gray-400">
        Settings management component coming soon...
      </div>
    </div>
  );
}
