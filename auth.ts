import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import db from "./lib/Authdb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(db),
  session: { strategy: "jwt" },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser) {
        try {
          await db
            .db()
            .collection("users")
            .updateOne(
              { _id: new Object(user.id) },
              {
                $set: {
                  firstLoginAt: new Date(),
                  role: "user",
                  githubUsername: profile?.login,
                  emailVerified: new Date(),
                },
              }
            );
        } catch (err) {
          console.error("Error updating user on first login:", err);
        }
      }
    },
  },
  ...authConfig,
});
