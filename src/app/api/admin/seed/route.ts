import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
  const email = "admin@gmail.com";
  const password = "123456";

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashed,
      name: "Admin",
      role: "ADMIN",
    },
  });

  return NextResponse.json({
    message: "Admin created",
    email: user.email,
    password,
  });
}
