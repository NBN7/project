import { TUsersResponse } from "@/types/user";

export const getUsers = async (): Promise<TUsersResponse> => {
  const response = await fetch("/api/users");
  const data = await response.json();

  return data;
};
