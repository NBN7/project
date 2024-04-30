import { useQuery } from "@tanstack/react-query";

import { getTransactions } from "@/services/transactions/getTransactions";

export const useGetTransactions = (id: string) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["transactions", id],
    queryFn: () => getTransactions(id),
    enabled: !!id,
  });

  return { isLoading, isError, data, refetch };
};
