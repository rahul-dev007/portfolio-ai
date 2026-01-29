"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
} from "lucide-react";

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "PDF Knowledge",
    href: "/admin/pdf",
    icon: FileText,
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden md:flex w-64 flex-col
        border-r border-white/10
        bg-black/60 backdrop-blur-xl
      "
    >
      {/* BRAND */}
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

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {adminLinks.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                `
                  flex items-center gap-3 rounded-md px-3 py-2
                  text-sm transition
                `,
                active
                  ? "bg-white/10 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
