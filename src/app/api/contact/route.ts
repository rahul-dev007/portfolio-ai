import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    // 🔒 Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid data format" },
        { status: 400 }
      );
    }

    // 💾 Save to database
    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("CONTACT_API_ERROR", error);

    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
