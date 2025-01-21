"use client";

import { createPost } from "@/api/post";
import Link from "next/link";
import { useActionState } from "react";

const Page = () => {
  const [state, action] = useActionState(createPost, undefined);
  return (
    <div>
      <form action={action}>
        <input
          className=" text-black w-full"
          type="text"
          name="title"
          placeholder="title"
          defaultValue="Test title"
        />
        <input
          className="  w-full text-black"
          type="text"
          name="content"
          placeholder="content"
          defaultValue="Test content"
        />
        <label htmlFor="">Image</label>
        <input
          className="  w-full text-black"
          type="text"
          name="thumbnail"
          placeholder="content"
          defaultValue="https://image.jpg"
        />
        <input
          className="  w-full text-black"
          type="text"
          name="metaTitle"
          placeholder="content"
          defaultValue="post title | my blog"
        />
        <input
          className="  w-full text-black"
          type="text"
          name="metaDecription"
          placeholder="meta desc"
          defaultValue="this is my blog description"
        />
        <input
          className="  w-full text-black"
          type="text"
          name="categoryId"
          placeholder="categoryId"
        />
        {/* meta title
         meta description  */}

        <button type="submit">Save</button>

        <p className=" text-red-700">{state?.message}</p>
        <br />
        <Link href={"/dashboard/posts"}>back to posts</Link>
      </form>
    </div>
  );
};

export default Page;
