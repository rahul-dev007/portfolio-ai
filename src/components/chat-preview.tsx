import Link from "next/link";

export default function ChatPreview() {
  return (
    <section className="relative overflow-hidden py-24 text-center">
      {/* background match */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-fuchsia-900/40" />

      <h2 className="text-3xl font-extrabold text-white">
        Ask My AI About My Work
      </h2>

      <p className="mt-4 text-white/70">
        My AI understands my projects, skills and experience.
      </p>

      <Link
        href="/chat"
        className="
          inline-block mt-8 rounded-md px-6 py-3
          font-bold uppercase tracking-widest text-white
          bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
          shadow-[0_0_25px_rgba(236,72,153,0.9)]
          transition hover:scale-110
        "
      >
        Open AI Chat
      </Link>
    </section>
  );
}
