import { signIn } from "@/auth";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <div className="w-full h-screen max-w-7xl mx-auto flex gap-4 py-52">
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button type="submit">Signin with Github</Button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button type="submit" variant="outline">
          Signin with Google
        </Button>
      </form>
    </div>
  );
}
