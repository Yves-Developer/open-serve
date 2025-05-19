"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";

const TrackHome = () => {
  const [trackingId, setTrackingId] = useState<string>("");
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center py-32">
      <Card className="w-full max-w-[400px]">
        <CardTitle className="text-2xl text-center">Track Issues</CardTitle>
        <CardContent className="flex flex-col gap-4">
          <Label htmlFor="tracking-id" className="text-lg font-semibold">
            Tracking ID
          </Label>
          <Input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID"
          />

          <Button>
            <Link href={`/track/${trackingId}`}>Track Issue</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackHome;
