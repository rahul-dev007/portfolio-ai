import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const threads = await prisma.supportThread.findMany({
    where: { isClosed: false },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: {
          messages: {
            where: {
              sender: "USER",
              isRead: false,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(threads);
}
