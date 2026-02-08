import { prisma } from "@/lib/prisma";
import ProjectsClient from "./projects-client";

export const dynamic = "force-dynamic"; // 🔥 THIS IS THE FIX

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return <ProjectsClient projects={projects} />;
}
