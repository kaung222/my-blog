"use client";

import { createPost } from "@/api/post";
import LexicalEditor from "@/components/text-editor";
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
        <textarea
          className="  w-full text-black"
          name="content"
          placeholder="content"
          defaultValue="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
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
        <LexicalEditor />

        <button type="submit">Save</button>

        <p className=" text-red-700">{state?.message}</p>
        <br />
        <Link href={"/dashboard/posts"}>back to posts</Link>
      </form>
    </div>
  );
};

export default Page;
