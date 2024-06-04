import { Transaction } from "@/types/transaction";
import { TransactionType } from "@prisma/client";

interface CreateTransactionParams {
  id: string;
  description: string;
  type: TransactionType;
  amount: number;
  date: Date;
  isForGoal: boolean;
  goalId?: string;
}

export const createTransaction = async ({
  id,
  description,
  type,
  amount,
  date,
  isForGoal,
  goalId,
}: CreateTransactionParams): Promise<Transaction> => {
  const response = await fetch(`/api/users/${id}/transactions`, {
    method: "POST",
    body: JSON.stringify({
      description,
      type,
      amount,
      date,
      isForGoal,
      goalId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${response.status}: ${errorData.error}`);
  }

  const data: Transaction = await response.json();

  return data;
};
