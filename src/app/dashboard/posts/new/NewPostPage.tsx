"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Save,
  Eye,
  ArrowLeft,
  Image as ImageIcon,
  X,
  Loader2,
} from "lucide-react";
import TiptapEditor from "@/components/editor/tiptap-editor";
import { createPost } from "@/api/post";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema } from "@/api/post/definations";
import { z, ZodIssue } from "zod";
import ZodErrorMessage from "@/components/ZodErrorMessage";
import PostPreview from "../PostPreview";
import { Post } from "../AdminPostsPage";

type Props = {
  categories: {
    name: string;
    id: number;
    description: string | null;
  }[];
};

export default function NewPostPage({ categories }: Props) {
  const [state, action] = useActionState(createPost, undefined);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);
  const [errors, setErrors] = useState<ZodIssue[] | undefined>(undefined);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // In a real application, this would save to the database
    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDecription", metaDescription);
    formData.append("content", content);
    formData.append("thumbnail", thumbnail);
    formData.append("category", category);
    formData.append("published", published.toString());

    try {
      // Parse and validate data
      CreatePostSchema.parse({
        title,
        excerpt,
        metaTitle,
        metaDecription: metaDescription,
        content,
        thumbnail,
        categoryId: Number(category),
        published: published,
      });
      setErrors(undefined);
      createPost(undefined, formData)
        .then(() => {
          router.push("/dashboard/posts");
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.errors);
        const errorMessages = err.errors
          .map((error) => `(${error.path[0]}) , ${error.message}`)
          .join("\n");
        setLoading(false);
        return;
      }
    }

    // createPost(undefined, formData)
    //   .then(() => {
    //     router.push("/dashboard/posts");
    //   })
    //   .catch((error) => {
    //     console.error("Error creating post:", error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  // Go back to posts list
  const handleCancel = () => {
    router.push("/dashboard/posts");
  };

  const previewPost: Post = {
    category: categories.find(
      (category) => category.id === Number(category)
    ) || {
      name: "",
      id: 0,
      description: "",
    },
    user: {
      name: "Jane Doe",
      id: 1,
      email: "jame@gmail.com",
      password: "",
    },
    thumbnail: thumbnail,
    title: title,
    excerpt: excerpt,
    content: content,
    published: published,
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
    id: 0,
    views: 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Create New Post</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <PostPreview
            post={previewPost}
            trigger={
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            }
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>
                Create the content for your blog post.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className=" space-y-2">
                <Label htmlFor="title" className="">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <ZodErrorMessage error={errors} name="title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Enter a short description"
                  className="min-h-[80px]"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
                <ZodErrorMessage error={errors} name="excerpt" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  name="metaTitle"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Enter SEO title"
                />
                <ZodErrorMessage error={errors} name="metaTitle" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  name="metaDecription"
                  id="seoDescription"
                  placeholder="Enter SEO description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="min-h-[100px]"
                />
                <ZodErrorMessage error={errors} name="metaDecription" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <TiptapEditor content={content} onChange={setContent} />
                <ZodErrorMessage error={errors} name="content" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
              <CardDescription>
                Control when and how your post appears.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={published}
                  name="published"
                  onCheckedChange={(checked) =>
                    setPublished(checked as boolean)
                  }
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <ZodErrorMessage error={errors} name="published" />

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  name="category"
                  onValueChange={setCategory}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ZodErrorMessage error={errors} name="categoryId" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <div className="flex items-center space-x-2 border p-2 rounded-md">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>Jane Doe</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>
                Add a thumbnail image for your post.
              </CardDescription>
              <ZodErrorMessage error={errors} name="thumbnail" />
            </CardHeader>
            <CardContent>
              {thumbnail ? (
                <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                  <img
                    src={thumbnail}
                    alt="Post thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setThumbnail("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="relative aspect-video bg-muted rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                  <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload image
                  </p>
                  <Input
                    type="url"
                    placeholder="Or enter image URL"
                    className="mt-4 max-w-xs"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* <Tabs defaultValue="editor" className="space-y-6">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="seo">SEO & Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                  <CardDescription>
                    Create the content for your blog post.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter post title"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <div className="flex gap-2">
                      <Input
                        id="slug"
                        placeholder="Enter post slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setSlug(generateSlug(title))}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Enter a short description"
                      className="min-h-[80px]"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input id="seoTitle" placeholder="Enter SEO title" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">SEO Description</Label>
                    <Textarea
                      id="seoDescription"
                      placeholder="Enter SEO description"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <TiptapEditor content={content} onChange={setContent} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publish Settings</CardTitle>
                  <CardDescription>
                    Control when and how your post appears.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="published"
                      checked={published}
                      onCheckedChange={(checked) =>
                        setPublished(checked as boolean)
                      }
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={featured}
                      onCheckedChange={(checked) =>
                        setFeatured(checked as boolean)
                      }
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <div className="flex items-center space-x-2 border p-2 rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span>Jane Doe</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                  <CardDescription>
                    Add a thumbnail image for your post.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {thumbnail ? (
                    <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                      <img
                        src={thumbnail}
                        alt="Post thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setThumbnail("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="relative aspect-video bg-muted rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                      <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload image
                      </p>
                      <Input
                        type="url"
                        placeholder="Or enter image URL"
                        className="mt-4 max-w-xs"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your post for search engines.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input id="seoTitle" placeholder="Enter SEO title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  placeholder="Enter SEO description"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="Enter comma-separated keywords"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Customize how your post appears when shared on social media.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="socialTitle">Social Media Title</Label>
                <Input
                  id="socialTitle"
                  placeholder="Enter social media title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialDescription">
                  Social Media Description
                </Label>
                <Textarea
                  id="socialDescription"
                  placeholder="Enter social media description"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Social Media Image</Label>
                <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                  <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload image
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs> */}
    </div>
  );
}
