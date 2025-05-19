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
import ChangeStatus from "../agency/ChangeStatus";
import { cn } from "@/lib/utils";

type Props = {
  trackingId: string;
  category: string;
  description: string;
  status: "submitted" | "progress" | "resolved" | "closed";
  agencyName: string;
  userName?: string;
  role: string;
  descStyle?: string;
};

export default function ComplaintCard({
  trackingId,
  category,
  description,
  status,
  agencyName,
  userName,
  role,
  descStyle = "line-clamp-2",
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
        <p
          className={cn(
            `text-sm  border-l border-input bg-accent/10 break-words p-2 text-muted-foreground`,
            descStyle
          )}
        >
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center gap-2 justify-between pt-4">
        {role === "agency" ? (
          <ChangeStatus trackingId={trackingId} currentStatus={status} />
        ) : (
          <>
            {status === "submitted" && <Badge>{status}</Badge>}
            {status === "progress" && (
              <Badge className="bg-yellow-400/50 text-yellow-300">
                {status}
              </Badge>
            )}
            {status === "resolved" && (
              <Badge className="bg-green-600 text-background">{status}</Badge>
            )}
            {status === "closed" && <Badge variant="secondary">{status}</Badge>}
          </>
        )}

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 cursor-help">
                <Hash className="h-4 w-4 text-primary" />

                <span className="font-mono font-semibold text-sm truncate max-w-[60px]">
                  {role == "agency" ? userName : agencyName}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {role == "agency" ? userName : agencyName}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button size="icon" variant="ghost">
          <Link href={`/complaint/${trackingId}`}>
            <MessagesSquare className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
