"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "AI Chat", href: "/chat" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 overflow-hidden">
      {/* 🎮 GAME BACKGROUND */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-fuchsia-900/60 animate-gradient-x" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.35),transparent_60%)]" />
      <div className="absolute inset-0 -z-20 backdrop-blur-xl bg-black/40" />

      {/* TOP NEON BORDER */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 animate-gradient-x" />

      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <Link
          href="/"
          className="text-lg font-extrabold tracking-widest uppercase bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(236,72,153,0.9)]"
        >
          Portfolio AI
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link key={item.href} href={item.href} className="relative group">
                <span
                  className={cn(
                    "text-sm uppercase tracking-wide transition",
                    active
                      ? "text-white"
                      : "text-white/70 group-hover:text-white"
                  )}
                >
                  {item.label}
                </span>

                {/* LIQUID NEON BAR */}
                <span
                  className={cn(
                    "absolute -bottom-2 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 shadow-[0_0_15px_rgba(236,72,153,1)] transition-all duration-500",
                    active && "w-full",
                    !active && "group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}

          {isAdmin && (
            <Link href="/admin/dashboard" className="relative group">
              <span className="text-sm uppercase tracking-wide text-white/70 group-hover:text-white">
                Admin
              </span>
              <span className="absolute -bottom-2 left-1/2 h-[3px] w-0 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_14px_rgba(34,211,238,1)] transition-all duration-500 group-hover:w-full" />
            </Link>
          )}
        </div>

        {/* 🎮 CRAZY LOGIN / LOGOUT */}
        <div className="hidden md:block">
          {session ? (
            <button
              onClick={() => signOut()}
              className="rounded-md border border-red-500/40 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.8)] active:scale-95"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/admin/login"
              className="
                relative inline-flex items-center justify-center
                overflow-hidden rounded-md px-5 py-2
                text-sm font-bold uppercase tracking-widest text-white
                bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
                bg-[length:300%_300%] animate-gradient-x
                shadow-[0_0_30px_rgba(236,72,153,1)]
                transition-all duration-300
                hover:scale-110
                active:scale-95
              "
            >
              {/* POWER CORE */}
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 blur-2xl opacity-80 animate-pulse" />
              LOGIN
            </Link>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10">
          <div className="flex flex-col gap-3 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-fuchsia-500/20 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
