"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { User, LogOut } from "lucide-react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="text-[10px]">Hello, {session.user?.name}</span>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1 text-sm font-bold hover:text-[#ff9900]"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
        {session.user?.image ? (
          <img src={session.user.image} alt="" className="h-8 w-8 rounded-full border-2 border-white" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {session.user?.name?.charAt(0)}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex flex-col hover:text-[#ff9900]"
    >
      <span className="text-[10px]">Hello, Sign in</span>
      <span className="text-sm font-bold flex items-center gap-1">
        <User size={16} /> Account
      </span>
    </button>
  );
}
