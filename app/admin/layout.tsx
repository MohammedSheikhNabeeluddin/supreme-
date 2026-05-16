"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAdmin, logout } from "@/lib/auth-client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAdmin();
      setAuthenticated(isAuth);
      if (!isAuth && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (authenticated === null) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (authenticated === false) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-[#1e293b] text-white flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="text-xl font-bold">Admin Portal</span>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-700 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                {isSidebarOpen && isActive && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 p-3 w-full text-slate-400 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Store Owner</p>
              <p className="text-xs text-gray-500">owner@bookstation.com</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              SO
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
