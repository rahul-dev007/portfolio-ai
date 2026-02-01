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

  /* =========================
     Load inbox threads
  ========================= */
  useEffect(() => {
    fetch("/api/support/admin/threads")
      .then((res) => res.json())
      .then((data) => {
        setThreads(data);

        // 🔥 auto-select latest thread if none selected
        if (!activeThreadId && data.length > 0) {
          router.replace(
            `/admin/chat/support?threadId=${data[0].id}`
          );
        }
      });
  }, [activeThreadId, router]);

  /* =========================
     Load messages for active thread
  ========================= */
  useEffect(() => {
    if (!activeThreadId) return;

    setMessages([]);

    fetch(
      `/api/support/admin/messages?threadId=${activeThreadId}`
    )
      .then((res) => res.json())
      .then(setMessages);
  }, [activeThreadId]);

  /* =========================
     Realtime subscribe
  ========================= */
  useEffect(() => {
    if (!activeThreadId) return;

    const channel = pusherClient.subscribe(
      `support-thread-${activeThreadId}`
    );

    channel.bind("new-message", (msg: any) => {
      setMessages((prev) => [...prev, msg]);
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
      {/* ================= INBOX ================= */}
      <div className="col-span-1 rounded-xl bg-white/5 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">
          Support Inbox
        </h3>

        {threads.length === 0 && (
          <p className="text-xs text-white/50">
            No conversations yet
          </p>
        )}

        <div className="space-y-2">
          {threads.map((t) => (
            <div
              key={t.id}
              onClick={() =>
                router.push(
                  `/admin/chat/support?threadId=${t.id}`
                )
              }
              className={`cursor-pointer rounded-lg p-3 transition ${
                t.id === activeThreadId
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              <p className="text-xs text-white/60">
                {t.subject ?? "Guest user"}
              </p>
              <p className="truncate text-sm text-white">
                {t.messages?.[0]?.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CHAT ================= */}
      <div className="col-span-2 flex flex-col rounded-xl bg-white/5">
        {!activeThreadId ? (
          <div className="flex h-full items-center justify-center text-white/50">
            Select a conversation from the inbox
          </div>
        ) : (
          <>
            <div className="border-b border-white/10 px-4 py-3 text-sm text-white">
              Active Support Chat
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
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
            </div>

            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Reply..."
                className="flex-1 rounded-md bg-white/10 px-3 py-2 text-sm text-white outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendReply();
                }}
              />
              <button
                onClick={sendReply}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
