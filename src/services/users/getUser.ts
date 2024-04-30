import type { TUser } from "@/types/user";

export const getUser = async (id: string): Promise<TUser> => {
  const response = await fetch(`/api/users/${id}`);
  const data: TUser = await response.json();

  return data;
};
