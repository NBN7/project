"use client";

import { Container } from "@/components/Container";

import { Button } from "@nextui-org/button";

import { IoArrowForward, IoLogoGithub } from "react-icons/io5";

export default function HomePage() {
  return (
    <main>
      <Container sectionClassName="mt-20 font-semibold">
        <div className="flex flex-col gap-6 text-pretty">
          {/* title */}
          <h1 className="text-4xl">
            <span className="from-[#0070F0] to-[#19cfff] bg-clip-text text-transparent bg-gradient-to-b">
              Jot it down
            </span>
            , make it last, transform your day.
          </h1>

          {/* description */}
          <p className="text-xl dark:text-greydark text-greylight">
            Fast and modern notes.
          </p>

          {/* buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              endContent={<IoArrowForward />}
              radius="lg"
              className="sm:w-[200px] bg-gradient-to-tr from-[#0070F0] to-[#19cfff] text-white shadow-lg"
            >
              Get Started
            </Button>
            <Button
              startContent={<IoLogoGithub size="18px" />}
              radius="lg"
              variant="bordered"
              className="sm:w-[200px] dark:bg-gradient-to-tr dark:from-[#000000] dark:to-[#171717] dark:text-darkmode text-lightmode shadow-lg"
            >
              GitHub
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
