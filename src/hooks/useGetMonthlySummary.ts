import { useQuery } from "@tanstack/react-query";

import { getMonthlySummary } from "@/services/getMonthlySummary";

export const useGetMonthlySummary = (id: string) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["monthlySummary"],
    queryFn: () => getMonthlySummary(id),
    enabled: !!id,
  });

  return { isLoading, isError, data, refetch };
};
