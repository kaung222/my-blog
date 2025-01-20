import { hashPassword } from "@/lib/helpers";
import prisma from "@/lib/prisma";

export async function GET() {
  const hash = await hashPassword("Admin@123");
  await prisma.user.create({
    data: { name: "James", email: "james@gmail.com", password: hash },
  });
}
