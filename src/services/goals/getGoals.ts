import type { TGoal } from "@/types";

export const getGoals = async (id: string): Promise<TGoal[]> => {
  const response = await fetch(`/api/users/${id}/goals`);
  const data: TGoal[] = await response.json();

  return data;
};
