"use client";

import { useSession } from "next-auth/react";

import { useGetUser } from "@/hooks/useGetUser";
import { useGetTransactions } from "@/hooks/useGetTransactions";

import { transformDate } from "@/utils/transformDate";

import { Container } from "@/components/Container";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Transaction } from "@/types/transaction";

const renderTransactions = (transaction: Transaction) => {
  return (
    <div
      key={transaction.id}
      className="flex items-center justify-between m-4 cursor-pointer"
    >
      <div className="overflow-hidden">
        <p className="max-w-[200px] sm:max-w-none truncate">
          {transaction.description}
        </p>
        <p className="text-sm dark:text-greydark text-greylight">
          {transformDate(transaction.date)}
        </p>
      </div>

      <p className="font-semibold">
        {transaction.type === "expense" && "-"} {transaction.amount.toFixed(2)}
      </p>
    </div>
  );
};

export default function ApplicationPage() {
  const { data: session } = useSession();

  const { data: user, isLoading: isUserLoading } = useGetUser(
    session?.user?.id as string
  );

  const { data: transactions, isLoading: transactionsLoading } =
    useGetTransactions(session?.user?.id as string);

  return (
    <Container sectionClassName="mt-10" contentClassName="gap-1">
      <h3 className="dark:text-greydark text-greylight text-base">Balance</h3>
      {isUserLoading ? (
        <Skeleton className="flex rounded-full w-[100px] h-[40px]" />
      ) : (
        <p className="text-4xl">${user?.balance?.toFixed(2)}</p>
      )}

      <div className="w-full mt-10">
        <h3 className="dark:text-greydark text-greylight mb-2 text-sm">
          Transactions
        </h3>

        <Card>
          {transactions?.length === 0 ? (
            <div className="m-4 dark:text-greydark text-greylight text-center">
              No transactions yet
            </div>
          ) : (
            transactions?.map(renderTransactions)
          )}
        </Card>
      </div>
    </Container>
  );
}
