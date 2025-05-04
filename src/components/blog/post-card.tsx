import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Post } from "@/app/dashboard/posts/AdminPostsPage";

type Author = {
  name: string;
  image: string;
};

// type Post = {
//   id: string;
//   title: string;
//   slug: string;
//   excerpt: string;
//   category: string;
//   thumbnail: string;
//   publishedAt: string;
//   author: Author;
//   views: number;
// };

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <div className="relative h-48">
        <Image
          src={
            post.thumbnail ||
            "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt={post.title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm"
          >
            {post.category?.name}
          </Badge>
        </div>
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <Link
          href={`/blogs/${post.slug}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3 className="font-medium text-lg line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center mt-auto">
          <div className="relative h-6 w-6 rounded-full overflow-hidden mr-2">
            <Image
              src={
                "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt={post.user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="font-medium text-foreground mr-2">
              {post.user.name}
            </span>
            <Calendar className="h-3 w-3 mr-1" />
            <time>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </time>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
