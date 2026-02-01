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
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [open, setOpen] = useState(false);

  function handleLogout() {
    setOpen(false);
    signOut({
      redirect: true,
      callbackUrl: "/admin-login",
    });
  }

  return (
    <header className="sticky top-0 z-50 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-fuchsia-900/60 animate-gradient-x" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.35),transparent_60%)]" />
      <div className="absolute inset-0 -z-20 backdrop-blur-xl bg-black/40" />

      {/* TOP BORDER */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 animate-gradient-x" />

      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* LOGO */}
        <Link
          href="/"
          className="text-lg font-extrabold tracking-widest uppercase bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"
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
                    "text-sm uppercase transition",
                    active
                      ? "text-white"
                      : "text-white/70 group-hover:text-white"
                  )}
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    "absolute -bottom-2 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 transition-all duration-500",
                    active && "w-full",
                    !active && "group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}

          {isAdmin && (
            <Link href="/admin/dashboard" className="text-sm text-white/70 hover:text-white">
              Admin
            </Link>
          )}
        </div>

        {/* DESKTOP LOGIN / LOGOUT */}
        <div className="hidden md:block">
          {status === "loading" ? null : session ? (
            <button
              onClick={handleLogout}
              className="rounded-md border border-red-500/40 px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/admin-login"
              className="rounded-md px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 hover:scale-105 transition"
            >
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
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10">
          <div className="flex flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-fuchsia-500/20"
              >
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-emerald-500/20"
              >
                Admin Dashboard
              </Link>
            )}

            <div className="pt-3 border-t border-white/10">
              {session ? (
                <button
                  onClick={handleLogout}
                  className="w-full rounded-md px-3 py-2 text-sm text-red-400 hover:bg-red-500/20"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/admin-login"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-md px-3 py-2 text-center text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500"
                >
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
