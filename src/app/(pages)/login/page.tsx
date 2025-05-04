"use client";

import { login } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <p className="text-center text-gray-500">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                autoComplete="email"
                autoFocus
                className="w-full"
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="w-full"
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.password}
                </p>
              )}
            </div>

            {state?.message && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
                {state.message}
              </div>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
