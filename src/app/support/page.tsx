"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { pusherClient } from "@/lib/pushar/pusher-client";

/* =========================
   Guest ID helper
========================= */
const getGuestId = () => {
  let id = localStorage.getItem("guest_id");
  if (!id) {
    id = `guest_${crypto.randomUUID()}`;
    localStorage.setItem("guest_id", id);
  }
  return id;
};

export default function SupportPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [threadId, setThreadId] = useState<string | null>(null);

  /* =========================
     Realtime subscribe
  ========================= */
  useEffect(() => {
    if (!threadId) return;

    const channel = pusherClient.subscribe(
      `support-thread-${threadId}`
    );

    channel.bind("new-message", (msg: any) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    return () => {
      pusherClient.unsubscribe(
        `support-thread-${threadId}`
      );
    };
  }, [threadId]);

  /* =========================
     Send message
  ========================= */
  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await fetch("/api/support/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: text,
        guestId: getGuestId(),
      }),
    });

    const data = await res.json();

    setMessages((prev) => {
      if (prev.some((m) => m.id === data.message.id)) return prev;
      return [...prev, data.message];
    });

    setText("");

    if (!threadId) {
      setThreadId(data.threadId);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-5rem)] max-w-md flex-col rounded-2xl border border-white/10 bg-[#0b0b12] shadow-xl">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <button
          onClick={() => router.push("/")}
          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h2 className="text-sm font-semibold text-white">
            Support Chat
          </h2>
          <p className="text-xs text-white/50">
            We usually reply within a few minutes
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
              m.sender === "USER"
                ? "ml-auto bg-blue-600 text-white"
                : "bg-white/10 text-white"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 px-3 py-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
