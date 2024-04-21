import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editUser } from "@/services/editUser";

import { getCurrentDate } from "@/utils/getCurrentDate";

import { toast } from "sonner";

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

  const today = getCurrentDate();

  const { mutate: useEditUserMutation } = useMutation({
    mutationFn: () => editUser({ id, name, role }),
    onSuccess: () => {
      updateSession();

      toast("User edited successfully", {
        description: today,
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast("Error editing user");
    },
  });

  return { useEditUserMutation };
};
