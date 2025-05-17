// middleware.ts
import NextAuth, { NextAuthRequest } from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/login"];

export default auth(async (req: NextAuthRequest) => {
  const { nextUrl, auth: session } = req;
  const pathname = nextUrl.pathname;

  // ✅ 1. Allow public routes and auth endpoints without checking session
  if (publicRoutes.includes(pathname) || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // ✅ 2. If no session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // ✅ 3. If session exists but no role, force onboarding
  // const role = (session.user as any)?.role;
  // if (!role && pathname !== "/onboarding") {
  //   return NextResponse.redirect(new URL("/onboarding", nextUrl));
  // }
  // console.log("Role:", role);
  // ✅ 4. Allow access to everything else
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\.(?:svg|ico|png|jpg|jpeg|css|js|woff2?|ttf)).*)"],
};
