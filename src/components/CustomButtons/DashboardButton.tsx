"use client";

import { MouseEvent } from "react";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";

import { MdSpaceDashboard } from "react-icons/md";

export const DashboardButton = () => {
  const pathname = usePathname();

  const handleDashboardClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (pathname === ROUTES.DASHBOARD) {
      e.preventDefault();
      return;
    }
  };

  const iconSize = "20px";

  return (
    <Link href={ROUTES.DASHBOARD} passHref>
      <Button
        variant="ghost"
        className="mr-2 rounded-full"
        size="icon"
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
