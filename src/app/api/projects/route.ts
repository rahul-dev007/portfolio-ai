import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  techStack: z.array(z.string()).default([]),

  imageUrl: z.string().url().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),

  isFeatured: z.boolean().default(false),
});

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = ProjectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;

  const project = await prisma.project.create({
    data: {
      ...d,
      imageUrl: d.imageUrl || null,
      videoUrl: d.videoUrl || null,
      liveUrl: d.liveUrl || null,
      githubUrl: d.githubUrl || null,
    },
  });

  return NextResponse.json(project);
}
