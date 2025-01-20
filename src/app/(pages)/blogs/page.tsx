import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

const getPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany();
  },
  ["posts"],
  { revalidate: 3600, tags: ["posts"] }
);

export default async function Page() {
  const allPosts = await getPosts();

  return (
    <ul>
      this is blog list
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
