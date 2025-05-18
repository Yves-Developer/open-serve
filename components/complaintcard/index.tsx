"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { CircleHelp, Copy, Hash, MessagesSquare } from "lucide-react";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  trackingId: string;
  category: string;
  description: string;
  status: "submitted" | "progress" | "resolved" | "rejected";
  agencyName: string;
};

export default function ComplaintCard({
  trackingId,
  category,
  description,
  status,
  agencyName,
}: Props) {
  const copyId = async () => {
    await navigator.clipboard.writeText(trackingId);
    toast.success("Tracking ID copied");
  };

  return (
    <Card className="relative group">
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-help">
                <CircleHelp className="h-4 w-4 text-primary" />

                <span className="font-mono text-sm truncate max-w-[170px]">
                  <Badge variant="secondary">{trackingId}</Badge>
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Tracking ID (Ticket ID)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          size="icon"
          variant="ghost"
          onClick={copyId}
          className="h-7 w-7 opacity-0 group-hover:opacity-100 md:opacity-100"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-1">
        <h3 className="text-sm font-semibold">{category}</h3>
        <p className="text-sm  border-l border-input bg-accent/10 p-2 text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4">
        <Badge>{status}</Badge>

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-help">
                <Hash className="h-4 w-4 text-primary" />

                <span className="font-mono font-semibold text-sm truncate max-w-[100px]">
                  {agencyName || "Agency"}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {agencyName || "Full Agency"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button size="icon" variant="ghost">
          <Link href={`/complaints/${trackingId}`}>
            <MessagesSquare className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
