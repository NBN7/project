import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUser } from "@/services/deleteUser";

interface UseDeleteUserProps {
  id: string;
}

export const useDeleteUser = ({ id }: UseDeleteUserProps) => {
  const queryClient = useQueryClient();

  const { mutate: useDeleteUserMutation } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      // console.log("success"); replace with toast
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      console.error("error");
    },
  });

  return { useDeleteUserMutation };
};
