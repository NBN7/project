import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });

  const { pathname } = req.nextUrl;

  // if the user is logged in and tries to access the auth page, redirect to the home page
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // apply middleware only to this routes
  if (pathname.startsWith("/profile") || pathname.startsWith("/dashboard")) {
    // if the user is not logged in, redirect to the auth page
    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard:path*", "/auth:path*"],
};
