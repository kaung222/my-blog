// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import prisma from "@/lib/prisma";
// import Link from "next/link";
// import React from "react";

// const Page = async () => {
//   const categories = await prisma.category.findMany();
//   return (
//     <div>
//       Dashboard / categories
//       <div className="">
//         <Link href={"/dashboard/categories/new"}>
//           {" "}
//           <Button>Create New</Button>
//         </Link>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>name</TableHead>
//               <TableHead>Description</TableHead>

//               <TableHead>actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {categories.map((category) => (
//               <TableRow key={category.id}>
//                 <TableCell>{category.id}</TableCell>
//                 <TableCell>{category.name}</TableCell>
//                 <TableCell>{category.description}</TableCell>

//                 <TableCell>
//                   <Button>Edit</Button>
//                   {/* <Link href={`posts/${post.slug}`}>Info<Link/> */}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default Page;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  FolderTree,
} from "lucide-react";
import { format } from "date-fns";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      posts: true,
    },
  });
  console.log("categories", categories);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        <Link
          href={"/dashboard/categories/new"}
          className=" flex items-center px-4 py-2 rounded-lg bg-black text-white "
        >
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Link>
      </div>

      <div className="flex items-center gap-2"></div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            Manage your blog categories and their associated posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Posts</TableHead>
                {/* <TableHead>Created</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                        <FolderTree className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        {/* <div className="text-sm text-muted-foreground">
                          /{category.description}
                        </div> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {category.posts.length} posts
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                    {format(new Date(category.createdAt), "MMM d, yyyy")}
                  </TableCell> */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link
                            href={`/dashboard/categories/${category.id}`}
                            className="flex items-center gap-2"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
