import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/helpers";
import { cookies } from "next/headers";

// Middleware function
export async function middleware(request: NextRequest) {
  // Get the Authorization header
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  //   console.log(session);
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // If authorized, continue the request
  return NextResponse.next();
}

// Path matching configuration
export const config = {
  matcher: [
    "/dashboard/:path*", // Middleware for dashboard pages
  ],
};
