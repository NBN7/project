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
}: CreateTransactionParams) => {
  const response = await fetch(`/api/users/${id}/transactions`, {
    method: "POST",
    body: JSON.stringify({ description, type, amount, date }),
  });
  const data = response.json();

  return data;
};
