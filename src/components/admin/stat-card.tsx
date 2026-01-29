"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: string;
  href?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  gradient,
  href,
}: StatCardProps) {
  const CardContent = (
    <div
      className={cn(
        `
        relative overflow-hidden rounded-2xl p-5
        border border-white/10 bg-white/5
        shadow-[0_0_30px_rgba(236,72,153,0.25)]
        transition
        hover:scale-[1.03]
        cursor-pointer
        `,
        gradient
      )}
    >
      {/* ICON */}
      <div className="mb-4 text-white/80">{icon}</div>

      {/* VALUE */}
      <div className="text-3xl font-extrabold text-white">
        {value}
      </div>

      {/* TITLE */}
      <p className="mt-1 text-sm text-white/70">
        {title}
      </p>
    </div>
  );

  if (!href) return CardContent;

  return (
    <Link href={href} className="block">
      {CardContent}
    </Link>
  );
}
