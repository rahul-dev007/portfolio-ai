import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pusher } from "@/lib/pusher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { threadId, content } = await req.json();

  if (!threadId || !content) {
    return NextResponse.json(
      { error: "threadId & content required" },
      { status: 400 }
    );
  }

  const thread = await prisma.supportThread.findUnique({
    where: { id: threadId },
  });

  if (!thread) {
    return NextResponse.json(
      { error: "Thread not found" },
      { status: 404 }
    );
  }

  const message = await prisma.supportMessage.create({
    data: {
      threadId,
      sender: "ADMIN",
      content,
    },
  });

  await pusher.trigger(
    `support-thread-${threadId}`,
    "new-message",
    message
  );

  return NextResponse.json({ success: true });
}
