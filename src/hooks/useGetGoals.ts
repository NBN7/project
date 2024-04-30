import { useQuery } from "@tanstack/react-query";

import { getGoals } from "@/services/getGoals";

export const useGetGoals = (id: string) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["goals"],
    queryFn: () => getGoals(id),
    enabled: !!id,
  });

  return { isLoading, isError, data, refetch };
};
