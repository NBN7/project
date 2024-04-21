import { getCurrentDate } from "@/utils/getCurrentDate";
import { toast } from "sonner";

export const toastCall = (message: string) => {
  const today = getCurrentDate();

  toast(message, {
    description: today,
  });
};
