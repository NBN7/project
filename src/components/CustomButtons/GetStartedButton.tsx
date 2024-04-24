import Link from "next/link";

import { Button } from "@/components/ui/button";

import { IoArrowForward } from "react-icons/io5";

export const GetStartedButton = () => {
  return (
    <Link href="/docs">
      <Button className="w-full sm:w-[200px] bg-gradient-to-tr from-[#0070F0] to-[#19cfff]">
        <span className="text-white">Get Started</span>
        <IoArrowForward className="ml-2 text-white" />
      </Button>
    </Link>
  );
};
