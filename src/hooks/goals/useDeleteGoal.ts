import { useMutation, QueryClient } from "@tanstack/react-query";

import { deleteGoal } from "@/services/goals/deleteGoal";

import { toastCall } from "@/utils/toastCall";

interface DeleteGoalParams {
  userId: string;
  goalId: string;
}

export const useDeleteGoal = ({ userId, goalId }: DeleteGoalParams) => {
  const queryClient = new QueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteGoal({ userId, goalId }),
    onSuccess: () => {
      toastCall("Goal deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["goals", userId] });
    },
    onError: () => {
      toastCall("Error deleting goal");
    },
  });

  return { mutate };
};
