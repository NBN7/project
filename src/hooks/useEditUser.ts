import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editUser } from "@/services/editUser";

import { toastCall } from "@/utils/toastCall";

interface UseEditUserParams {
  id: string;
  name: string | null;
  role: string | null;
  updateSession: () => void;
}

export const useEditUser = ({
  id,
  name,
  role,
  updateSession,
}: UseEditUserParams) => {
  const queryClient = useQueryClient();

  const { mutate: useEditUserMutation } = useMutation({
    mutationFn: () => editUser({ id, name, role }),
    onSuccess: () => {
      updateSession();

      toastCall("User edited successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toastCall("Error editing user");
    },
  });

  return { useEditUserMutation };
};
