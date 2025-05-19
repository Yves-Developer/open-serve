import SignIn from "@/components/auth/sign-button";

const Login = async () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4 px-6 md:px-52 py-20">
          <h2 className="text-3xl font-bold">
            Welcome to Open<span className="text-primary">Serve</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Sign in to access your dashboard, track issues in real‑time, and
            help improve public services.
          </p>

          <p className="text-sm text-muted-foreground/80">
            New here? Your account is created automatically the first time you
            sign in—no lengthy forms.
          </p>
          <p className="text-sm text-muted-foreground/80">
            We value your privacy: your data is encrypted and never shared
            without your consent.
          </p>
        </div>

        <SignIn />
      </div>

      <div className="magicpattern opacity-10 w-1/2" />
    </div>
  );
};

export default Login;
