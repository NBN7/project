import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants";

import { IoChevronBack } from "react-icons/io5";

export const GoBackButton = () => {
  const iconSize = "20px";

  return (
    <Link href={ROUTES.HOME}>
      <Button
        variant="ghost"
        className="dark:text-icondark text-iconlight rounded-full"
        size="icon"
      >
        <IoChevronBack size={iconSize} />
      </Button>
    </Link>
  );
};
