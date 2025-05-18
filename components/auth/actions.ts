"use server";

import { signOut } from "@/auth";

export async function signOutAction() {
  console.log("signOutAction");
  await signOut();
}
