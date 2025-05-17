"use server";
import db from "@/lib/Authdb";
import { ObjectId } from "mongodb";

export const getUserRole = async (id: string) => {
  if (!id) throw new Error("Unauthorized");

  // Fetch only the role field from the users collection
  const user = await db
    .db()
    .collection("users")
    .findOne({ _id: new ObjectId(id) }, { projection: { role: 1 } });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  return { success: true, role: user.role };
};
