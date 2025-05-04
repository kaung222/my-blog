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
export const getCachedCategories = unstable_cache(
  async () => await prisma.category.findMany(),
  ["my-categories"],
  { revalidate: 5 * 60, tags: ["GetCategories"] }
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
import AdminPostsPage from "./AdminPostsPage";

export default async function PostsPage() {
  const posts = await getCachedPosts();
  const categories = await getCachedCategories();
  console.log("postsa re", posts, categories);

  // return (
  //   <div className="space-y-6 p-6">
  //     <div className="flex justify-between items-center">
  //       <div>
  //         <h1 className="text-3xl font-bold">Posts</h1>
  //         <p className="text-gray-500 mt-1">Manage your blog posts</p>
  //       </div>
  //       <Link href="/dashboard/posts/new">
  //         <Button className="bg-primary hover:bg-primary/90">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="16"
  //             height="16"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             className="mr-2"
  //           >
  //             <path d="M12 5v14M5 12h14" />
  //           </svg>
  //           Create Post
  //         </Button>
  //       </Link>
  //     </div>

  //     <div className="rounded-lg border bg-card">
  //       <Table>
  //         <TableHeader>
  //           <TableRow>
  //             <TableHead>Title</TableHead>
  //             <TableHead>Status</TableHead>
  //             <TableHead>Category</TableHead>
  //             <TableHead>Views</TableHead>
  //             <TableHead>Published Date</TableHead>
  //             <TableHead className="text-right">Actions</TableHead>
  //           </TableRow>
  //         </TableHeader>
  //         <TableBody>
  //           {posts.map((post) => (
  //             <TableRow key={post.id}>
  //               <TableCell>
  //                 <div>
  //                   <p className="font-medium">{post.title}</p>
  //                   <p className="text-sm text-gray-500">{post.slug}</p>
  //                 </div>
  //               </TableCell>
  //               <TableCell>
  //                 <div
  //                   className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
  //                     post.published
  //                       ? "bg-green-100 text-green-800"
  //                       : "bg-yellow-100 text-yellow-800"
  //                   }`}
  //                 >
  //                   {post.published ? "Published" : "Draft"}
  //                 </div>
  //               </TableCell>
  //               <TableCell>{post.category?.name || "-"}</TableCell>
  //               <TableCell>
  //                 <div className="flex items-center gap-1">
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     width="16"
  //                     height="16"
  //                     viewBox="0 0 24 24"
  //                     fill="none"
  //                     stroke="currentColor"
  //                     strokeWidth="2"
  //                   >
  //                     <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
  //                     <circle cx="12" cy="12" r="3" />
  //                   </svg>
  //                   {post.views}
  //                 </div>
  //               </TableCell>
  //               <TableCell>
  //                 {post.publishedAt
  //                   ? new Date(post.publishedAt).toLocaleDateString()
  //                   : "-"}
  //               </TableCell>
  //               <TableCell className="text-right">
  //                 <div className="flex justify-end gap-2">
  //                   <Link href={`/dashboard/posts/${post.slug}/edit`}>
  //                     <Button variant="outline" size="sm">
  //                       Edit
  //                     </Button>
  //                   </Link>
  //                   <Link href={`/posts/${post.slug}`} target="_blank">
  //                     <Button variant="outline" size="sm">
  //                       View
  //                     </Button>
  //                   </Link>
  //                   <DeletePost postId={post.id} />
  //                 </div>
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </div>
  //   </div>
  // );

  return <AdminPostsPage posts={posts} />;
}
