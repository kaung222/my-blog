"use server";
import prisma from "@/lib/prisma";
import { CreatePostSchema } from "./definations";
import { verifySession } from "@/lib/helpers";
import slugify from "slugify";

export async function createPost(FormState: any, formData: FormData) {
  const validatedFields = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  const { userId } = await verifySession();
  if (!validatedFields.success)
    return validatedFields?.error?.flatten().fieldErrors;

  const slug =
    slugify(validatedFields.data.title, {
      lower: true, // Convert to lowercase
      strict: true, // Remove special characters
      replacement: "-", // Replace spaces with dashes
    }) +
    "-" +
    Date.now();
  const post = await prisma.post.create({
    data: { slug, thumbnail: "", userId, ...validatedFields.data },
  });

  return { message: "Create a post successfully.", post };
}

export async function removePost(postId: number) {
  await prisma.post.delete({ where: { id: postId } });
  return;
}

function generateMetaTitle(title: string) {
  return `${title} | My Awesome Blog`;
}

function generateMetaDescription(content: string) {
  return `${content.substring(0, 150)}... Read more!`;
}
