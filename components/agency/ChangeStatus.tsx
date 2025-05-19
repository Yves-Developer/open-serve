"use client";

import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { respondToComplaint } from "@/app/service/complaint";
import { Loader2 } from "lucide-react";

type Status = "submitted" | "progress" | "resolved" | "closed";

type Props = { trackingId: string; currentStatus: Status };

export default function ChangeStatus({ trackingId, currentStatus }: Props) {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const updateStatus = (value: Status) => {
    if (value === "submitted" || value === status) return; // no‑op
    startTransition(async () => {
      await respondToComplaint({ trackingId, status: value });

      setStatus(value);
    });
  };

  return (
    <Select
      value={status}
      onValueChange={(v) => updateStatus(v as Status)}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
        {isPending && <Loader2 className="ml-2 size-4 animate-spin" />}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="submitted" disabled>
          Submitted
        </SelectItem>
        <SelectItem value="progress">Progress</SelectItem>
        <SelectItem value="resolved">Resolved</SelectItem>
        <SelectItem value="closed">Closed</SelectItem>
      </SelectContent>
    </Select>
  );
}
