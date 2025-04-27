import { BlogCard } from "@/components/blog-card";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { user: true, category: true },
  });
  console.log(post);
  if (!post) notFound();
  return post;
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return posts.map((post) => ({
    id: String(post.slug),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const metadata: Metadata = JSON.parse(post.metadata as string);

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <div className="">
      <BlogCard post={post} />
    </div>
  );
}
