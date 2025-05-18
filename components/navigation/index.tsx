import Link from "next/link";

import { auth } from "@/auth";
import IssueFormWrapper from "../form/issueFormWrapper";
import { getUserRole } from "@/app/service/getRole";

import NavbarDropdown from "../auth/NavbarDropDown";

export default async function Navbar() {
  const session = await auth();

  if (!session) return null;
  const Role = await getUserRole(session.user.id);

  // const nameParts = session.user?.name?.split(" ") ?? [];
  // const initials =
  //   nameParts.length >= 2
  //     ? nameParts[0][0] + nameParts[1][0]
  //     : nameParts[0]?.[0] ?? "U";
  // const handleSignOut = async () => {
  //   await signOut();
  // };
  return (
    <header className="w-full border-b border-input py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10">
        <h3 className="text-xl font-bold lg:text-3xl">
          Open<span className="text-primary">Serve</span>
        </h3>
        {/* ______________________ Track Issues ______________________ */}
        <nav className="flex items-center gap-4">
          <Link
            href="/track"
            className="text-md font-semibold hover:text-primary"
          >
            Track Issue
          </Link>

          {/* _____________ New Complaint dialog ___________________ */}

          {Role && Role.role === "user" ? <IssueFormWrapper /> : ""}

          {/* _____________ Avatar dropdown ______________________ */}
          <NavbarDropdown
            name={session.user.name ?? "Unknown"}
            email={session.user.email!}
            image={session.user.image ?? undefined}
            role={Role.role}
          />
        </nav>
      </div>
    </header>
  );
}
