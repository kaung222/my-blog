import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Eye, Calendar } from "lucide-react";
import type { Category, Post, User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function BlogCard({
  post,
}: {
  post: { user: User; category: Category | null } & Post;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        {post.thumbnail && (
          <div className="relative h-48 w-full">
            <Image
              src={post.thumbnail || "/placeholder.svg"}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={post.published ? "default" : "secondary"}>
            {post.published ? "Published" : "Draft"}
          </Badge>
          {post.categoryId && (
            <Badge variant="outline">{post?.category?.name}</Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-500 mb-4">
          {post.content.length > 100
            ? `${post.content.substring(0, 100)}...`
            : post.content}
        </p>
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${post.userId}`} />
            <AvatarFallback>{post?.user?.name}</AvatarFallback>
          </Avatar>
          <div className="">
            <span className="text-sm text-gray-500">{post?.user?.name}</span>
            <br />
            <span className="text-sm text-gray-500">{post?.user?.email}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Eye className="h-4 w-4 mr-1" />
          {post.views} views
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {post.publishedAt
            ? formatDistanceToNow(new Date(post.publishedAt), {
                addSuffix: true,
              })
            : formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
        </div>
      </CardFooter>
    </Card>
  );
}
