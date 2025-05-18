"use client";

import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

type Props = {
  name: string;
  email: string;
  image?: string;
  role: "user" | "agency";
};

const NavbarDropdown = ({ name, email, image, role }: Props) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {image && <AvatarImage src={image} />}
          <AvatarFallback>{initials || "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-5 mt-2">
        <DropdownMenuLabel className="flex items-center justify-between">
          My Account <Badge>{role === "user" ? "User" : "Agency"}</Badge>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled>{name}</DropdownMenuItem>
        <DropdownMenuItem disabled>{email}</DropdownMenuItem>

        <DropdownMenuItem>
          <button onClick={() => signOut()} className="w-full text-left">
            Log Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdown;
