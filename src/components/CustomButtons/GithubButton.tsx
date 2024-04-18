import Link from "next/link";

import { Button } from "@/components/ui/button";

import { IoLogoGithub } from "react-icons/io5";

export const GithubButton = () => {
  return (
    <Link href="https://github.com/NBN7" target="_blank">
      <Button variant="outline" className="sm:w-[200px] w-full shadow-md">
        <IoLogoGithub className="mr-2 size-5" />
        <span>GitHub</span>
      </Button>
    </Link>
  );
};
