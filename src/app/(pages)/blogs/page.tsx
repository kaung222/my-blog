import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { BlogCard } from "@/components/blog-card";
import Link from "next/link";
import BlogPage from "./BlogsPage";

const getPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: { user: true, category: true },
    });
  },
  ["GetPosts"],
  { revalidate: 3600, tags: ["GetPosts"] }
);

export default async function LatestPosts() {
  const posts = await getPosts();
  console.log("Blog is", posts);
  return <BlogPage posts={posts} />;
}
