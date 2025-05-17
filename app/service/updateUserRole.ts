"use server";

import { auth } from "@/auth";
import db from "@/lib/Authdb";
import { ObjectId } from "mongodb";

/**
 * Update the current user's role.
 *
 * @param newRole "user" | "agency"
 * @throws Error when unauthenticated or invalid role
 * @returns { success: true } on success
 */
export async function updateUserRole(newRole: "user" | "agency") {
  // 1. Verify session
  const session = await auth();
  console.log(session);
  if (!session?.user?.id) throw new Error("Unauthorized");

  // 2. Validate input
  if (newRole !== "user" && newRole !== "agency") {
    throw new Error("Invalid role");
  }

  // 3. Persist to MongoDB
  await db
    .db()
    .collection("users")
    .updateOne(
      { _id: new ObjectId(session.user.id) },
      { $set: { role: newRole } }
    );

  return { success: true };
}
