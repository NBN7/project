"use client";

import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { useSession } from "next-auth/react";

import autoAnimate from "@formkit/auto-animate";

import { useGetTransactions } from "@/hooks/transactions/useGetTransactions";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
const TransactionCard = lazy(() => import("./TransactionCard"));
import { TransactionCardSkeleton } from "./TransactionCardSkeleton";
import { TransactionsEmpty } from "./TransactionsEmpty";

import type { Transaction } from "@/types/transaction";

const renderTransaction = (transaction: Transaction) => (
  <Suspense key={transaction.id} fallback={<TransactionCardSkeleton />}>
    <TransactionCard transaction={transaction} />
  </Suspense>
);

export const TransactionsList = () => {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[] | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const parent = useRef(null);

  const { data: session } = useSession();
  const { data: transactions } = useGetTransactions(
    session?.user?.id as string
  );

  useEffect(() => {
    if (transactions) {
      if (searchQuery) {
        setFilteredTransactions(
          transactions.filter((transaction) =>
            transaction.description
              .toLowerCase()
              .trim()
              .includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredTransactions(transactions);
      }
    }
  }, [transactions, searchQuery]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="w-full mt-10">
      <h3 className="dark:text-greydark text-greylight mb-2 text-sm">
        Transactions
      </h3>

      <Input
        type="search"
        placeholder="Search..."
        className="w-full mb-2 focus-visible:ring-offset-0 focus-visible:ring-0"
        disabled={!transactions?.length}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Card
        ref={parent}
        className="p-2 min-h-[60px] max-h-[calc(100dvh-355px)] overflow-auto sm:max-h-96"
      >
        {!transactions ? (
          <TransactionCardSkeleton />
        ) : !transactions.length ? (
          <TransactionsEmpty />
        ) : filteredTransactions && filteredTransactions.length > 0 ? (
          filteredTransactions.map(renderTransaction)
        ) : (
          <TransactionsEmpty />
        )}
      </Card>
    </div>
  );
};
