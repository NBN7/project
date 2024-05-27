import { Transaction } from "@/types/transaction";
import { TransactionType } from "@prisma/client";

interface CreateTransactionParams {
  id: string;
  description: string;
  type: TransactionType;
  amount: number;
  date: Date;
  isForGoal: boolean;
}

export const createTransaction = async ({
  id,
  description,
  type,
  amount,
  date,
  isForGoal,
}: CreateTransactionParams): Promise<Transaction> => {
  const response = await fetch(`/api/users/${id}/transactions`, {
    method: "POST",
    body: JSON.stringify({ description, type, amount, date, isForGoal }),
  });
  const data: Transaction = await response.json();

  return data;
};
