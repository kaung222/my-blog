"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  CreateCategorySchema,
  FormState,
  UpdateCategorySchema,
} from "./definations";

/**
 * Remove a category by ID
 */
export async function removeCategory(categoryId: number) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) return { message: "Category not found" };
    await prisma.category.delete({ where: { id: categoryId } });
    return redirect("/dashboard/categories");
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      errors: { general: "Failed to delete category. Please try again later." },
    };
  }
}

/**
 * Update an existing category
 */
export async function updateCategory(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = UpdateCategorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }
  const { id, name, description } = validatedFields.data;
  await prisma.category.update({
    where: { id },
    data: { name, description },
  });
  return redirect("/dashboard/categories");
}

/**
 * Create a new category
 */
export async function createCategory(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = CreateCategorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }
  const { name, description } = validatedFields.data;
  const category = await prisma.category.findUnique({ where: { name } });
  if (category) return { message: "Category already existed" };
  await prisma.category.create({
    data: { name, description },
  });
  return redirect("/dashboard/categories");
}
