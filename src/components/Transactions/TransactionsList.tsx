"use client";

import { useRef, useEffect, lazy, Suspense } from "react";

import { useSession } from "next-auth/react";

import autoAnimate from "@formkit/auto-animate";

import { useGetTransactions } from "@/hooks/transactions/useGetTransactions";

import { Card } from "@/components/ui/card";
const TransactionCard = lazy(() => import("./TransactionCard"));
import { TransactionCardSkeleton } from "./TransactionCardSkeleton";
import { TransactionsEmpty } from "./TransactionsEmpty";

import type { Transaction } from "@/types/transaction";


const renderTransaction = (transaction: Transaction) => {
  return (
    <Suspense key={transaction.id} fallback={<TransactionCardSkeleton />}>
      <TransactionCard transaction={transaction} />
    </Suspense>
  );
};

export const TransactionsList = () => {
  const parent = useRef(null);

  const { data: session } = useSession();

  const { data: transactions } = useGetTransactions(
    session?.user?.id as string
  );

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="w-full mt-10">
      <h3 className="dark:text-greydark text-greylight mb-2 text-sm">
        Transactions
      </h3>

      <Card ref={parent} className="p-2 min-h-[60px]">
        {!transactions?.length ? (
          <TransactionsEmpty />
        ) : (
          transactions?.map(renderTransaction)
        )}
      </Card>
    </div>
  );
};
