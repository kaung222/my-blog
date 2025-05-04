"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye, ArrowLeft, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "next/navigation";
import { Post } from "@/app/dashboard/posts/AdminPostsPage";

type Props = {
  post: Post;
};

const BlogDetails = ({ post }: Props) => {
  return (
    <>
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src={
            post.thumbnail ||
            "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container px-4 py-12">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            <Badge className="mb-4">{post.category?.name}</Badge>
            <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-5xl mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={
                      "https://images.pexels.com/photos/774909/pexels-pho…jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    }
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.user.name}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <time>
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </time>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {post.content.length / 200} min read
                </div>
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  {post.views} views
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <div className="space-y-8">
            <div className="sticky top-24">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Share this post</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  {/* Add more social share buttons as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
