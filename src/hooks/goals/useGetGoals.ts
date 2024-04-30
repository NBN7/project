import { useQuery } from "@tanstack/react-query";

import { getGoals } from "@/services/goals/getGoals";

export const useGetGoals = (id: string) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["goals", id],
    queryFn: () => getGoals(id),
    enabled: !!id,
  });

  return { isLoading, isError, data, refetch };
};
