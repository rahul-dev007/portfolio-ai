import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

/* ================= VALIDATION ================= */

const UpdateSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  techStack: z.array(z.string()).optional(),

  imageUrl: z.string().url().optional().nullable().or(z.literal("")),
  videoUrl: z.string().url().optional().nullable().or(z.literal("")),
  liveUrl: z.string().url().optional().nullable().or(z.literal("")),
  githubUrl: z.string().url().optional().nullable().or(z.literal("")),

  isFeatured: z.boolean().optional(),
});

/* ================= PATCH ================= */

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ MUST

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const body = await req.json();
  const parsed = UpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;

  const updated = await prisma.project.update({
    where: { id },
    data: {
      ...d,
      imageUrl: d.imageUrl === "" ? null : d.imageUrl,
      videoUrl: d.videoUrl === "" ? null : d.videoUrl,
      liveUrl: d.liveUrl === "" ? null : d.liveUrl,
      githubUrl: d.githubUrl === "" ? null : d.githubUrl,
    },
  });

  return NextResponse.json(updated);
}

/* ================= DELETE ================= */

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ MUST

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.project.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
