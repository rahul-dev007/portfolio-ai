"use client";

import { signOut } from "next-auth/react";
import { Menu } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header
      className="
        flex h-14 items-center justify-between
        border-b border-white/10
        bg-black/60 backdrop-blur-xl
        px-4 md:px-6
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Mobile menu icon (future use) */}
        <button className="md:hidden text-white/80">
          <Menu size={20} />
        </button>

        <span className="text-sm font-semibold text-white/80">
          Admin Dashboard
        </span>
      </div>

      {/* RIGHT */}
      <button
        onClick={() => signOut()}
        className="
          rounded-md px-3 py-1.5 text-xs font-semibold
          text-red-400 border border-red-500/30
          hover:bg-red-500 hover:text-white
          transition
        "
      >
        Logout
      </button>
    </header>
  );
}
