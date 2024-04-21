import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUser } from "@/services/deleteUser";

import { toast } from "sonner";

interface UseDeleteUserParams {
  id: string;
}

export const useDeleteUser = ({ id }: UseDeleteUserParams) => {
  const queryClient = useQueryClient();

  const { mutate: useDeleteUserMutation } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      toast("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast("Error deleting user");
    },
  });

  return { useDeleteUserMutation };
};
