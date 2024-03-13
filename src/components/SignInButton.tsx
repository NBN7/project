"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { Button } from "@nextui-org/button";

import { twMerge } from "tailwind-merge";

import { FaGoogle } from "react-icons/fa";

interface SignInButtonProps {
  className?: string;
}

export const SignInButton = ({ className }: SignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    await signIn("google");

    setIsLoading(false);
  };

  return (
    <Button
      className={twMerge("", className)}
      variant="light"
      startContent={
        isLoading ? null : (
          <FaGoogle size="18px" className="dark:text-icondark text-iconlight" />
        )
      }
      isLoading={isLoading}
      onClick={handleClick}
    >
      Sign In with Google
    </Button>
  );
};
