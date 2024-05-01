"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { useGetTransactions } from "@/hooks/transactions";

import { twMerge } from "tailwind-merge";

import { Button } from "../ui/button";

import { toastCall } from "@/utils/toastCall";
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

  const handleDownloadTransactions = async () => {
    setIsLoading(true);

    try {
      // create a blob with the transactions data as json
      const blob = new Blob([JSON.stringify(transactions)], {
        type: "application/json",
      });
      // create a temporary url for the blob
      const url = URL.createObjectURL(blob);
      // create an anchor element which is not added to the dom
      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.json";
      a.click();

      // revoke the object url to free up memory
      URL.revokeObjectURL(url);
      toastCall("Transactions exported successfully");
    } catch (error) {
      toastCall("Failed to export transactions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={twMerge(className)}
      variant="outline"
      onClick={handleDownloadTransactions}
      disabled={isLoading}
    >
      <DownloadIcon
        size={16}
        className="mr-2 dark:text-icondark text-iconlight"
      />
      <span>Export transactions</span>
    </Button>
  );
};
