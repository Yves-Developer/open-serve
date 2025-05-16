// middleware.ts
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/login"];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isPublic = publicRoutes.includes(pathname);

  // Forward the request headers to auth()
  const session = await auth();

  if (isPublic) {
    return NextResponse.next();
  }
  // Allow all /api/auth/* routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }
  // User is not logged in, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // User is authenticated, proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect everything except static assets and public files
    "/((?!_next|.*\\.(?:svg|ico|png|jpg|jpeg|css|js|woff2?|ttf)).*)",
  ],
};
