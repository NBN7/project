import { useMutation } from "@tanstack/react-query";

import { switchTheme } from "@/services/switchTheme";

import { getCurrentDate } from "@/utils/getCurrentDate";

import { toast } from "sonner";

interface UseSwitchThemeProps {
  id: string;
  updateSession: () => void;
}

export const useSwitchTheme = ({ id, updateSession }: UseSwitchThemeProps) => {
  const today = getCurrentDate();

  const { mutate: useSwitchThemeMutation } = useMutation({
    mutationFn: () => switchTheme(id),
    onSuccess: () => {
      updateSession();

      toast("Theme switched successfully", {
        description: today,
      });
    },
    onError: () => {
      console.error("error");
    },
  });

  return { useSwitchThemeMutation };
};
