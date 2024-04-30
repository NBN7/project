import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createGoal } from "@/services/goals/createGoal";

import { toastCall } from "@/utils/toastCall";

interface CreateGoalParams {
  id: string;
  title: string;
  amount: number;
  startDate: Date;
  dueDate: Date;
}

export const useCreateGoal = ({
  id,
  title,
  amount,
  startDate,
  dueDate,
}: CreateGoalParams) => {
  const queryClient = useQueryClient();

  const { mutate: callCreateGoalMutation, isPending } = useMutation({
    mutationFn: () => createGoal({ id, title, amount, startDate, dueDate }),
    onSuccess: () => {
      toastCall("Goal created successfully!");
      queryClient.invalidateQueries({ queryKey: ["goals", id] });
    },
    onError: () => {
      toastCall("Error creating goal");
    },
  });

  return { callCreateGoalMutation, isPending };
};
