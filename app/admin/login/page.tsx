"use client";

import { useState } from "react";
import { login } from "@/lib/auth-client";
import { Lock, BookOpen } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(password);
      if (success) {
        window.location.href = "/admin/products";
      } else {
        setError("Invalid admin password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <BookOpen className="h-12 w-12 text-[#ff9900]" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Admin Portal</h2>
          <p className="mt-2 text-sm text-gray-600">Please enter your password to continue</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center rounded-lg bg-[#131921] py-3 text-sm font-bold text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#ff9900] disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
