"use client";

import { createCategory } from "@/api/category";
import Link from "next/link";
import React, { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { Category } from "@prisma/client";

type Props = {
  category?: Category;
};

const CategoryForm = ({ category }: Props) => {
  const [state, action] = useActionState(createCategory, undefined);
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Edit Category</h2>
        <Button variant="outline" asChild>
          <Link href="/dashboard/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Category</CardTitle>
          <CardDescription>
            Edit category to organize your blog posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter category description"
                className="min-h-[100px] w-full"
              />
            </div>

            {state?.message && (
              <p className="text-sm text-destructive">{state.message}</p>
            )}

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Update Category
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryForm;
