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
  const parent = useRef(null);

  const { data: session } = useSession();
  const { data: transactions } = useGetTransactions(
    session?.user?.id as string
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!transactions) return;

    const value = e.target.value.toLowerCase();
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(value)
    );

    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    if (transactions && !filteredTransactions) {
      setFilteredTransactions(transactions);
    }
  }, [transactions, filteredTransactions]);

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
        onChange={handleChange}
        disabled={!transactions?.length}
      />

      <Card ref={parent} className="p-2 min-h-[60px] max-h-[calc(100dvh-350px)] overflow-auto">
        {!transactions?.length ? (
          <TransactionCardSkeleton />
        ) : filteredTransactions && filteredTransactions.length > 0 ? (
          filteredTransactions.map(renderTransaction)
        ) : (
          <TransactionsEmpty />
        )}
      </Card>
    </div>
  );
};
