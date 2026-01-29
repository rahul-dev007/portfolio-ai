"use client";

import Link from "next/link";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  techStack: string[];
};

export default function ProjectsClient({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND – NAVBAR MATCH */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-fuchsia-900/40" />
      <div className="absolute inset-0 -z-20 bg-black/50 backdrop-blur-xl" />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <h1
          className="
            mb-12 text-center text-4xl font-extrabold uppercase tracking-widest
            bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
            bg-clip-text text-transparent
          "
        >
          Projects
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="
                group relative overflow-hidden rounded-2xl
                border border-white/10 bg-white/5
                transition-all duration-500
                hover:-translate-y-2 hover:scale-[1.03]
                hover:border-fuchsia-400/50
              "
            >
              {/* IMAGE */}
              <div className="relative h-44 overflow-hidden">
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/30">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-white">
                  {p.title}
                </h2>

                <p className="mt-2 text-sm text-white/70 line-clamp-3">
                  {p.description}
                </p>

                {/* TECH STACK */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* DETAILS BUTTON */}
                <div className="mt-5">
                  <span
                    className="
                      inline-flex items-center gap-2
                      rounded-md px-4 py-1.5
                      text-xs font-bold uppercase tracking-widest text-white
                      bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
                      shadow-[0_0_18px_rgba(236,72,153,0.8)]
                      transition
                    "
                  >
                    View Details →
                  </span>
                </div>
              </div>

              {/* BOTTOM BAR */}
              <div
                className="
                  absolute bottom-0 left-0 h-[3px] w-full scale-x-0
                  bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
                  transition-transform duration-500 origin-left
                  group-hover:scale-x-100
                "
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
