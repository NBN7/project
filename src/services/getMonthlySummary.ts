import type { TransactionSummary } from "@/types/transaction";

export const getMonthlySummary = async (
  id: string
): Promise<TransactionSummary[]> => {
  const response = await fetch(`/api/users/${id}/transactions/summary`);
  const data: TransactionSummary[] = await response.json();

  return data;
};
