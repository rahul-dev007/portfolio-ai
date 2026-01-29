import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateText } from "@/lib/ai";

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { success: false, error: "Message required" },
      { status: 400 }
    );
  }

  // 1️⃣ Active PDF chunks only
  const chunks = await prisma.pdfChunk.findMany({
    where: {
      document: { isActive: true },
    },
    select: { content: true },
    take: 20, // safety limit
  });

  // ❌ No active PDF
  if (chunks.length === 0) {
    return NextResponse.json({
      success: true,
      reply: "I don’t know.",
      grounded: false,
    });
  }

  const context = chunks.map(c => c.content).join("\n\n");

  // 2️⃣ STRICT PROMPT
  const prompt = `
You are Rahul's Portfolio Assistant.

Rules:
- Answer ONLY using the context below.
- If the answer is not in the context, say exactly: "I don’t know."
- Do NOT guess or add outside knowledge.

Context:
${context}

Question:
${message}
`;

  // 3️⃣ Generate answer
  const reply = await generateText(prompt);

  // 4️⃣ Extra safety (anti-hallucination)
  if (!reply || reply.toLowerCase().includes("i don't know")) {
    return NextResponse.json({
      success: true,
      reply: "I don’t know.",
      grounded: false,
    });
  }

  return NextResponse.json({
    success: true,
    reply,
    grounded: true,
  });
}
