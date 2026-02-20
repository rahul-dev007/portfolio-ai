import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function POST(req: Request) {
  try {
    const { threadId } = await req.json();

    if (!threadId) {
      return NextResponse.json(
        { error: "threadId required" },
        { status: 400 }
      );
    }

    await prisma.supportMessage.updateMany({
      where: {
        threadId,
        sender: "USER",
        isRead: false,
      },
      data: { isRead: true },
    });

    // 🔥 IMPORTANT — notify topbar
    await pusher.trigger("admin-support", "new-support", {});

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
