"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pushar/pusher-client";

export default function AdminSupportPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeThreadId = searchParams.get("threadId");

  const [threads, setThreads] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const loadThreads = async () => {
    const res = await fetch("/api/support/admin/threads");
    const data = await res.json();
    setThreads(data);
  };

  useEffect(() => {
    loadThreads();
  }, []);

  useEffect(() => {
    if (!activeThreadId) return;

    fetch(`/api/support/admin/messages?threadId=${activeThreadId}`)
      .then((res) => res.json())
      .then(setMessages);

    // 🔥 auto mark read
    fetch("/api/support/admin/mark-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId: activeThreadId }),
    });

  }, [activeThreadId]);

  useEffect(() => {
    if (!activeThreadId) return;

    const channel = pusherClient.subscribe(
      `support-thread-${activeThreadId}`
    );

    channel.bind("new-message", (msg: any) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });

      loadThreads(); // 🔥 refresh inbox

      if (msg.sender === "USER") {
        fetch("/api/support/admin/mark-read", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ threadId: activeThreadId }),
        });
      }
    });

    return () => {
      pusherClient.unsubscribe(
        `support-thread-${activeThreadId}`
      );
    };
  }, [activeThreadId]);

 const sendReply = async () => {
  if (!text.trim() || !activeThreadId) return;

  await fetch("/api/support/admin-reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      threadId: activeThreadId,
      content: text,
    }),
  });

  setText("");
};


  return (
    <div className="grid h-full grid-cols-3 gap-6">
      {/* Inbox */}
      <div className="col-span-1 rounded-xl bg-white/5 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">
          Support Inbox
        </h3>

        {threads.map((t) => (
          <div
            key={t.id}
            onClick={() =>
              router.push(`/admin/chat/support?threadId=${t.id}`)
            }
            className={`cursor-pointer rounded-lg p-3 ${
              t.id === activeThreadId
                ? "bg-white/20"
                : "hover:bg-white/10"
            }`}
          >
            <p className="text-xs text-white/60">
              {t.subject ?? "Guest"}
            </p>
            <p className="truncate text-sm text-white">
              {t.messages?.[0]?.content}
            </p>
            {t._count?.messages > 0 && (
              <span className="text-xs text-red-400">
                {t._count.messages} new
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="col-span-2 flex flex-col rounded-xl bg-white/5">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[70%] rounded-xl px-3 py-2 text-sm ${
                m.sender === "ADMIN"
                  ? "ml-auto bg-blue-600 text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              {m.content}
            </div>
          ))}
          <div id="chat-bottom" />
        </div>

        <div className="flex gap-2 border-t border-white/10 p-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-md bg-white/10 px-3 py-2 text-sm text-white outline-none"
          />
          <button
            onClick={sendReply}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
