interface CreateGoalParams {
  id: string;
  title: string;
  amount: number;
  startDate: Date;
  dueDate: Date;
}

export const createGoal = async ({
  id,
  title,
  amount,
  startDate,
  dueDate,
}: CreateGoalParams) => {
  const response = await fetch(`/api/users/${id}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      amount,
      startDate,
      dueDate,
    }),
  });
  const data = await response.json();

  return data;
};
