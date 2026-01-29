"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

type Msg = {
  role: "user" | "ai";
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi 👋 I'm Portfolio AI. Ask me anything about Rahul’s skills, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    if (!input.trim() || loading) return;

    const userMsg: Msg = { role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "AI error");
      }

      setMessages((m) => [...m, { role: "ai", text: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "⚠️ AI busy right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              💬 Portfolio{" "}
              <span className="text-fuchsia-400 drop-shadow">
                AI Chat
              </span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Ask about projects, tech stack, experience, or resume.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </div>
        </div>

        {/* Chat Container */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_35px_rgba(236,72,153,0.15)] overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-fuchsia-500/20 border border-fuchsia-400/30 shadow-[0_0_18px_rgba(236,72,153,0.25)] flex items-center justify-center">
                🤖
              </div>
              <div>
                <p className="text-sm font-semibold">Portfolio AI</p>
                <p className="text-xs text-gray-400">Chat Assistant</p>
              </div>
            </div>

            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/15 text-white border border-white/10"
              onClick={() => setMessages(messages.slice(0, 1))}
              disabled={loading}
            >
              Clear
            </Button>
          </div>

          {/* Messages */}
          <div className="h-[60vh] md:h-[520px] overflow-y-auto px-4 py-5 space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border
                    ${
                      m.role === "user"
                        ? "bg-fuchsia-500/20 border-fuchsia-400/30 shadow-[0_0_18px_rgba(236,72,153,0.18)]"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 text-sm border border-white/10 bg-white/5 w-fit">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Thinking</span>
                    <span className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:120ms]" />
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask about Rahul... (Enter to send, Shift+Enter for new line)"
                  className="min-h-[48px] max-h-[160px] resize-none bg-black/30 border-white/10 text-white placeholder:text-gray-500 rounded-xl"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Example: “Show me your best Next.js project features”
                </p>
              </div>

              <Button
                onClick={send}
                disabled={loading || !input.trim()}
                className="rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 shadow-[0_0_18px_rgba(236,72,153,0.35)]"
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer mini note */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Powered by <span className="text-fuchsia-400">Portfolio AI</span> •
          Designed to match your Skill Globe theme ✨
        </div>
      </div>
    </div>
  );
}
