"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { respondToComplaint } from "@/app/service/complaint";

export default function AddResponseForm({
  trackingId,
}: {
  trackingId: string;
}) {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    if (!text.trim()) return;
    startTransition(async () => {
      const ok = await respondToComplaint({ trackingId, responseText: text });
      if (ok) {
        toast.success("Response added");
        setText("");
      } else toast.error("Failed to add response");
    });
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Add response</h3>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Write your reply to the citizen…"
        disabled={isPending}
      />
      <Button onClick={submit} disabled={isPending}>
        {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
        Submit
      </Button>
    </div>
  );
}
