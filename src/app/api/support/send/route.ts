import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function POST(req: Request) {
  try {
    const { content, guestId } = await req.json();

    if (!content || !guestId) {
      return NextResponse.json(
        { error: "content & guestId required" },
        { status: 400 }
      );
    }

    let thread = await prisma.supportThread.findFirst({
      where: {
        subject: guestId,
        isClosed: false,
      },
    });

    if (!thread) {
      thread = await prisma.supportThread.create({
        data: {
          subject: guestId,
          userId: null,
        },
      });
    }

    const message = await prisma.supportMessage.create({
      data: {
        threadId: thread.id,
        sender: "USER",
        content,
      },
    });

    // 🔥 IMPORTANT: update thread timestamp
    await prisma.supportThread.update({
      where: { id: thread.id },
      data: { updatedAt: new Date() },
    });

    // 🔥 Realtime thread message
    await pusher.trigger(
      `support-thread-${thread.id}`,
      "new-message",
      message
    );

    // 🔔 Admin notification
    await pusher.trigger("admin-support", "new-support", {
      threadId: thread.id,
    });

    return NextResponse.json({
      success: true,
      threadId: thread.id,
      message,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
