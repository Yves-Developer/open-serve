import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "user" | "agency";
  }

  interface Session {
    user: {
      id: string;
      email: string;
      image?: string;
      name?: string;
      role?: "user" | "agency";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "user" | "agency";
  }
}
