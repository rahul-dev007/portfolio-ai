"use client";

import Link from "next/link";
import { Github, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* 🌌 BACKGROUND — MATCH SITE THEME */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-indigo-900/60 via-purple-900/50 to-fuchsia-900/50" />
      <div className="absolute inset-0 -z-20 bg-black/60 backdrop-blur-xl" />

      {/* TOP NEON LINE */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500" />

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* BRAND */}
          <div>
            <h2
              className="
                text-lg font-extrabold uppercase tracking-widest
                bg-gradient-to-r from-cyan-400 to-fuchsia-500
                bg-clip-text text-transparent
              "
            >
              Rahul Biswas
            </h2>

            <p className="mt-3 max-w-xs text-sm text-white/70">
              Full-Stack Developer building modern, scalable and AI-powered web
              applications with real-world production architecture.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-fuchsia-400">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-white transition">
                  AI Chat
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL / PLATFORMS */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-fuchsia-400">
              Connect
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/70">
              <a
                href="https://web.facebook.com/profile.php?id=61578806211905"
                target="_blank"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Facebook size={16} /> Facebook
              </a>

              <a
                href="https://github.com/rahul-dev007"
                target="_blank"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Github size={16} /> GitHub
              </a>

              <a
                href="https://www.fiverr.com/rahulbisaws/buying?source=avatar_menu_profile"
                target="_blank"
                className="hover:text-white transition"
              >
                Fiverr Profile
              </a>

              <a
                href="https://vercel.com/rahul-dev007s-projects"
                target="_blank"
                className="hover:text-white transition"
              >
                Vercel Projects
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Rahul Biswas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
