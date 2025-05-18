// app/profile/page.tsx  (client component)
"use client";

import { useState, useTransition } from "react";
import { createAgency } from "@/app/service/agency";
import { useSession } from "next-auth/react"; // if you’re using next‑auth
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Profile = () => {
  const { data: session, status } = useSession(); // client‑side session hook
  const router = useRouter();
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSave = () =>
    startTransition(async () => {
      if (!name.trim()) return;
      await createAgency({ email, name });
      setName("");
      // do any toast or success state here
      toast.success("Agency created successfully");
      router.push("/dashboard");
    });
  if (status === "loading") return null;
  if (!session?.user?.email) {
    router.push("/login");
    return null;
  }
  const email = session.user.email;

  return (
    <div className="w-full h-screen flex flex-col items-center py-8">
      <Card className="p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">
          Agency Profile{" "}
          <span className="text-sm text-muted-foreground">
            (email: {email})
          </span>
        </h1>

        <Label htmlFor="agencyName">Name (RDB, Irembo, …)</Label>
        <Input
          id="agencyName"
          type="text"
          placeholder="Enter your agency name"
          className="mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button className="mt-4" onClick={handleSave} disabled={isPending}>
          {isPending ? "Saving…" : "Save"}
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
