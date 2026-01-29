import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const timestamp = Math.round(Date.now() / 1000);

  const paramsToSign = `folder=projects/videos&timestamp=${timestamp}`;

  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");

  return NextResponse.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}
