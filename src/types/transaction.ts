import { TransactionType } from "@prisma/client";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
  isForGoal: boolean;
}

export interface TransactionSummary {
  month: string;
  income: number;
  expense: number;
}
