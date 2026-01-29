import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // ✅ IMPORTANT: Uint8Array
  const uint8 = new Uint8Array(await file.arrayBuffer());

  // ✅ REQUIRE INSIDE FUNCTION (THIS FIXES ENOENT)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pdfParse = require("pdf-parse/lib/pdf-parse.js");

  const parsed = await pdfParse(uint8);
  const text = parsed.text || "";

  if (!text.trim()) {
    return NextResponse.json({ error: "Empty PDF" }, { status: 400 });
  }

  // 🔁 Deactivate old PDFs
  await prisma.pdfDocument.updateMany({
    where: { isActive: true },
    data: { isActive: false },
  });

  // 📄 Save document
  const doc = await prisma.pdfDocument.create({
    data: {
      title: file.name,
      filename: file.name,
      isActive: true,
    },
  });

  // ✂️ Chunk text
  const chunks = text.match(/(.|\n){1,800}/g) || [];
  const prismaAny = prisma as any;

  for (const chunk of chunks) {
    await prismaAny.pdfChunk.create({
      data: {
        docId: doc.id,
        content: chunk,
      },
    });
  }

  return NextResponse.json({
    success: true,
    chunks: chunks.length,
  });
}
