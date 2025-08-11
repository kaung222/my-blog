"use client";
import React from "react";
import { Post } from "./AdminPostsPage";
import BlogDetails from "@/app/(pages)/blogs/[slug]/BlogDetails";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  post: Post;
  trigger: React.ReactNode;
};

const PostPreview = ({ post, trigger }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className=" z-50 max-h-[90vh] overflow-auto max-w-[90vw] ">
          <DialogTitle></DialogTitle>
          <BlogDetails post={post} preview={true} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostPreview;
