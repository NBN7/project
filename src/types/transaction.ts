export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
}

export interface TransactionSummary {
  month: string;
  income: number;
  expense: number;
}
