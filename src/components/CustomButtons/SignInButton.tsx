"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { FaGoogle } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const iconSize = "18px";

  const handleClick = async () => {
    setIsLoading(true);

    await signIn("google", { callbackUrl: "/transactions" });

    setIsLoading(false);
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      {isLoading ? (
        <Loader2
          size={iconSize}
          className="mr-2 animate-spin dark:text-icondark text-iconlight"
        />
      ) : (
        <FaGoogle
          size={iconSize}
          className="mr-2 dark:text-icondark text-iconlight"
        />
      )}
      <span>Sign In with Google</span>
    </Button>
  );
};
