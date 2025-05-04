"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  Copy,
  ArrowUpDown,
  Calendar,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

import DeletePost from "@/components/delete-post";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export type Post = {
  category: {
    name: string;
    id: number;
    description: string | null;
  } | null;
  user: {
    name: string;
    id: number;
    email: string;
    password: string;
  };
} & {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string | null;
  excerpt: string;
  published: boolean;
  views: number;
  updatedAt: Date;
  createdAt: Date;
};

type Props = {
  posts: Post[];
};

export default function AdminPostsPage({ posts }: Props) {
  const router = useRouter();

  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) => post.title.toLowerCase().includes(searchQuery.toLowerCase())
    //   post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle selection of a post
  const togglePostSelection = (id: string) => {
    setSelectedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  // Toggle selection of all posts
  const toggleAllSelection = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map((post) => post.id.toString()));
    }
  };

  // Navigate to create new post
  const handleCreatePost = () => {
    router.push("/dashboard/posts/new");
  };

  // Format date function
  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
        <Button onClick={handleCreatePost}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Category</DropdownMenuItem>
                <DropdownMenuItem>Date</DropdownMenuItem>
                <DropdownMenuItem>Views</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedPosts.length === filteredPosts.length &&
                          filteredPosts.length > 0
                        }
                        onCheckedChange={toggleAllSelection}
                        aria-label="Select all posts"
                      />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">Date</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Views
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <PostRow
                        key={post.id}
                        post={post}
                        selectedPosts={selectedPosts}
                        togglePostSelection={togglePostSelection}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="h-10 w-10 mb-2" />
                          <p className="mb-2">No posts found</p>
                          <p className="text-sm">
                            Try adjusting your search or filters.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox aria-label="Select all published posts" />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      <div className="flex items-center">
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      <div className="flex items-center">
                        Published
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      <div className="flex items-center">
                        Views
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts
                    .filter((post) => post.published)
                    .map((post) => (
                      <PostRow
                        key={post.id}
                        post={post}
                        selectedPosts={selectedPosts}
                        togglePostSelection={togglePostSelection}
                      />
                    ))}
                  {/* Published posts would be displayed here */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox aria-label="Select all draft posts" />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Category
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      <div className="flex items-center">
                        Updated
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts
                    .filter((post) => !post.published)
                    .map((post) => (
                      <PostRow
                        key={post.id}
                        post={post}
                        selectedPosts={selectedPosts}
                        togglePostSelection={togglePostSelection}
                      />
                    ))}
                  {/* Draft posts would be displayed here */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const PostRow = ({
  post,
  selectedPosts,
  togglePostSelection,
}: {
  post: Post;
  selectedPosts: string[];
  togglePostSelection: (id: string) => void;
}) => {
  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };
  return (
    <TableRow key={post.id}>
      <TableCell>
        <Checkbox
          checked={selectedPosts.includes(post.id.toString())}
          onCheckedChange={() => togglePostSelection(post.id.toString())}
          aria-label={`Select post ${post.title}`}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium">{post.title}</div>
            <div className="hidden sm:inline text-sm text-muted-foreground line-clamp-1">
              {post.excerpt}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={post.published ? "default" : "secondary"}>
          {post.published ? "Published" : "Draft"}
        </Badge>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{post.views}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

// Mock data for posts
const posts = [
  {
    id: "1",
    title: "The Future of Artificial Intelligence in Everyday Life",
    slug: "future-of-ai-in-everyday-life",
    excerpt:
      "Exploring how AI will transform our daily routines, from smart homes to healthcare and beyond.",
    category: "Technology",
    published: true,
    createdAt: "2023-06-15T00:00:00.000Z",
    views: 1240,
  },
  {
    id: "2",
    title: "Sustainable Travel: Exploring the World Responsibly",
    slug: "sustainable-travel-exploring-world-responsibly",
    excerpt:
      "Tips and insights for minimizing your environmental impact while still enjoying meaningful travel experiences.",
    category: "Travel",
    published: true,
    createdAt: "2023-08-22T00:00:00.000Z",
    views: 894,
  },
  {
    id: "3",
    title: "The Science of Productivity: Work Smarter, Not Harder",
    slug: "science-of-productivity",
    excerpt:
      "Research-backed strategies to enhance your workflow and achieve more with less stress.",
    category: "Lifestyle",
    published: true,
    createdAt: "2023-09-10T00:00:00.000Z",
    views: 1056,
  },
  {
    id: "4",
    title: "Modern Web Development: Trends to Watch in 2025",
    slug: "web-development-trends-2025",
    excerpt:
      "Exploring the emerging technologies and methodologies shaping the future of web development.",
    category: "Technology",
    published: true,
    createdAt: "2023-10-05T00:00:00.000Z",
    views: 423,
  },
  {
    id: "5",
    title: "Hidden Gems: Undiscovered Travel Destinations",
    slug: "hidden-gems-travel-destinations",
    excerpt:
      "Venture off the beaten path to these lesser-known but equally stunning locations around the world.",
    category: "Travel",
    published: true,
    createdAt: "2023-10-12T00:00:00.000Z",
    views: 315,
  },
  {
    id: "6",
    title: "Mindfulness in the Digital Age: Finding Balance",
    slug: "mindfulness-digital-age",
    excerpt:
      "Practical approaches to maintaining mental wellness while navigating our technology-filled lives.",
    category: "Lifestyle",
    published: false,
    createdAt: "2023-10-18T00:00:00.000Z",
    views: 0,
  },
  {
    id: "7",
    title: "The Power of Habit: Transform Your Life",
    slug: "power-of-habit",
    excerpt:
      "How small, consistent actions can lead to significant personal and professional growth over time.",
    category: "Lifestyle",
    published: true,
    createdAt: "2023-05-05T00:00:00.000Z",
    views: 1824,
  },
  {
    id: "8",
    title: "Mastering JavaScript: Essential Tips for Modern Development",
    slug: "mastering-javascript",
    excerpt:
      "Key concepts and techniques to level up your JavaScript skills and write cleaner, more efficient code.",
    category: "Technology",
    published: false,
    createdAt: "2023-04-18T00:00:00.000Z",
    views: 0,
  },
];
