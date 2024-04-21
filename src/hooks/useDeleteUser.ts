import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUser } from "@/services/deleteUser";

import { toastCall } from "@/utils/toastCall";

interface UseDeleteUserParams {
  id: string;
}

export const useDeleteUser = ({ id }: UseDeleteUserParams) => {
  const queryClient = useQueryClient();

  const { mutate: useDeleteUserMutation } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      toastCall("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toastCall("Error deleting user");
    },
  });

  return { useDeleteUserMutation };
};
