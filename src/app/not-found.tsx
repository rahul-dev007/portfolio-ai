"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-900 via-indigo-950 to-black">

      {/* ✈️ AIRPLANE */}
      <div className="absolute top-1/2 left-[-20%] animate-plane">
        <span className="text-[120px] drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
          ✈️
        </span>
      </div>

      {/* 🌌 CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">

        <h1
          className="
          text-[120px] md:text-[160px]
          font-extrabold tracking-widest
          text-transparent bg-clip-text
          bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
          drop-shadow-[0_0_35px_rgba(236,72,153,0.9)]
        "
        >
          404
        </h1>

        <p className="mt-4 text-2xl md:text-3xl font-semibold text-white/80">
          Coming Soon
        </p>

        <p className="mt-2 text-sm uppercase tracking-[0.4em] text-white/50">
          This route is under construction
        </p>

        <Link
          href="/"
          className="
            mt-10 inline-block rounded-md
            border border-cyan-400/40
            px-8 py-3 text-cyan-300
            hover:bg-cyan-400 hover:text-black
            transition-all duration-300
          "
        >
          Back to Home
        </Link>
      </div>

      {/* 🌫️ OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
