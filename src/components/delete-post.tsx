"use client";

import { removePost } from "@/api/post";

const DeletePost = ({ postId }: { postId: number }) => {
  return (
    <div>
      <button
        onClick={() => removePost(postId)}
        className=" p-5 rounded-md bg-blue-600"
      >
        delete post
      </button>
    </div>
  );
};

export default DeletePost;
