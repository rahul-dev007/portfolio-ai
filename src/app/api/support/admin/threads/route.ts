import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const threads = await prisma.supportThread.findMany({
    where: { isClosed: false },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return NextResponse.json(threads);
}
