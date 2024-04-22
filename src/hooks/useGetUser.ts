import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/services/getUser";

export const useGetUser = (id: string) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  return { isLoading, isError, data, refetch };
};
