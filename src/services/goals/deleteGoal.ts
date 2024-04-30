interface DeleteGoalParams {
  userId: string;
  goalId: string;
}

export const deleteGoal = async ({ userId, goalId }: DeleteGoalParams) => {
  const response = await fetch(`/api/users/${userId}/goals/${goalId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return data;
};
