"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { updateUserRole } from "../service/updateUserRole";

export default function Onboarding() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveRole = async (role: "user" | "agency") => {
    setLoading(true);
    try {
      await updateUserRole(role);
      // await signIn("google", { redirect: false }); // refresh session
      router.push("/"); // navigate to dashboard or home
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-xl font-semibold">Pick your role</h1>
      <button disabled={loading} onClick={() => saveRole("user")}>
        I’m a User
      </button>
      <button disabled={loading} onClick={() => saveRole("agency")}>
        I’m an Agency
      </button>
    </div>
  );
}
