"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pushar/pusher-client";
import { useRouter } from "next/navigation";

export default function SupportAlert() {
  const [hasNew, setHasNew] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const channel = pusherClient.subscribe("admin-support");

    channel.bind("new-support", () => {
      setHasNew(true);
    });

    return () => {
      pusherClient.unsubscribe("admin-support");
    };
  }, []);

  if (!hasNew) return null;

  return (
    <div
      onClick={() => router.push("/admin/chat/support")}
      className="
        fixed bottom-6 right-6 z-50
        cursor-pointer
        rounded-xl bg-red-600 px-4 py-3
        text-sm font-medium text-white
        shadow-lg
        animate-pulse
      "
    >
      🔔 New support message
    </div>
  );
}
