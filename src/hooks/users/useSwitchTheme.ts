import { useMutation } from "@tanstack/react-query";

import { switchTheme } from "@/services/users/switchTheme";

import { toastCall } from "@/utils/toastCall";

interface UseSwitchThemeProps {
  id: string;
  updateSession: () => void;
}

export const useSwitchTheme = ({ id, updateSession }: UseSwitchThemeProps) => {
  const { mutate: callSwitchThemeMutation } = useMutation({
    mutationFn: () => switchTheme(id),
    onSuccess: () => {
      updateSession();

      toastCall("Theme switched successfully");
    },
    onError: () => {
      toastCall("Error switching theme");
    },
  });

  return { callSwitchThemeMutation };
};
