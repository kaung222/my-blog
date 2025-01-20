import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPost(id: string) {
  const post = await prisma.post.findUnique({ where: { id: +id } });
  if (!post) notFound();
  return post;
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPost(postId);
  return {
    title: post.title,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPost(postId);

  return (
    <article>
      <h2>Post Detail page</h2>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link href={"/dashboard/posts"}>Back to blogs</Link>
    </article>
  );
}
