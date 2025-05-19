import SignIn from "@/components/auth/sign-button";

const Login = async () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2">
      <div className="w-full flex flex-col gap-20">
        <div className="w-full flex flex-col gap-4 px-52 py-20">
          <h2 className="text-3xl font-bold">
            Welcome To Open<span className="text-primary">Serve</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Login to Your Account{" "}
          </p>
        </div>
        <SignIn />
      </div>
      <div className="magicpattern opacity-10 w-1/2"></div>
    </div>
  );
};

export default Login;
