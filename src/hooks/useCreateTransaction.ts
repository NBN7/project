import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTransaction } from "@/services/createTransaction";

import { toastCall } from "@/utils/toastCall";

import type { TransactionType } from "@/types/transaction";

interface CreateTransactionParams {
  id: string;
  description: string;
  type: TransactionType;
  amount: number;
  date: Date;
}

export const useCreateTransaction = ({
  id,
  description,
  type,
  amount,
  date,
}: CreateTransactionParams) => {
  const queryClient = useQueryClient();

  const { mutate: callCreateTransactionMutation, isPending } = useMutation({
    mutationFn: () =>
      createTransaction({ id, description, type, amount, date }),
    onSuccess: () => {
      toastCall("Transaction created successfully!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toastCall("Error creating transaction");
    },
  });

  return { callCreateTransactionMutation, isPending };
};
