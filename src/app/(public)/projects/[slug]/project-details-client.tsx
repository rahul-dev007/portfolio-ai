"use client";

import Image from "next/image";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  imageUrl: string | null;
  videoUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  techStack: string[];
};

export default function ProjectDetailsClient({
  project,
}: {
  project: Project;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-indigo-900/60 via-purple-900/50 to-fuchsia-900/50" />
      <div className="absolute inset-0 -z-20 bg-black/50 backdrop-blur-xl" />

      {/* MAIN CONTAINER – WIDTH FIX */}
      <div className="mx-auto max-w-5xl px-5 py-20">
        {/* TITLE */}
        <h1
          className="
            text-3xl sm:text-4xl font-extrabold tracking-tight
            bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
            bg-clip-text text-transparent
            drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]
          "
        >
          {project.title}
        </h1>

        {/* DESCRIPTION – WIDTH FIX */}
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-white/80">
          {project.description}
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-wrap gap-4">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              className="
                rounded-md px-6 py-2 text-sm font-bold uppercase tracking-widest
                text-white
                bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500
                shadow-[0_0_25px_rgba(236,72,153,0.9)]
                transition hover:scale-105
              "
            >
              Live Demo
            </Link>
          )}

          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="
                rounded-md px-6 py-2 text-sm font-bold uppercase tracking-widest
                text-white border border-white/20 bg-white/5
                hover:bg-white/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]
                transition hover:scale-105
              "
            >
              Source Code
            </Link>
          )}
        </div>

        {/* MEDIA – HEIGHT FIX */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* IMAGE */}
          <div className="relative h-[240px] sm:h-[300px] lg:h-[360px] overflow-hidden rounded-2xl border border-white/10">
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white/40">
                No Image
              </div>
            )}
          </div>

          {/* VIDEO */}
          {project.videoUrl && (
            <video
              src={project.videoUrl}
              controls
              className="h-[240px] sm:h-[300px] lg:h-[360px] w-full rounded-2xl object-cover"
            />
          )}
        </div>

        {/* TECH STACK */}
        <div className="mt-14 max-w-4xl">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-fuchsia-400">
            Tech Stack
          </h3>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full border border-white/20 bg-white/5
                  px-3 py-1 text-xs text-white/80
                  hover:border-fuchsia-400/60 transition
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
