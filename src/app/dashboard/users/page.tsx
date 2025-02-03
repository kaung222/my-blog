import DeleteUser from "@/components/delete-user";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import Link from "next/link";

const getCachedUsers = unstable_cache(
  async () => await prisma.user.findMany(),
  [],
  {
    revalidate: 3600,
    tags: ["GetUsers"],
  }
);
export default async function Page() {
  const users = await getCachedUsers();
  return (
    <div className="">
      <Link href={"/dashboard/users/new"}>
        <Button>Add new user</Button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>password</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant={"outline"}>Edit</Button>
                <DeleteUser userId={user.id} />
                {/* <Link href={`posts/${post.slug}`}>Info<Link/>
                 */}
                <Link href={`posts/${user.id}`}>
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
