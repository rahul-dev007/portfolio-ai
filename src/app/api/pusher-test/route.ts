import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher";

export async function GET() {
  await pusher.trigger("test-channel", "test-event", {
    message: "Hello from server 🚀",
  });

  return NextResponse.json({ success: true });
}
