"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Save,
  Upload,
  Mail,
  Bell,
  Shield,
  Key,
  Palette,
  Globe,
  Share2,
  Trash,
} from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and email settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Jane Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="jane@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Writer, explorer, and tech enthusiast."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blog Settings</CardTitle>
              <CardDescription>
                Configure your blog's basic settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="blogName">Blog Name</Label>
                <Input id="blogName" defaultValue="Thoughtfully Written" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="blogDescription">Blog Description</Label>
                <Textarea
                  id="blogDescription"
                  defaultValue="A personal blog where thoughts come to life."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="comments" defaultChecked />
                <Label htmlFor="comments">Enable comments on posts</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your blog.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Color Scheme</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex-1">
                    <Palette className="mr-2 h-4 w-4" />
                    Light
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Palette className="mr-2 h-4 w-4" />
                    Dark
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Palette className="mr-2 h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Font Size</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex-1">
                    Small
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Medium
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Large
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications about new comments
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Comment Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Get notified when someone comments on your posts
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive emails about new features and updates
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account's security settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex-1">
                    <Shield className="mr-2 h-4 w-4" />
                    Enable 2FA
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Change Password</Label>
                <div className="space-y-2">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                  <Button variant="outline" className="w-full">
                    <Key className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Integration</CardTitle>
              <CardDescription>
                Connect your social media accounts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Website</div>
                    <div className="text-sm text-muted-foreground">
                      thoughtfully.com
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
