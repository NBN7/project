import type { TTab } from "@/types";

import { ROUTES } from "@/constants/routes";

import { GoGoal } from "react-icons/go";
import { FiPlus } from "react-icons/fi";

export const GOALS_TABS: TTab[] = [
  {
    title: "Goals",
    path: ROUTES.GOALS.ROOT,
    icon: GoGoal,
  },
  {
    title: "Create",
    path: ROUTES.GOALS.CREATE,
    icon: FiPlus,
  },
];
