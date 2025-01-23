import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getPost(id: string) {
  const post = await prisma.post.findUnique({ where: { id: +id } });
  if (!post) notFound();
  return post;
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    orderBy: { views: "desc" },
    take: 20,
  });
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
    title: post.slug,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
