import { prisma } from "@/lib/prisma";
import ProjectsClient from "./projects-client";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return <ProjectsClient projects={projects} />;
}
