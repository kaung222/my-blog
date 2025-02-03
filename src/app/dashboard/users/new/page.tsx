"use client";
import { createUser } from "@/api/user";
import Link from "next/link";
import { useActionState } from "react";

export default function Page() {
  const [state, action] = useActionState(createUser, undefined);
  return (
    <div>
      <form action={action}>
        <input type="text" name="name" placeholder="name" />
        <p>{state?.errors?.name}</p>
        <input type="text" name="email" placeholder="email" />
        <p>{state?.errors?.email}</p>

        <input type="text" name="password" placeholder="password" />
        <p>{state?.errors?.password}</p>

        <button>Create</button>
      </form>
      <p>{state?.message}</p>
      <h2>Dashboard / create new user</h2>
      <Link href="/dashboard/users">back to users</Link>
    </div>
  );
}
