"use client";

import { createPost } from "@/api/post";
import Link from "next/link";
import { useFormState } from "react-dom";

const Page = () => {
  const [state, action] = useFormState(createPost, undefined);
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
          name="content"
          placeholder="content"
          defaultValue="https://image.jpg"
        />
        {/* meta title
         meta description  */}
        <button type="submit">Save</button>
        <br />
        <Link href={"/dashboard/posts"}>back to posts</Link>
      </form>
    </div>
  );
};

export default Page;
