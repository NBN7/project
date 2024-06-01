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

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${response.status}: ${errorData.error}`);
  }

  const data = await response.json();

  return data;
};
