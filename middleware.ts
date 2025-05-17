import NextAuth, { NextAuthRequest } from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/login"];

export default auth(async (req: NextAuthRequest) => {
  const { nextUrl, auth: session } = req;
  const pathname = nextUrl.pathname;

  if (publicRoutes.includes(pathname) || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }
  if (pathname === "/api/role") {
    return NextResponse.next();
  }
  if (!session) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\.(?:svg|ico|png|jpg|jpeg|css|js|woff2?|ttf)).*)"],
};
