// src/app/(public)/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectDetailsClient from "./project-details-client";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ IMPORTANT: unwrap params
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) return notFound();

  return (
    <ProjectDetailsClient
      project={{
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        videoUrl: project.videoUrl,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        techStack: project.techStack,
      }}
    />
  );
}
