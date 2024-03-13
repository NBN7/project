import { useMutation } from "@tanstack/react-query";

import { switchTheme } from "@/services/switchTheme";

interface UseSwitchThemeProps {
  id: string;
  updateSession: () => void;
}

export const useSwitchTheme = ({ id, updateSession }: UseSwitchThemeProps) => {
  const { mutate: useSwitchThemeMutation } = useMutation({
    mutationFn: () => switchTheme(id as string),
    onSuccess: () => {
      updateSession();
      console.log("success");
    },
    onError: () => {
      console.error("error");
    },
  });

  return { useSwitchThemeMutation };
};