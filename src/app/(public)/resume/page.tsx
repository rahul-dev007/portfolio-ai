import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Rahul Biswas | Resume",
};

export default function ResumePage() {
  return (
    <section className="relative overflow-hidden">
      {/* 🌌 BACKGROUND — MATCH NAVBAR */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-indigo-900/60 via-purple-900/50 to-fuchsia-900/50" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.35),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-black/50 backdrop-blur-xl" />

      <div className="mx-auto max-w-5xl px-6 py-24">
        {/* HEADER */}
        <div className="mb-14 text-center space-y-4">
          <h1
            className="
              text-4xl font-extrabold tracking-tight
              bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
              bg-clip-text text-transparent
              drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]
            "
          >
            Resume
          </h1>

          <p className="text-lg text-white/80">
            View or download my professional CV
          </p>

          {/* DOWNLOAD BUTTON */}
          <div className="flex justify-center pt-6">
            <Link
              href="/resume/rahul-resume-1.pdf"
              target="_blank"
              download
              className="
                inline-flex items-center gap-2
                rounded-md px-8 py-3
                text-sm font-bold uppercase tracking-widest text-white
                bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
                bg-[length:300%_300%] animate-gradient-x
                shadow-[0_0_30px_rgba(236,72,153,0.9)]
                transition hover:scale-110 active:scale-95
              "
            >
              ⬇️ Download CV
            </Link>
          </div>
        </div>

        {/* RESUME PREVIEW */}
        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-white/10 bg-white/5
            shadow-[0_0_40px_rgba(236,72,153,0.35)]
          "
        >
          {/* TOP NEON BAR */}
          <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500" />

          <iframe
            src="/resume/rahul-resume-1.pdf"
            title="Rahul Resume"
            className="w-full"
            style={{
              height: "calc(100vh - 280px)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
