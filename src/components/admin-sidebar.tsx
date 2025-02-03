"use client";

import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Posts", href: "/dashboard/posts" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  //   { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: BarChart, label: "Categories", href: "/dashboard/categories" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: Home, label: "Home", href: "/" },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold">Blog Admin</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
