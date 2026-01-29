"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  actions: { label: string; href: string; variant?: "primary" | "secondary" }[];
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Hi, I’m Rahul 👋",
    subtitle: "Full-Stack Web Developer",
    description:
      "I build modern, scalable web applications using Next.js, Prisma, PostgreSQL and AI-powered systems.",
    image: "/hero/hero-1.jpg",
    actions: [
      { label: "View Projects", href: "/projects", variant: "primary" },
      { label: "Contact Me", href: "/contact", variant: "secondary" },
    ],
  },
  {
    id: 2,
    title: "Clean UI. Secure Backend.",
    subtitle: "Production-Ready Engineering",
    description:
      "From authentication to media uploads and dashboards — everything is built like real-world SaaS.",
    image: "/hero/hero-2.jpg",
    actions: [
      { label: "Explore Projects", href: "/projects", variant: "primary" },
      { label: "View Resume", href: "/resume", variant: "secondary" },
    ],
  },
  {
    id: 3,
    title: "AI-Powered Portfolio",
    subtitle: "Ask My AI Anything",
    description:
      "This portfolio includes an AI chat that understands my projects, skills, and experience.",
    image: "/hero/hero-3.jpg",
    actions: [{ label: "Open AI Chat", href: "/chat", variant: "primary" }],
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((p) => (p + 1) % slides.length),
      5500
    );
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden">
      {/* 🎮 GAME ENERGY BACKGROUND */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-fuchsia-900/60 animate-gradient-x" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.35),transparent_60%)]" />
      <div className="absolute inset-0 -z-20 bg-black/40 backdrop-blur-xl" />

      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT — TEXT */}
          <div className="space-y-7">
            <p className="text-sm uppercase tracking-widest text-fuchsia-400 animate-fade-in">
              {slide.subtitle}
            </p>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl text-white animate-slide-up drop-shadow-[0_0_30px_rgba(236,72,153,0.8)]">
              {slide.title}
            </h1>

            <p className="max-w-xl text-white/70 animate-fade-in">
              {slide.description}
            </p>

            {/* 🎮 GAME BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-4">
              {slide.actions.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className={cn(
                    "relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-300",
                    a.variant === "primary"
                      ? `
                        text-white
                        bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
                        bg-[length:300%_300%] animate-gradient-x
                        shadow-[0_0_30px_rgba(236,72,153,1)]
                        hover:scale-110 active:scale-95
                      `
                      : `
                        text-white/80 border border-white/20
                        hover:bg-white/10 hover:text-white
                        active:scale-95
                      `
                  )}
                >
                  {a.variant === "primary" && (
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 blur-2xl opacity-80 animate-pulse" />
                  )}
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT — IMAGE (HOLOGRAM CARD) */}
          <div className="relative mx-auto h-[460px] w-full max-w-md animate-scale-in">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-400/40 via-fuchsia-500/40 to-purple-500/40 blur-3xl" />
            <div className="absolute inset-0 rounded-3xl border border-white/20 shadow-[0_0_60px_rgba(236,72,153,0.7)]" />

            <Image
              key={slide.image}
              src={slide.image}
              alt="Hero image"
              fill
              priority
              className="relative rounded-3xl object-cover transition-all duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* 🎮 SLIDE INDICATORS */}
        <div className="mt-14 flex justify-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={cn(
                "h-3 w-3 rounded-full transition-all",
                index === i
                  ? "bg-fuchsia-500 scale-125 shadow-[0_0_15px_rgba(236,72,153,1)]"
                  : "bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
