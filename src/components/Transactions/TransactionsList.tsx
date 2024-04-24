"use client";

import { lazy, Suspense } from "react";

import { useSession } from "next-auth/react";

import { useGetTransactions } from "@/hooks/useGetTransactions";

import { Card } from "@/components/ui/card";
const TransactionCard = lazy(() => import("./TransactionCard"));
import { TransactionCardSkeleton } from "./TransactionCardSkeleton";
import { TransactionsEmpty } from "./TransactionsEmpty";

import type { Transaction } from "@/types/transaction";

const renderTransactions = (transaction: Transaction) => {
  return (
    <Suspense key={transaction.id} fallback={<TransactionCardSkeleton />}>
      <TransactionCard transaction={transaction} />
    </Suspense>
  );
};

export const TransactionsList = () => {
  const { data: session } = useSession();

  const { data: transactions } = useGetTransactions(
    session?.user?.id as string
  );

  return (
    <div className="w-full mt-10">
      <h3 className="dark:text-greydark text-greylight mb-2 text-sm">
        Transactions
      </h3>

      <Card className="p-2">
        {transactions?.length === 0 ? (
          <TransactionsEmpty />
        ) : (
          transactions?.map(renderTransactions)
        )}
      </Card>
    </div>
  );
};
