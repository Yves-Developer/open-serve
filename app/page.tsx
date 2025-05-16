import SignIn from "@/components/auth/sign-button";

import { auth } from "@/auth";
import SignOut from "@/components/auth/signout-button";
const Home = async () => {
  const session = await auth();
  return <div>{session ? <SignOut /> : <SignIn />}</div>;
};

export default Home;
