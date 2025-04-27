import DeletePost from "@/components/delete-post";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import Link from "next/link";

const getCachedPosts = unstable_cache(
  async () =>
    await prisma.post.findMany({
      take: 20,
      include: { user: true, category: true },
      orderBy: { createdAt: "desc" },
    }),
  ["my-posts"],
  { revalidate: 5 * 60, tags: ["GetPosts"] }
);

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function PostsPage() {
  const posts = await getCachedPosts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href={"/dashboard/posts/new"} className="">
          <Button> Create Post</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>content</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.slug}</TableCell>
              <TableCell>{post.content.slice(0, 50) + "...."}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant={"outline"}>Edit</Button>
                <DeletePost postId={post.id} />
                {/* <Link href={`posts/${post.slug}`}>Info<Link/>
                 */}
                <Link href={`posts/${post.slug}`}>
                  <Button className=" bg-slate-600">Info</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
