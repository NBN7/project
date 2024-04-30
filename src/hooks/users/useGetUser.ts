import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/services/users/getUser";

export const useGetUser = (id: string) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  return { isLoading, isError, data, refetch };
};
