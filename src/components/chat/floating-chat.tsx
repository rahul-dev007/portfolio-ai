"use client";

import { MessageCircle } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function FloatingChat() {
  const router = useRouter();
  const pathname = usePathname();

  // ❌ Admin pages এ chat icon দেখাবে না
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <button
      onClick={() => router.push("/support")}
      aria-label="Open support chat"
      className="
        fixed
        top-1/2 right-6
        -translate-y-1/2
        z-50

        flex h-14 w-14 items-center justify-center
        rounded-full

        bg-gradient-to-br from-cyan-500 to-blue-600
        text-white

        shadow-[0_12px_35px_rgba(59,130,246,0.75)]
        ring-1 ring-white/30

        transition
        hover:scale-110
        active:scale-95

        animate-bounce
      "
    >
      <MessageCircle size={26} />
    </button>
  );
}
