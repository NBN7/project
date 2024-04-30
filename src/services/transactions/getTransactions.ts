import type { Transaction } from "@/types/transaction";

export const getTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  const response = await fetch(`/api/users/${userId}/transactions`);
  const data: Transaction[] = await response.json();

  return data;
};
