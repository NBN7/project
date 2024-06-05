"use client";

import { useSession } from "next-auth/react";

import { useGetUser } from "@/hooks/users/useGetUser";

import { TransactionsList } from "@/components/Transactions";

import { Skeleton } from "@/components/ui/skeleton";

import { formatNumber } from "@/utils/formatNumber";

export default function TransactionsPage() {
  const { data: session } = useSession();

  const { data: user, isLoading: isUserLoading } = useGetUser(
    session?.user?.id as string
  );

  const formattedBalance = formatNumber(user?.balance as number, "es-ES");

  return (
    <div className="w-full flex flex-col items-center duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <h3 className="dark:text-greydark text-greylight text-base">Balance</h3>
      {isUserLoading ? (
        <Skeleton className="flex rounded-full w-[100px] h-[40px]" />
      ) : (
        <p className="text-4xl font-semibold">${formattedBalance}</p>
      )}

      <TransactionsList />
    </div>
  );
}
