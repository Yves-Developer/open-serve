import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import db from "./lib/Authdb";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(db),
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async jwt({ token }) {
      return token;
    },

    async session({ session, token }) {
      // Expose id & role to the client session object
      if (session.user) {
        session.user.id = token.sub as string;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/onboarding`;
      }

      return baseUrl;
    },
  },

  ...authConfig,
});
