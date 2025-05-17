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
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  if (newRole !== "user" && newRole !== "agency") {
    throw new Error("Invalid role");
  }

  await db
    .db()
    .collection("users")
    .updateOne(
      { _id: new ObjectId(session.user.id) },
      { $set: { role: newRole } }
    );

  return { success: true };
}
