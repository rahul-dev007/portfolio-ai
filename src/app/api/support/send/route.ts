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

    // 🔍 find existing open thread for this guest
    let thread = await prisma.supportThread.findFirst({
      where: {
        subject: guestId,
        isClosed: false,
      },
    });

    // 🆕 create new thread if not exists
    if (!thread) {
      thread = await prisma.supportThread.create({
        data: {
          subject: guestId,
          userId: null, // guest
        },
      });
    }

    // 💬 save message
    const message = await prisma.supportMessage.create({
      data: {
        threadId: thread.id,
        sender: "USER",
        content,
      },
    });

    // ⚡ realtime (thread specific)
    await pusher.trigger(
      `support-thread-${thread.id}`,
      "new-message",
      message
    );

    // 🔔 🔔 🔔 ADMIN GLOBAL NOTIFICATION (THIS WAS MISSING)
    await pusher.trigger("admin-support", "new-support", {
      threadId: thread.id,
      preview: content.slice(0, 50),
    });

    return NextResponse.json({
      success: true,
      threadId: thread.id,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
