import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTransaction } from "@/services/deleteTransaction";

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
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toastCall("Transaction deleted successfully");
    },
    onError: () => {
      toastCall("Error deleting transaction");
    },
  });

  return { callDeleteTransactionMutation };
};
