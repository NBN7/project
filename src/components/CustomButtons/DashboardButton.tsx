"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { Button } from "@nextui-org/button";

import { MouseEvent } from "react";

import { MdSpaceDashboard } from "react-icons/md";

export const DashboardButton = () => {
  const pathname = usePathname();

  const handleDashboardClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (pathname === "/dashboard") {
      e.preventDefault();
      return;
    }
  };

  const iconSize = "20px";

  return (
    <Link href="/dashboard" passHref>
      <Button
        isIconOnly
        className="bg-transparent mr-2"
        radius="full"
        onClick={handleDashboardClick}
      >
        <MdSpaceDashboard
          size={iconSize}
          className="dark:text-icondark text-iconlight cursor-pointer"
        />
      </Button>
    </Link>
  );
};
