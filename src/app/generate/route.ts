import { hashPassword } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const hash = await hashPassword("Admin@123");
  const data = {
    name: "James Marcus",
    email: "james@gmail.com",
    password: hash,
  };
  await prisma.user.upsert({
    where: { email: data.email },
    create: data,
    update: data,
  });

  return NextResponse.json({ message: "Hello welcome" });
}
