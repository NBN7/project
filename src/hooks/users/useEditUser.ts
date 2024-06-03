import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "@/services/users/editUser";
import { toastCall } from "@/utils/toastCall";

interface UseEditUserParams {
  id: string;
  name?: string | null;
  description?: string | null;
  role: string | null;
  updateSession?: () => void;
}

export const useEditUser = ({
  id,
  name,
  role,
  description,
  updateSession,
}: UseEditUserParams) => {
  const queryClient = useQueryClient();

  const { mutate: callEditUserMutation } = useMutation({
    mutationFn: () =>
      editUser({
        id,
        name: name ? name : null,
        role: role ? role : null,
        description: description ? description : null,
      }),
    onSuccess: () => {
      updateSession && updateSession();
      toastCall("User edited successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toastCall(error.message);
    },
  });

  return { callEditUserMutation };
};
