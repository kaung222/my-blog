"use client";

import { createCategory } from "@/api/category";
import Link from "next/link";
import React, { useActionState } from "react";

const Page = () => {
  const [state, action] = useActionState(createCategory, undefined);
  return (
    <div>
      <form action={action}>
        <input
          className=" text-black w-full"
          type="text"
          name="name"
          placeholder="category name"
          defaultValue="Test"
        />
        <input
          className="  w-full text-black"
          type="text"
          name="description"
          placeholder="category decs"
          defaultValue="Desc"
        />
        <button>Create</button>

        <p className=" text-red-700">{state?.message}</p>

        <Link href={"/dashboard/categories"}>back to categores</Link>
      </form>
    </div>
  );
};

export default Page;
