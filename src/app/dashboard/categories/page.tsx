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
import Link from "next/link";
import React from "react";

const Page = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div>
      Dashboard / categories
      <div className="">
        <Link href={"/dashboard/categories/new"}>
          {" "}
          <Button>Create New</Button>
        </Link>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>name</TableHead>
              <TableHead>Description</TableHead>

              <TableHead>actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>

                <TableCell>
                  <Button>Edit</Button>
                  {/* <Link href={`posts/${post.slug}`}>Info<Link/> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
