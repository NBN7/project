"use client";

import { Container } from "@/components/Container";
import { GetStartedButton, GithubButton } from "@/components/CustomButtons";
import { Pill } from "@/components/Pill";

const circle = (
  <div
    aria-hidden="true"
    className="bg-[#0070F0] animate-pulse size-[6px] rounded-full"
  ></div>
);

export default function HomePage() {
  return (
    <main>
      <Container sectionClassName="mt-20">
        <div className="w-full flex flex-col gap-4 text-center items-center">
          <Pill icon={circle} title="Introducing v1.0.0" />
          {/* title */}
          <h1 className="text-4xl font-semibold text-pretty duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
            <span className="from-[#0070F0] to-[#19cfff] bg-clip-text text-transparent bg-gradient-to-b">
              Jot it down
            </span>
            , make it last, transform your day.
          </h1>

          {/* description */}
          <p className="text-xl dark:text-greydark text-greylight duration-700 animate-in fade-in-5 slide-in-from-top-2">
            Fast and modern Finance App.
          </p>

          {/* buttons */}
          <div className="w-full flex flex-col justify-center sm:flex-row gap-2 p-4">
            <GetStartedButton />
            <GithubButton />
          </div>
        </div>
      </Container>
    </main>
  );
}
