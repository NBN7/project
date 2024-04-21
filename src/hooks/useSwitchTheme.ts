import { useMutation } from "@tanstack/react-query";

import { switchTheme } from "@/services/switchTheme";

import { toastCall } from "@/utils/toastCall";

interface UseSwitchThemeProps {
  id: string;
  updateSession: () => void;
}

export const useSwitchTheme = ({ id, updateSession }: UseSwitchThemeProps) => {
  const { mutate: useSwitchThemeMutation } = useMutation({
    mutationFn: () => switchTheme(id),
    onSuccess: () => {
      updateSession();

      toastCall("Theme switched successfully");
    },
    onError: () => {
      toastCall("Error switching theme");
    },
  });

  return { useSwitchThemeMutation };
};
