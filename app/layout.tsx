import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navigation";

export const metadata: Metadata = {
  title: "OpenServe",
  description:
    "System that empowers citizens to submit complaints or feedback regarding public services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
