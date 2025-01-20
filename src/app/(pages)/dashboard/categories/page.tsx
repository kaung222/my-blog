import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div>
      Dashboard / categories
      <div className="">
        <div className="">
          {categories.map((category) => {
            return <div key={category.id}>{category.name}</div>;
          })}
        </div>
        <Link href={"/dashboard/categories/new"}> Create New</Link>
      </div>
    </div>
  );
};

export default Page;
