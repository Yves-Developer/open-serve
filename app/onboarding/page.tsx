import { auth } from "@/auth";
import OnboardClient from "@/components/onboard/client";
import { redirect } from "next/navigation";
import { getUserRole } from "../service/getRole";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/login");

  const { success, role } = await getUserRole(session.user.id);

  if (success && role) {
    return redirect("/dashboard");
  }

  return <OnboardClient />;
}
