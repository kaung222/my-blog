import prisma from "@/lib/prisma";
import React from "react";
import CategoryForm from "./CategoryForm";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return <CategoryForm category={category || undefined} />;
};

export default Page;
