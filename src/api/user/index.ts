"use server";
import { hashPassword } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FormState, UserSchema } from "./definations";
import { revalidateTag } from "next/cache";

export async function createUser(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  // Validate input using Zod
  const validatedFields = UserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten()?.fieldErrors,
    };
  const { email, password, name } = validatedFields.data;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      message: "Email already exists, please use a different email or login.",
    };
  }
  const hash = await hashPassword(password);
  // Create the user
  await prisma.user.create({
    data: { email, password: hash, name },
  });
  revalidateTag("GetUsers");
  return redirect("/dashboard/users");
}

export async function deleteUser(userId: number) {
  await prisma.user.delete({ where: { id: userId } });
  revalidateTag("GetUsers");
  return redirect("/dashboard/users");
}
