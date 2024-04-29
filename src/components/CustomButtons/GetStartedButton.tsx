import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";

import { IoArrowForward } from "react-icons/io5";

export const GetStartedButton = () => {
  return (
    <Link href={ROUTES.DOCS.INTRODUCTION}>
      <Button className="w-full sm:w-[200px] bg-gradient-to-tr from-[#0070F0] to-[#19cfff] hover:opacity-85 transition-all duration-150">
        <span className="text-white">Get Started</span>
        <IoArrowForward className="ml-2 text-white" />
      </Button>
    </Link>
  );
};
