// import { AdminSidebar } from "@/components/admin-sidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SidebarProvider>
//       <div className="flex h-screen w-screen">
//         <AdminSidebar />
//         <main className="flex-1 overflow-y-auto p-6">{children}</main>
//       </div>
//     </SidebarProvider>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  BarChart3,
  FileText,
  Users,
  FolderTree,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[240px_1fr]">
      {/* Mobile Navigation */}
      <div className=" md:hidden sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <ScrollArea className="h-full">
              <nav className="flex flex-col h-full gap-2 p-2">
                <div className="flex h-14 items-center px-4 gap-2">
                  <FileText className="h-6 w-6" />
                  <div className="font-semibold">Admin Dashboard</div>
                </div>
                <Separator />
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors",
                      pathname === item.href ||
                        pathname?.startsWith(item.href + "/")
                        ? "bg-accent"
                        : "transparent"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <div className="font-semibold">Admin Dashboard</div>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <div className="hidden h-full md:block border-r bg-muted/40">
        <div className=" sticky top-0 h-screen ">
          <ScrollArea className=" h-full ">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex h-14 items-center px-4 gap-2">
                <FileText className="h-6 w-6" />
                <div className="font-semibold">Admin Dashboard</div>
              </div>
              <Separator />
              <nav className="grid gap-1 px-2 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors",
                      pathname === item.href ||
                        pathname?.startsWith(item.href + "/")
                        ? "bg-accent"
                        : "transparent"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <Separator />
              <div className="px-4 py-4">
                <div className="flex items-center gap-2 mb-4">
                  <Avatar>
                    <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Jane Doe</div>
                    <div className="text-xs text-muted-foreground">
                      jane@example.com
                    </div>
                  </div>
                </div>
                <div className="grid gap-1">
                  <Button variant="outline" size="sm" className="justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1 flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {getHeaderTitle(pathname)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />

            <div className="hidden md:flex md:items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-muted/10">{children}</main>
      </div>
    </div>
  );
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Posts", href: "/dashboard/posts", icon: FileText },
  { name: "Categories", href: "/dashboard/categories", icon: FolderTree },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

// Helper function to get the header title based on the current path
function getHeaderTitle(pathname: string) {
  if (pathname === "/dashboard") return "Dashboard Overview";
  if (pathname.startsWith("/dashboard/posts")) return "Blog Posts Management";
  if (pathname.startsWith("/dashboard/categories"))
    return "Categories Management";
  if (pathname.startsWith("/dashboard/users")) return "User Management";
  if (pathname.startsWith("/dashboard/settings")) return "Site Settings";
  return "Admin Dashboard";
}
