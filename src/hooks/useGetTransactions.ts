import { useQuery } from "@tanstack/react-query";

import { getTransactions } from "@/services/getTransactions";

export const useGetTransactions = (id: string) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(id),
    enabled: !!id,
  });

  return { isLoading, isError, data, refetch };
};
