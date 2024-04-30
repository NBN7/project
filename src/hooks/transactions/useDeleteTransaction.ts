import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTransaction } from "@/services/transactions/deleteTransaction";

import { toastCall } from "@/utils/toastCall";

interface UseDeleteTransactionParams {
  userId: string;
  transactionId: string;
}

export const useDeleteTransaction = ({
  userId,
  transactionId,
}: UseDeleteTransactionParams) => {
  const queryClient = useQueryClient();

  const { mutate: callDeleteTransactionMutation } = useMutation({
    mutationFn: () => deleteTransaction(userId, transactionId),
    onSuccess: () => {
      toastCall("Transaction deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: () => {
      toastCall("Error deleting transaction");
    },
  });

  return { callDeleteTransactionMutation };
};
