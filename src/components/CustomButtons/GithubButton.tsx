import Link from "next/link";

import { Button } from "@nextui-org/button";

import { IoLogoGithub } from "react-icons/io5";

export const GithubButton = () => {
  return (
    <Link href="https://github.com/NBN7" target="_blank">
      <Button
        startContent={<IoLogoGithub size="18px" />}
        radius="lg"
        variant="bordered"
        className="sm:w-[200px] w-full dark:bg-gradient-to-tr dark:from-[#000000] dark:to-[#171717] dark:text-darkmode text-lightmode shadow-lg"
      >
        GitHub
      </Button>
    </Link>
  );
};
