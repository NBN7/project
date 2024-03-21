"use client";

import { Button } from "@nextui-org/button";

import { IoArrowForward } from "react-icons/io5";

export const GetStartedButton = () => {
  return (
    <Button
      endContent={<IoArrowForward />}
      radius="lg"
      className="sm:w-[200px] bg-gradient-to-tr from-[#0070F0] to-[#19cfff] text-white shadow-lg"
    >
      Get Started
    </Button>
  );
};
