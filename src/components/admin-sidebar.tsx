"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Projects", href: "/admin/projects" },
  { label: "PDF Knowledge", href: "/admin/pdf" },
  { label: "Messages", href: "/admin/messages" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r min-h-screen p-4">
      <h2 className="font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-2">
        {adminLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block px-3 py-2 rounded text-sm",
              pathname === item.href
                ? "bg-muted font-semibold"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
