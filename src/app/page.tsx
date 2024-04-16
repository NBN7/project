"use client";

import { Container } from "@/components/Container";
import { GetStartedButton } from "@/components/CustomButtons/GetStartedButton";
import { GithubButton } from "@/components/CustomButtons/GithubButton";

export default function HomePage() {
  return (
    <main>
      <Container sectionClassName="mt-20">
        <div className="w-full flex flex-col gap-6">
          {/* title */}
          <h1 className="text-4xl font-semibold text-pretty">
            <span className="from-[#0070F0] to-[#19cfff] bg-clip-text text-transparent bg-gradient-to-b">
              Jot it down
            </span>
            , make it last, transform your day.
          </h1>

          {/* description */}
          <p className="text-xl dark:text-greydark text-greylight">
            Fast and modern [Savings App].
          </p>

          {/* buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <GetStartedButton />
            <GithubButton />
          </div>
        </div>
      </Container>
    </main>
  );
}
