"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  Menu,
  ChevronDown,
  LogOut,
  User,
  Zap,
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function AdminTopbar() {
  const [userOpen, setUserOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ===== TOPBAR ===== */}
      <header
        className="
          sticky top-0 z-50
          border-b border-cyan-400/20
          bg-black/70 backdrop-blur-xl
          shadow-[0_0_40px_rgba(34,211,238,0.15)]
        "
      >
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="
                md:hidden p-2 rounded-md
                text-cyan-300
                hover:bg-cyan-500/10
                hover:shadow-[0_0_15px_rgba(34,211,238,0.8)]
                transition
              "
            >
              <Menu size={20} />
            </button>

            <span
              className="
                flex items-center gap-2
                text-sm font-extrabold tracking-widest
                bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
                bg-clip-text text-transparent
                animate-pulse
              "
            >
              <Zap size={14} />
              ADMIN CORE
            </span>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="
                flex items-center gap-2 px-3 py-1.5
                rounded-md
                text-sm text-white/80
                border border-white/10
                hover:border-cyan-400/40
                hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]
                transition
              "
            >
              <User size={16} />
              <span className="hidden sm:block">ADMIN</span>
              <ChevronDown
                size={14}
                className={`transition ${
                  userOpen ? "rotate-180 text-cyan-400" : ""
                }`}
              />
            </button>

            {/* USER DROPDOWN */}
            {userOpen && (
              <div
                className="
                  absolute right-0 mt-3 w-44
                  rounded-xl
                  border border-cyan-400/30
                  bg-black/90 backdrop-blur-xl
                  shadow-[0_0_40px_rgba(236,72,153,0.35)]
                  animate-in fade-in zoom-in-95 slide-in-from-top-2
                "
              >
                <button
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: "/admin-login",
                    })
                  }
                  className="
                    flex w-full items-center gap-3
                    px-4 py-3 text-sm
                    text-red-400
                    hover:bg-red-500/10
                    hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]
                    transition
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ===== MOBILE SIDEBAR ===== */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* BACKDROP */}
          <div
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* SIDEBAR */}
          <aside
            className="
              absolute left-0 top-0 h-full w-64
              bg-[#0b0b12]
              border-r border-cyan-400/20
              shadow-[0_0_40px_rgba(34,211,238,0.25)]
              animate-in slide-in-from-left duration-300
            "
          >
            <div className="px-6 py-5 border-b border-white/10">
              <h2
                className="
                  text-lg font-extrabold tracking-widest uppercase
                  bg-gradient-to-r from-cyan-400 to-fuchsia-500
                  bg-clip-text text-transparent
                "
              >
                Admin Panel
              </h2>
            </div>

            <nav className="px-3 py-4 space-y-1 text-sm">
              {[
                ["Dashboard", "/admin/dashboard", LayoutDashboard],
                ["Projects", "/admin/projects", FolderKanban],
                ["PDF Knowledge", "/admin/pdf", FileText],
                ["Messages", "/admin/messages", MessageSquare],
              ].map(([label, href, Icon]: any) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="
                    flex items-center gap-3
                    rounded-md px-3 py-2
                    text-white/70
                    hover:bg-cyan-500/10
                    hover:text-white
                    hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
                    transition
                  "
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
