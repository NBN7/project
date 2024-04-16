"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { SignInButton } from "@/components/CustomButtons/SignInButton";
import { Container } from "@/components/Container";

export default function AuthPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <Container sectionClassName="mt-20">
      {/* title */}
      <h1 className="text-4xl font-semibold text-pretty">
        Welcome to{" "}
        <span className="from-[#0070F0] to-[#19cfff] bg-clip-text text-transparent bg-gradient-to-b">
          [App]
        </span>
      </h1>

      {/* description */}
      <p className="text-xl dark:text-greydark text-greylight">
        Sign In to do the most of the app.
      </p>

      {/* buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <SignInButton />
      </div>
    </Container>
  );
}
