import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function POST(req: Request) {
  try {
    const { threadId, content } = await req.json();

    if (!threadId || !content) {
      return NextResponse.json(
        { error: "threadId & content required" },
        { status: 400 }
      );
    }

    const message = await prisma.supportMessage.create({
      data: {
        threadId,
        sender: "ADMIN",
        content,
      },
    });

    // 🔥 realtime to thread
    await pusher.trigger(
      `support-thread-${threadId}`,
      "new-message",
      message
    );

    return NextResponse.json({
      success: true,
      message, // 🔥 VERY IMPORTANT
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
