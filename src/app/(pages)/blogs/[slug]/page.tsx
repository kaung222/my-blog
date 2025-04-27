import { BlogCard } from "@/components/blog-card";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

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
    <article className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="relative">
        <Image
          src={post?.thumbnail || "/placeholder.jpg"}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full h-64 object-cover sm:h-80 md:h-96"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
            {post.title}
          </h1>
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Published on{" "}
              {new Date(
                post?.publishedAt || post.createdAt
              ).toLocaleDateString()}
            </p>
            <p className="text-sm font-medium text-gray-500">
              By {post.user.name}
            </p>
          </div>
          <div className="text-sm text-gray-500">{post.views} views</div>
        </div>
        <div className="mt-4">
          {/* {post.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))} */}
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>
      <div className="px-4 py-4 sm:px-6">
        {relatedPosts.map((post) => {
          return (
            <Link
              href={`/blogs/${post.slug}`}
              key={post.id}
              className=" sm:w-full md:w-[300px] lg:w-[400px bg-red-600]"
            >
              <BlogCard post={post} />
            </Link>
          );
        })}
      </div>
    </article>
  );
}
