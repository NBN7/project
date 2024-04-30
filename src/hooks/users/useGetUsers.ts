import { useQuery } from "@tanstack/react-query";

import type { TUsersResponse, TUser } from "@/types/user";
import { getUsers } from "@/services/users/getUsers";

export const useGetUsers = () => {
  const { isLoading, isError, data, refetch } = useQuery<TUsersResponse>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const users: TUser[] = data?.users ?? [];

  return {
    isLoading,
    isError,
    users,
    refetch,
  };
};
