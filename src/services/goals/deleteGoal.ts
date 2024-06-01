interface DeleteGoalParams {
  userId: string;
  goalId: string;
}

export const deleteGoal = async ({ userId, goalId }: DeleteGoalParams) => {
  const response = await fetch(`/api/users/${userId}/goals/${goalId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${response.status}: ${errorData.error}`);
  }

  const data = await response.json();

  return data;
};
