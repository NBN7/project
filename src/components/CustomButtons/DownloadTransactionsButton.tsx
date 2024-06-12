"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { useGetTransactions } from "@/hooks/transactions";

import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { downloadJSONTransactions } from "@/utils/transactions/downloadJSONTransactions";
import { downloadCSVTransactions } from "@/utils/transactions/downloadCSVTransactions";

import { DOWNLOAD } from "@/constants/download";
import { TDownload } from "@/types/download";

import { DownloadIcon } from "lucide-react";

interface DownloadTransactionsButtonProps {
  className?: string;
}

export const DownloadTransactionsButton = ({
  className,
}: DownloadTransactionsButtonProps) => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: transactions } = useGetTransactions(session?.user.id as string);

  const handleDownloadTransactions = async (downloadType: TDownload) => {
    setIsLoading(true);

    if (downloadType === DOWNLOAD.JSON) await downloadJSONTransactions(transactions);
    if (downloadType === DOWNLOAD.CSV) await downloadCSVTransactions(transactions);

    setIsLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={twMerge(className)}
          variant="outline"
          disabled={isLoading}
        >
          <DownloadIcon
            size={16}
            className="mr-2 dark:text-icondark text-iconlight"
          />
          <span>Export transactions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="start"
        className="w-[186px]"
      >
        {Object.keys(DOWNLOAD).map((key) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleDownloadTransactions(key as TDownload)}
            disabled={isLoading}
          >
            {key}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
