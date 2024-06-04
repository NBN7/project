import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTransaction } from "@/services/transactions/createTransaction";

import { toastCall } from "@/utils/toastCall";

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

export const useCreateTransaction = ({
  id,
  description,
  type,
  amount,
  date,
  isForGoal,
  goalId,
}: CreateTransactionParams) => {
  const queryClient = useQueryClient();

  const { mutate: callCreateTransactionMutation, isPending } = useMutation({
    mutationFn: () =>
      createTransaction({
        id,
        description,
        type,
        amount,
        date,
        isForGoal,
        goalId,
      }),
    onSuccess: () => {
      toastCall("Transaction created successfully!");
      queryClient.invalidateQueries({ queryKey: ["transactions", id] });
      queryClient.invalidateQueries({ queryKey: ["goals", id] });
    },
    onError: (error) => {
      toastCall(error.message);
    },
  });

  return { callCreateTransactionMutation, isPending };
};
