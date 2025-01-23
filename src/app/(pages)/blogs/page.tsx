import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

const getPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({ take: 20 });
  },
  ["GetPosts"],
  { revalidate: 3600, tags: ["GetPosts"] }
);

export default async function Page() {
  const posts = await getPosts();
  console.log(posts);
  return (
    <ul>
      this is blog list
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
