// import React from "react";

// const Page = () => {
//   return (
//     <div>
//       <div className="h2">Home Page </div>
//       <li>Recommand posts</li>
//       <li>Lates posts</li>
//       <li>Popular posts</li>
//     </div>
//   );
// };

// export default Page;

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  TrendingUp,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import FeaturedPostCard from "@/components/blog/featured-post-card";
import PostCard from "@/components/blog/post-card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Thoughtfully Written
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Explore insights, stories, and perspectives on a variety of
                  topics from technology to lifestyle.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="px-8">
                  <Link href="/blogs">
                    Explore Posts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto flex items-center justify-center">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3182829/pexels-photo-3182829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Hero image"
                  width={550}
                  height={400}
                  className="object-cover rounded-xl aspect-video"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl">
                Featured Posts
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Discover our most impactful and engaging content.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl">
                Latest Posts
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Fresh content hot off the press.
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/blogs">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {/* {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))} */}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild className="sm:hidden">
              <Link href="/blogs">View all posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Posts Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl">
                Popular Posts
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Reader favorites you shouldn't miss.
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/blogs">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {popularPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden group transition-all duration-200 hover:shadow-md"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {post.category}
                  </Badge>
                  <h3 className="font-medium line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {post.views} views
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild className="sm:hidden">
              <Link href="/blogs">View all posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Stay in the loop
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed mt-4">
                Subscribe to our newsletter to receive updates on new posts,
                exclusive content, and more.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our{" "}
                <Link href="#" className="underline underline-offset-2">
                  Terms & Conditions
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Mock Data - Replace with actual data when implementing backend
const featuredPosts = [
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
];

const latestPosts = [
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
];

const popularPosts = [
  {
    id: "7",
    title: "The Power of Habit: Transform Your Life",
    slug: "power-of-habit",
    category: "Lifestyle",
    thumbnail:
      "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    views: 1824,
  },
  {
    id: "8",
    title: "Mastering JavaScript: Essential Tips",
    slug: "mastering-javascript",
    category: "Technology",
    thumbnail:
      "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    views: 1692,
  },
  {
    id: "9",
    title: "Mediterranean Cuisine: A Culinary Journey",
    slug: "mediterranean-cuisine",
    category: "Food",
    thumbnail:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    views: 1437,
  },
  {
    id: "10",
    title: "Exploring Japan's Ancient Temples",
    slug: "japan-ancient-temples",
    category: "Travel",
    thumbnail:
      "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    views: 1389,
  },
];
