"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message");
      }

      setSent(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* 🌌 BACKGROUND – MATCH NAVBAR */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-indigo-900/60 via-purple-900/50 to-fuchsia-900/50" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.35),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-black/50 backdrop-blur-xl" />

      <div className="mx-auto max-w-3xl px-6 py-24">
        {/* HEADER */}
        <div className="mb-12 text-center space-y-4">
          <h1
            className="
              text-4xl font-extrabold tracking-tight
              bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
              bg-clip-text text-transparent
              drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]
            "
          >
            Contact Me
          </h1>

          <p className="text-white/80">
            Let’s build something great together 🚀
          </p>
        </div>

        {/* ✅ SUCCESS STATE */}
        {sent ? (
          <div
            className="
              rounded-2xl border border-emerald-400/40
              bg-emerald-400/10 p-10 text-center
              shadow-[0_0_40px_rgba(52,211,153,0.4)]
            "
          >
            <h2 className="text-2xl font-semibold text-emerald-400">
              ✅ Message Sent!
            </h2>

            <p className="mt-3 text-white/80">
              Thanks for reaching out.  
              I’ll get back to you as soon as possible 🙌
            </p>
          </div>
        ) : (
          /* 📩 FORM */
          <form
            onSubmit={handleSubmit}
            className="
              space-y-6 rounded-2xl border border-white/10
              bg-white/5 p-8
              shadow-[0_0_40px_rgba(236,72,153,0.25)]
            "
          >
            <Input
              name="name"
              placeholder="Your name"
              required
              className="
                bg-black/40 border-white/20 text-white
                placeholder:text-white/40
                focus:border-fuchsia-400 focus:ring-fuchsia-400/30
              "
            />

            <Input
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="
                bg-black/40 border-white/20 text-white
                placeholder:text-white/40
                focus:border-cyan-400 focus:ring-cyan-400/30
              "
            />

            <Textarea
              name="message"
              placeholder="Write your message..."
              rows={5}
              required
              className="
                bg-black/40 border-white/20 text-white
                placeholder:text-white/40
                focus:border-purple-400 focus:ring-purple-400/30
              "
            />

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="
                w-full h-12 text-sm font-bold uppercase tracking-widest
                bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
                bg-[length:300%_300%] animate-gradient-x
                shadow-[0_0_30px_rgba(236,72,153,0.9)]
                transition hover:scale-105 active:scale-95
              "
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>

            {/* ERROR */}
            {error && (
              <p className="text-center text-sm text-red-400">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
