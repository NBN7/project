import { Transaction } from "@/types/transaction";
import type { TransactionType } from "@/types/transaction";

interface CreateTransactionParams {
  id: string;
  description: string;
  type: TransactionType;
  amount: number;
  date: Date;
}

export const createTransaction = async ({
  id,
  description,
  type,
  amount,
  date,
}: CreateTransactionParams): Promise<Transaction> => {
  const response = await fetch(`/api/users/${id}/transactions`, {
    method: "POST",
    body: JSON.stringify({ description, type, amount, date }),
  });
  const data: Transaction = await response.json();

  return data;
};
