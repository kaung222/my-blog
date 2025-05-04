import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Author = {
  name: string;
  image: string;
};

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  publishedAt: string;
  author: Author;
  views: number;
};

interface FeaturedPostCardProps {
  post: Post;
}

export default function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <div className="relative h-60 sm:h-48 md:h-52 lg:h-48 xl:h-52">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground">
            {post.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <Link
          href={`/blogs/${post.slug}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3 className="font-serif text-xl font-semibold line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center mt-auto">
          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
            <Image
              src={post.author.image}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{post.author.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <time dateTime={post.publishedAt}>
                {formatDistanceToNow(new Date(post.publishedAt), {
                  addSuffix: true,
                })}
              </time>
              <span className="mx-1">•</span>
              <TrendingUp className="h-3 w-3 mr-1" />
              {post.views} views
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
