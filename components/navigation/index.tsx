import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import SignOut from "@/components/auth/signout-button";

import { auth } from "@/auth";
import IssueFormWrapper from "../form/issueFormWrapper";

export default async function Navbar() {
  const session = await auth();

  if (!session) return null;

  const nameParts = session.user?.name?.split(" ") ?? [];
  const initials =
    nameParts.length >= 2
      ? nameParts[0][0] + nameParts[1][0]
      : nameParts[0]?.[0] ?? "U";

  return (
    <header className="w-full border-b border-input py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10">
        <h3 className="text-xl font-bold lg:text-3xl">
          Open<span className="text-primary">Serve</span>
        </h3>
        {/* ─────────────────────── Track Issues ─────────────────────── */}
        <nav className="flex items-center gap-4">
          <Link
            href="/track"
            className="text-md font-semibold hover:text-primary"
          >
            Track Issue
          </Link>

          {/* ─── New Complaint dialog ─────────────────────── */}
          <IssueFormWrapper />

          {/* ─── Avatar dropdown ──────────────────────────── */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                {session.user.image && <AvatarImage src={session.user.image} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-5 mt-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{session.user.name}</DropdownMenuItem>
              <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
              <DropdownMenuItem>
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
