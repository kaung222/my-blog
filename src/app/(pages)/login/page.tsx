"use client";
import { login } from "@/api/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action] = useActionState(login, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="Email"></label>
          <input
            id="email"
            name="email"
            placeholder="m@example.com"
            type="email"
            className=" bg-black"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label htmlFor="password">Password</label>
            <Link className="text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
          <input
            id="password"
            type="text"
            name="password"
            className=" bg-black"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <button>Login</button>
      </div>
    </form>
  );
}

// export function LoginButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button aria-disabled={pending} type="submit" className="mt-4 w-full">
//       {pending ? "Submitting..." : "Sign up"}
//     </button>
//   );
// }
