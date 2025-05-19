import Link from "next/link";
import { auth } from "@/auth";
import IssueFormWrapper from "../form/issueFormWrapper";
import { getUserRole } from "@/app/service/getRole";
import NavbarDropdown from "../auth/NavbarDropDown";

export default async function Navbar() {
  const session = await auth();
  const roleDoc = session ? await getUserRole(session.user.id) : null;

  return (
    <header className="w-full border-b border-input py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10">
        <h3 className="text-xl font-bold lg:text-3xl">
          <Link href="/">
            Open<span className="text-primary">Serve</span>
          </Link>
        </h3>

        <nav className="flex items-center gap-4">
          {session && (
            <Link
              href="/dashboard"
              className="font-semibold hover:text-primary"
            >
              Dashbord
            </Link>
          )}
          <Link href="/track" className="font-semibold hover:text-primary">
            Track Issue
          </Link>

          {session && roleDoc?.role === "user" && <IssueFormWrapper />}

          {/** right side: dropdown when signed in, login link when out */}
          {session ? (
            <NavbarDropdown
              name={session.user.name ?? "Unknown"}
              email={session.user.email!}
              image={session.user.image ?? undefined}
              role={roleDoc?.role}
            />
          ) : (
            <Link href="/login" className="font-semibold hover:text-primary">
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
