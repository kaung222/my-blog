import prisma from "@/lib/prisma";
import Link from "next/link";
import DeletePost from "./delete-button";

const getPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};
const Page = async () => {
  const posts = await getPosts();
  console.log(posts);

  return (
    <div>
      <h2 className="">Dashboard / posts</h2>
      {posts.map((post) => {
        return (
          <Link href={`posts/${post.id}`} className=" bg-blue-700">
            <div
              className=" h-20 bg-slate-600 rounded-md mt-5 mb-10"
              key={post.id}
            >
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <DeletePost postId={post.id} />
            </div>
          </Link>
        );
      })}
      <Link href={"/dashboard/posts/new"} className="">
        <button className=" mt-11"> Create Post</button>
      </Link>
    </div>
  );
};

export default Page;
