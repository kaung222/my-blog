"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Calendar, TrendingUp } from "lucide-react";
import PostCard from "@/components/blog/post-card";
import { formatDistanceToNow } from "date-fns";
import { Post } from "@/app/dashboard/posts/AdminPostsPage";

type Props = {
  posts: Post[];
};

export default function BlogPage({ posts }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter posts based on search query and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      post.category?.id.toString() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container px-4 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-5xl mb-4">
          The Blog
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover insights, stories, and perspectives on various topics.
        </p>
      </div>

      {/* Featured Posts Row */}
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={featuredPost.thumbnail}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="mb-2">{featuredPost.category}</Badge>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-2">
                  {featuredPost.title}
                </h2>
                <p className="text-white/90 mb-4 max-w-xl line-clamp-2">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                    <Image
                      src={featuredPost.author.image}
                      alt={featuredPost.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {featuredPost.author.name}
                    </p>
                    <div className="flex items-center text-xs text-white/80">
                      <Calendar className="h-3 w-3 mr-1" />
                      <time dateTime={featuredPost.publishedAt}>
                        {formatDistanceToNow(
                          new Date(featuredPost.publishedAt),
                          { addSuffix: true }
                        )}
                      </time>
                      <span className="mx-1">•</span>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {featuredPost.views} views
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {featuredSecondaryPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group">
                <div className="flex flex-col sm:flex-row lg:flex-col">
                  <div className="relative h-48 sm:w-1/3 lg:w-full sm:h-auto">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 sm:w-2/3 lg:w-full">
                    <Badge variant="secondary" className="mb-2">
                      {post.category}
                    </Badge>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="group-hover:text-primary transition-colors"
                    >
                      <h3 className="font-medium text-lg line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="flex items-center text-xs text-muted-foreground mt-auto">
                      <Calendar className="h-3 w-3 mr-1" />
                      <time dateTime={post.publishedAt}>
                        {formatDistanceToNow(new Date(post.publishedAt), {
                          addSuffix: true,
                        })}
                      </time>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="food">Food</SelectItem>
            </SelectContent>
          </Select>
          <Tabs defaultValue="newest" className="w-full md:w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No posts found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button
            variant="outline"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            1
          </Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}

// Mock Data
const featuredPost = {
  id: "1",
  title: "The Future of Artificial Intelligence in Everyday Life",
  slug: "future-of-ai-in-everyday-life",
  excerpt:
    "Exploring how AI will transform our daily routines, from smart homes to healthcare and beyond.",
  category: "Technology",
  thumbnail:
    "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  publishedAt: "2023-06-15T00:00:00.000Z",
  author: {
    name: "Jane Doe",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  views: 1240,
};

const featuredSecondaryPosts = [
  {
    id: "2",
    title: "Sustainable Travel: Exploring the World Responsibly",
    slug: "sustainable-travel-exploring-world-responsibly",
    excerpt:
      "Tips and insights for minimizing your environmental impact while still enjoying meaningful travel experiences.",
    category: "Travel",
    thumbnail:
      "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-08-22T00:00:00.000Z",
    author: {
      name: "John Smith",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: "3",
    title: "The Science of Productivity: Work Smarter, Not Harder",
    slug: "science-of-productivity",
    excerpt:
      "Research-backed strategies to enhance your workflow and achieve more with less stress.",
    category: "Lifestyle",
    thumbnail:
      "https://images.pexels.com/photos/7648476/pexels-photo-7648476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-09-10T00:00:00.000Z",
    author: {
      name: "Alex Johnson",
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
];

export const allPosts = [
  {
    id: "1",
    title: "The Future of Artificial Intelligence in Everyday Life",
    slug: "future-of-ai-in-everyday-life",
    excerpt:
      "Exploring how AI will transform our daily routines, from smart homes to healthcare and beyond.",
    category: "Technology",
    thumbnail:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-06-15T00:00:00.000Z",
    author: {
      name: "Jane Doe",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    views: 1240,
  },
  {
    id: "2",
    title: "Sustainable Travel: Exploring the World Responsibly",
    slug: "sustainable-travel-exploring-world-responsibly",
    excerpt:
      "Tips and insights for minimizing your environmental impact while still enjoying meaningful travel experiences.",
    category: "Travel",
    thumbnail:
      "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-08-22T00:00:00.000Z",
    author: {
      name: "John Smith",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    views: 894,
  },
  {
    id: "3",
    title: "The Science of Productivity: Work Smarter, Not Harder",
    slug: "science-of-productivity",
    excerpt:
      "Research-backed strategies to enhance your workflow and achieve more with less stress.",
    category: "Lifestyle",
    thumbnail:
      "https://images.pexels.com/photos/7648476/pexels-photo-7648476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-09-10T00:00:00.000Z",
    author: {
      name: "Alex Johnson",
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    views: 1056,
  },
  {
    id: "4",
    title: "Modern Web Development: Trends to Watch in 2025",
    slug: "web-development-trends-2025",
    excerpt:
      "Exploring the emerging technologies and methodologies shaping the future of web development.",
    category: "Technology",
    thumbnail:
      "https://images.pexels.com/photos/1181290/pexels-photo-1181290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-10-05T00:00:00.000Z",
    author: {
      name: "Michael Chen",
      image:
        "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    views: 423,
  },
  {
    id: "5",
    title: "Hidden Gems: Undiscovered Travel Destinations",
    slug: "hidden-gems-travel-destinations",
    excerpt:
      "Venture off the beaten path to these lesser-known but equally stunning locations around the world.",
    category: "Travel",
    thumbnail:
      "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-10-12T00:00:00.000Z",
    author: {
      name: "Sophia Rodriguez",
      image:
        "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    views: 315,
  },
  {
    id: "6",
    title: "Mindfulness in the Digital Age: Finding Balance",
    slug: "mindfulness-digital-age",
    excerpt:
      "Practical approaches to maintaining mental wellness while navigating our technology-filled lives.",
    category: "Lifestyle",
    thumbnail:
      "https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-10-18T00:00:00.000Z",
    author: {
      name: "David Wilson",
      image:
        "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    views: 287,
  },
  {
    id: "7",
    title: "The Power of Habit: Transform Your Life",
    slug: "power-of-habit",
    excerpt:
      "How small, consistent actions can lead to significant personal and professional growth over time.",
    category: "Lifestyle",
    thumbnail:
      "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-05-05T00:00:00.000Z",
    author: {
      name: "Emily Parker",
      image:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    views: 1824,
  },
  {
    id: "8",
    title: "Mastering JavaScript: Essential Tips for Modern Development",
    slug: "mastering-javascript",
    excerpt:
      "Key concepts and techniques to level up your JavaScript skills and write cleaner, more efficient code.",
    category: "Technology",
    thumbnail:
      "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-04-18T00:00:00.000Z",
    author: {
      name: "Ryan Kim",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    views: 1692,
  },
  {
    id: "9",
    title: "Mediterranean Cuisine: A Culinary Journey Through Flavors",
    slug: "mediterranean-cuisine",
    excerpt:
      "Exploring the rich tastes, health benefits, and cultural significance of Mediterranean food traditions.",
    category: "Food",
    thumbnail:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2023-07-25T00:00:00.000Z",
    author: {
      name: "Maria Gonzalez",
      image:
        "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    views: 1437,
  },
];
