"use client";

import { removePost } from "@/api/post";
import { Button } from "./ui/button";

const DeletePost = ({ postId }: { postId: number }) => {
  return (
    <div>
      <Button
        variant={"destructive"}
        onClick={() => removePost(postId)}
        className=""
      >
        Delete
      </Button>
    </div>
  );
};

export default DeletePost;
