"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { updateUserRole } from "@/app/service/updateUserRole";
import { Card } from "../ui/card";

export default function OnboardClient() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const updateRole = async (role: "user" | "agency") => {
    try {
      setLoading(true);
      await updateUserRole(role);
      router.push("/");
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;
  if (session.user.role) {
    router.push("/");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[500px] flex flex-col items-center gap-4 p-6">
        <h1 className="text-xl font-semibold">Pick Role</h1>
        <div className="flex gap-4">
          <Button onClick={() => updateRole("user")} disabled={loading}>
            I’m a Citizen
          </Button>
          <Button onClick={() => updateRole("agency")} disabled={loading}>
            I’m an Agency
          </Button>
        </div>
      </Card>
    </div>
  );
}
