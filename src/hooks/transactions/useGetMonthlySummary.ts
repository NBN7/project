import { useQuery } from "@tanstack/react-query";

import { getMonthlySummary } from "@/services/transactions/getMonthlySummary";

export const useGetMonthlySummary = (id: string) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["monthlySummary", id],
    queryFn: () => getMonthlySummary(id),
    enabled: !!id,
  });

  return { isLoading, isError, data, refetch };
};
