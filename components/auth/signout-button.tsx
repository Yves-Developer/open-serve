import { signOutAction } from "./actions";

export default function SignOut() {
  return (
    <form action={signOutAction}>
      <button type="submit"> Log Out</button>
    </form>
  );
}
