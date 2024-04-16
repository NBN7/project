import { useMutation } from "@tanstack/react-query";

import { switchTheme } from "@/services/switchTheme";

interface UseSwitchThemeProps {
  id: string;
  updateSession: () => void;
}

export const useSwitchTheme = ({ id, updateSession }: UseSwitchThemeProps) => {
  const { mutate: useSwitchThemeMutation } = useMutation({
    mutationFn: () => switchTheme(id),
    onSuccess: () => {
      updateSession();
      // console.log("success"); replace with toast
    },
    onError: () => {
      console.error("error");
    },
  });

  return { useSwitchThemeMutation };
};
