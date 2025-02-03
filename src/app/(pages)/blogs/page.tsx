import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { BlogCard } from "@/components/blog-card";
import Link from "next/link";

const getPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      take: 20,
      include: { user: true, category: true },
    });
  },
  ["GetPosts"],
  { revalidate: 3600, tags: ["GetPosts"] }
);

export default async function LatestPosts() {
  const posts = await getPosts();
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2>Blog Posts</h2>
      <div className="lex flex-wrap gap-5">
        {posts.map((post) => {
          return (
            <Link href={`/blogs/${post.slug}`} key={post.id}>
              <BlogCard post={post} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
