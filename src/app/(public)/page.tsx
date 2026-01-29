import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/10 via-fuchsia-500/10 to-emerald-500/10" />

      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium text-muted-foreground backdrop-blur">
            🚀 Portfolio + AI Powered App
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Hi, I’m <span className="text-sky-500">Rahul</span> 👋 <br />
            <span className="text-muted-foreground">
              Full-Stack Developer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg text-muted-foreground">
            I build production-ready web applications using{" "}
            <span className="font-medium text-foreground">
              Next.js, Prisma, PostgreSQL
            </span>{" "}
            and integrate{" "}
            <span className="font-medium text-foreground">AI systems</span>{" "}
            to solve real-world problems.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white shadow-lg hover:opacity-90"
            >
              <Link href="/projects">View Projects</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl"
            >
              <Link href="/chat">Try AI Chat</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
