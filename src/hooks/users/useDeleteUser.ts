import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/users/deleteUser";
import { toastCall } from "@/utils/toastCall";

interface UseDeleteUserParams {
  id: string;
}

export const useDeleteUser = ({ id }: UseDeleteUserParams) => {
  const queryClient = useQueryClient();

  const { mutate: callDeleteUserMutation } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      toastCall("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toastCall(error.message);
    },
  });

  return { callDeleteUserMutation };
};
