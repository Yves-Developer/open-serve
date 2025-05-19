import { signIn } from "@/auth";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <div className="w-full flex flex-row px-52 gap-4">
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
