"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  ChevronDown,
  LogOut,
  User,
  Bell,
  Menu,
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  LifeBuoy,
} from "lucide-react";
import Link from "next/link";
import { pusherClient } from "@/lib/pushar/pusher-client";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "PDF Knowledge", href: "/admin/pdf", icon: FileText },
  { label: "Contact Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Support Chat", href: "/admin/chat/support", icon: LifeBuoy },
];

export default function AdminTopbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const fetchUnread = async () => {
    const res = await fetch("/api/support/admin/unread-count", {
      cache: "no-store",
    });
    const data = await res.json();
    setUnread(data.count || 0);
  };

  useEffect(() => {
    fetchUnread();

    const channel = pusherClient.subscribe("admin-support");

    channel.bind("new-support", () => {
      fetchUnread();
    });

    return () => {
      pusherClient.unsubscribe("admin-support");
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4">

        {/* LEFT - ONLY ONE ICON IN MOBILE */}
        <div className="relative">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-cyan-400 md:hidden"
          >
            <Menu size={22} />
          </button>

          {/* DROPDOWN */}
          {menuOpen && (
            <div className="absolute left-0 mt-3 w-60 rounded-xl bg-gradient-to-br from-[#111] to-[#1a1a2e] border border-cyan-400/20 shadow-xl p-3 space-y-1 md:hidden">

              {adminLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/80 transition hover:bg-cyan-500/10 hover:pl-5"
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}

            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* 🔔 RED BELL */}
          <Link href="/admin/chat/support" className="relative">
            <Bell className="text-red-500 hover:text-red-400 transition" />
            {unread > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {unread}
              </span>
            )}
          </Link>

          {/* USER */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-white/80 border border-white/10"
            >
              <User size={16} />
              ADMIN
              <ChevronDown size={14} />
            </button>

            {userOpen && (
              <div className="absolute right-0 mt-3 w-44 rounded-xl border bg-black">
                <button
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: "/admin-login",
                    })
                  }
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
