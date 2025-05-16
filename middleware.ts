// middleware.ts
import NextAuth from "next-auth";
import authConfig from "./auth.config";
const { auth } = NextAuth(authConfig);
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/login"];

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isPublic = publicRoutes.includes(pathname);

  // Forward the request headers to auth()
  const session = !!req.auth;

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
  if (session) {
    //ToDo: redirect to  / when tries to hit login route

    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }
  // User is authenticated, proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Protect everything except static assets and public files
    "/((?!_next|.*\\.(?:svg|ico|png|jpg|jpeg|css|js|woff2?|ttf)).*)",
  ],
};
