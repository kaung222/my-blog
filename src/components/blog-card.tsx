import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Eye, Calendar, ArrowUpRight } from "lucide-react";
import type { Category, Post, User } from "@prisma/client";
import Link from "next/link";
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
    <Link href={`/posts/${post.slug}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer">
        <CardHeader className="p-0">
          {post.thumbnail && (
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={post.thumbnail || "/placeholder.svg"}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
              {post.published && (
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1 text-sm">
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {post.categoryId && (
              <Badge variant="outline" className="hover:bg-primary/5">
                {post?.category?.name}
              </Badge>
            )}
            <Badge
              variant={post.published ? "default" : "secondary"}
              className="hover:bg-primary/90"
            >
              {post.published ? "Published" : "Draft"}
            </Badge>
          </div>

          <div className="group-hover:text-primary transition-colors duration-200">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              {post.title}
              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
              {post.content}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 ring-2 ring-background">
                <AvatarImage src={`https://avatar.vercel.sh/${post.userId}`} />
                <AvatarFallback>{post?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {post?.user?.name}
                </p>
                <p className="text-xs text-gray-500">{post?.user?.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-end text-sm text-gray-500">
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
    </Link>
  );
}
