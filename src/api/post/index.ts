"use server";
import prisma from "@/lib/prisma";
import { CreatePostSchema, FormState, UpdatePostSchema } from "./definations";
import { verifySession } from "@/lib/helpers";
import slugify from "slugify";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

/**
 * Helper function to truncate content safely
 */
function cleanTruncate(content: string, length: number) {
  if (content.length <= length) return content;
  const truncated = content.slice(0, length);
  return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
}

/**
 * Helper function to generate meta title
 */
function generateMetaTitle(title: string) {
  return `${title} | My Awesome Blog`;
}

/**
 * Helper function to generate meta description
 */
function generateMetaDescription(content: string) {
  return cleanTruncate(content, 150);
}

/**
 * Create a new post
 */
export async function createPost(
  FormState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    metaTitle: formData.get("metaTitle"),
    metaDecription: formData.get("metaDecription"),
  });

  const { userId } = await verifySession();
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error?.flatten().fieldErrors,
    };
  }

  const { metaDecription, metaTitle, thumbnail, title, content } =
    validatedFields.data;

  // Generate slug
  const truncatedTitle = title.slice(0, 50); // Truncate to 50 chars
  const slug =
    slugify(truncatedTitle, {
      lower: true,
      strict: true,
    }) +
    "-" +
    Date.now();

  // Generate metadata if not provided
  const finalMetaTitle = metaTitle || generateMetaTitle(title);
  const finalMetaDescription =
    metaDecription || generateMetaDescription(content);
  const metadata = JSON.stringify({
    title: finalMetaTitle,
    description: finalMetaDescription,
  });

  const post = await prisma.post.create({
    data: { slug, thumbnail, userId, metadata, title, content },
  });
  console.log(post);
  revalidateTag("GetPosts");
  return redirect("/dashboard/posts");
}

/**
 * Remove a post by ID
 */
export async function removePost(postId: number) {
  console.log(postId);
  await prisma.post.delete({ where: { id: postId } });
  revalidateTag("GetPosts");
  return redirect("/dashboard/posts");
}

/**
 * Publish a post by ID
 */
export async function publishPost(postId: number) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    return { message: "Post not found." };
  }
  if (post.published) {
    return { message: "Post is already published." };
  }

  await prisma.post.update({
    where: { id: postId },
    data: { published: true, publishedAt: new Date() },
  });

  return { message: "Post published successfully." };
}

/**
 * Update an existing post
 */
export async function updatePost(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = UpdatePostSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    metaTitle: formData.get("metaTitle"),
    metaDecription: formData.get("metaDecription"),
    categoryId: formData.get("categoryId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error?.flatten().fieldErrors,
    };
  }

  const {
    metaDecription,
    metaTitle,
    thumbnail,
    title,
    content,
    id,
    categoryId,
  } = validatedFields.data;

  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) return { message: "Post not found" };

  // Generate metadata if not provided
  const finalMetaTitle = metaTitle || generateMetaTitle(title);
  const finalMetaDescription =
    metaDecription || generateMetaDescription(content);
  const metadata = JSON.stringify({
    title: finalMetaTitle,
    description: finalMetaDescription,
  });

  try {
    await prisma.post.update({
      where: { id },
      data: { thumbnail, metadata, title, content, categoryId },
    });
    return redirect("/dashboard/posts");
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      message: "Failed to update post. Please try again later.",
    };
  }
}
