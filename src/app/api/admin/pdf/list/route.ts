import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pdfs = await prisma.pdfDocument.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      chunks: {
        select: { id: true },
      },
    },
  });

  return NextResponse.json({
    success: true,
    data: pdfs.map((p) => ({
      id: p.id,
      title: p.title,
      isActive: p.isActive,
      chunks: p.chunks.length,
      createdAt: p.createdAt,
    })),
  });
}
