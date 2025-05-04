// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function AdminDashboard() {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Posts</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold">50</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Users</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold">1,234</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Comments</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold">789</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Page Views</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold">10,567</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  FileText,
  MessageSquare,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3 text-success" />
              <span className="text-success">12%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,531</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3 text-success" />
              <span className="text-success">18%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">189</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3 text-success" />
              <span className="text-success">8%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">405</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowDownRight className="mr-1 h-3 w-3 text-destructive" />
              <span className="text-destructive">3%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="views" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Last 30 Days
            </Button>
          </div>
        </div>
        <TabsContent value="views" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Views Analytics</CardTitle>
              <CardDescription>
                Visual representation of page views over time.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={viewsData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1) / 0.3)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                Analysis of how users interact with your content.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={engagementData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>
                Distribution of content across different categories.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 40,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" />
                  <Tooltip />
                  <Bar dataKey="posts" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>
              Your most recent blog posts and their performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {post.publishedAt} • {post.views} views
                    </p>
                  </div>
                  <div className="bg-muted px-2 py-1 rounded text-xs inline-flex items-center">
                    {post.status}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Popular Posts</CardTitle>
            <CardDescription>Your highest performing content.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularPosts.map((post, index) => (
                <div key={post.id} className="flex items-center gap-4">
                  <div className="text-lg font-bold text-muted-foreground w-5">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{post.title}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="mr-1 h-3 w-3" /> {post.views} views
                    </div>
                  </div>
                  <TrendingUp
                    className={`h-4 w-4 ${index === 0 ? "text-success" : ""}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Mock data for charts
const viewsData = [
  { date: "Oct 1", views: 1200 },
  { date: "Oct 5", views: 1800 },
  { date: "Oct 10", views: 1600 },
  { date: "Oct 15", views: 2200 },
  { date: "Oct 20", views: 1900 },
  { date: "Oct 25", views: 2400 },
  { date: "Oct 30", views: 2800 },
];

const engagementData = [
  { type: "Page Views", count: 4500 },
  { type: "Comments", count: 189 },
  { type: "Shares", count: 320 },
  { type: "Likes", count: 750 },
  { type: "Bookmarks", count: 280 },
];

const categoryData = [
  { category: "Technology", posts: 12 },
  { category: "Travel", posts: 8 },
  { category: "Lifestyle", posts: 6 },
  { category: "Food", posts: 4 },
  { category: "Other", posts: 2 },
];

// Mock data for recent posts
const recentPosts = [
  {
    id: "1",
    title: "The Future of Artificial Intelligence in Everyday Life",
    publishedAt: "Today",
    views: 423,
    status: "Published",
  },
  {
    id: "2",
    title: "Hidden Gems: Undiscovered Travel Destinations",
    publishedAt: "2 days ago",
    views: 315,
    status: "Published",
  },
  {
    id: "3",
    title: "Mindfulness in the Digital Age: Finding Balance",
    publishedAt: "4 days ago",
    views: 287,
    status: "Published",
  },
  {
    id: "4",
    title: "The Psychology of Color in Design",
    publishedAt: "1 week ago",
    views: 102,
    status: "Draft",
  },
];

// Mock data for popular posts
const popularPosts = [
  {
    id: "1",
    title: "The Power of Habit: Transform Your Life",
    views: 1824,
  },
  {
    id: "2",
    title: "Mastering JavaScript: Essential Tips",
    views: 1692,
  },
  {
    id: "3",
    title: "Mediterranean Cuisine: A Culinary Journey",
    views: 1437,
  },
  {
    id: "4",
    title: "Exploring Japan's Ancient Temples",
    views: 1389,
  },
];
