// import DeleteUser from "@/components/delete-user";
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
// import { unstable_cache } from "next/cache";
// import Link from "next/link";

// const getCachedUsers = unstable_cache(
//   async () => await prisma.user.findMany(),
//   [],
//   {
//     revalidate: 3600,
//     tags: ["GetUsers"],
//   }
// );
// export default async function Page() {
//   const users = await getCachedUsers();
//   return (
//     <div className="">
//       <Link href={"/dashboard/users/new"}>
//         <Button>Add new user</Button>
//       </Link>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>ID</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>password</TableHead>
//             <TableHead>actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {users.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>{user.id}</TableCell>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>{user.password}</TableCell>
//               <TableCell className="flex gap-2">
//                 <Button variant={"outline"}>Edit</Button>
//                 <DeleteUser userId={user.id} />
//                 {/* <Link href={`posts/${post.slug}`}>Info<Link/>
//                  */}
//                 <Link href={`posts/${user.id}`}>
//                   <Button className=" bg-slate-600">Info</Button>
//                 </Link>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Shield,
  Mail,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New User
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage user accounts and their permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.image} />
                        <AvatarFallback>
                          {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="mr-1 h-3 w-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "ADMIN" ? "default" : "secondary"}
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.postsCount} posts</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {format(new Date(user.joinedAt), "MMM d, yyyy")}
                    </div>
                  </TableCell>
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
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
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

// Mock data
const users = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    role: "ADMIN",
    postsCount: 25,
    joinedAt: "2023-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@example.com",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    role: "EDITOR",
    postsCount: 12,
    joinedAt: "2023-02-15T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    role: "EDITOR",
    postsCount: 8,
    joinedAt: "2023-03-20T00:00:00.000Z",
  },
];
