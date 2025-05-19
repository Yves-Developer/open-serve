import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BadgeCheck, File, GitGraph } from "lucide-react";
import Link from "next/link";

export default async function Landing() {
  const session = await auth();
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <section className="flex-1 px-6 md:px-20 py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Resolve Public Issues <br /> Faster with{" "}
            <span className="text-primary">OpenServe</span>
          </h1>
          <p className="text-muted-foreground max-w-lg">
            A unified platform that connects citizens to government agencies,
            tracks service requests in real‑time, and brings full transparency
            to public‑service delivery.
          </p>
          <div className="space-x-4">
            {session ? (
              <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="lg">Create Account</Button>
              </Link>
            )}
            <Link href="/track">
              <Button variant="outline" size="lg">
                Track an Issue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative w-full h-[350px] md:h-[450px] animate-fade-in">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 blur-2xl" />
          <div className="magicpattern bg-blend-color-burn relative w-full h-full object-contain drop-shadow-xl" />
        </div>
      </section>

      <section className="px-6 md:px-20 py-24 bg-muted/10">
        <h2 className="text-center text-3xl font-bold mb-14">
          How <span className="text-primary">OpenServe</span> Works
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Report",
              desc: "Submit an issue to the correct agency in seconds using our smart form.",
              icon: <File />,
            },
            {
              title: "Track",
              desc: "Follow real‑time progress from submission to resolution in your dashboard.",
              icon: <GitGraph />,
            },
            {
              title: "Resolve",
              desc: "Get notified when the agency marks the complaint resolved and provide feedback.",
              icon: <BadgeCheck />,
            },
          ].map(({ title, desc, icon }) => (
            <Card
              key={title}
              className="backdrop-blur-sm bg-background/60 border border-border/40 hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <span className="text-4xl p-2 bg-primary/30 rounded-sm text-primary">
                  {icon}
                </span>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── Call to action ────────────────────────────────────── */}
      <section className="px-6 md:px-20 py-24 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to make public services better?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of citizens improving transparency and accountability.
          It only takes a minute to get started.
        </p>
        <Link href="/auth/signin">
          <Button size="lg">Create your first issue</Button>
        </Link>
      </section>
      <hr className="border-input" />
      <p className="text-center py-5 font-semibold">
        BUILD WITH BY MUGISHA YVES For HACKANTON &copy; 2025
        <br /> <Link href="/privacy">Privacy Policy</Link> |{" "}
        <Link href="/terms">Terms of Service</Link>
        <br />
        <Link className="text-primary" href="https://yvesdc.vercel.app#contact">
          Contact Us
        </Link>{" "}
        |{" "}
        <Link className="text-primary" href="https://yvesdc.vercel.app">
          About Us
        </Link>
        |{" "}
        <Link className="text-primary" href="https://github.com/Yves-Developer">
          Github
        </Link>
      </p>
    </main>
  );
}
