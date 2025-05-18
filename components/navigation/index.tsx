import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignOut from "../auth/signout-button";
const Navbar = async () => {
  const session = await auth();
  if (!session) return null;
  const name = session?.user?.name ? session.user.name.split(" ") : "";
  const letter = name[0][0] + name[1][0] || "U";
  return (
    <div className="w-full py-5 border-b border-input">
      <div className="px-10 w-full max-w-7xl mx-auto">
        <div className="w-full flex justify-between items-center">
          <div>
            <h3 className="text-xl lg:text-3xl font-bold">
              Open<span className="text-primary">Serve</span>
            </h3>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              href={"/track"}
              className="text-md font-semibold hover:text-primary"
            >
              Track Issue
            </Link>
            <div>
              <Button>Report Issue</Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                {session && (
                  <Avatar>
                    <AvatarImage src={session?.user?.image} />
                    <AvatarFallback>{letter}</AvatarFallback>
                  </Avatar>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 mr-5">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{session?.user?.name}</DropdownMenuItem>
                <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
