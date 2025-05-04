import { BlogCard } from "@/components/blog-card";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import BlogDetails from "./BlogDetails";

const getPost = cache(async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true, user: true },
  });
  if (!post) notFound();
  return post;
});

const getRelatedPosts = cache(async (post: Post) => {
  const posts = await prisma.post.findMany({
    where: {
      categoryId: post.categoryId,
      slug: { not: post.slug },
    },
    take: 4,
    include: { user: true, category: true },
  });
  return posts;
});

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    orderBy: { views: "desc" },
    take: 20,
  });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const metadata: Metadata = JSON.parse(post.metadata as string);

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  const relatedPosts = await getRelatedPosts(post);
  return (
    <article className="min-h-screen">
      <BlogDetails post={post} />
    </article>
  );
}
