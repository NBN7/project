"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { twMerge } from "tailwind-merge";

import type { TTab } from "@/types/tabs";
import { TRANSACTION_TABS } from "@/constants/tabs/transactionTabs";

const renderTabs = (tab: TTab, pathname: string) => {
  return (
    <Link
      key={tab.path}
      href={tab.path}
      className={`px-1 pb-4 pt-3 text-sm font-medium transition-colors duration-150 dark:hover:text-white hover:text-black focus-visible:outline
  ${
    pathname === tab.path
      ? "border-b border-black dark:border-white dark:text-white"
      : "dark:text-greydark text-greylight"
  }
    `}
    >
      <div className="z-10 flex items-center space-x-2">
        <tab.icon size={18} />
        <span>{tab.title}</span>
      </div>
    </Link>
  );
};

interface TransactionTabsProps {
  className?: string;
}

export const TransactionTabs = ({ className }: TransactionTabsProps) => {
  const pathname = usePathname();

  return (
    <div className={twMerge("w-full", className)}>
      <div className="flex items-center space-x-8">
        {TRANSACTION_TABS.map((tab) => renderTabs(tab, pathname))}
      </div>
    </div>
  );
};
