import { RiHome2Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoGoal } from "react-icons/go";

import type { TNavbarItem } from "@/types/navbarItems";
import { ROUTES } from "@/constants/routes";

export const NAVBAR_ITEMS: TNavbarItem[] = [
  {
    label: "Home",
    icon: RiHome2Line,
    href: ROUTES.HOME,
  },
  {
    label: "Transactions",
    icon: BsCurrencyDollar,
    href: ROUTES.TRANSACTIONS.ROOT,
  },
  {
    label: "Goals",
    icon: GoGoal,
    href: ROUTES.GOALS.ROOT,
  },
  {
    label: "Profile",
    icon: AiOutlineUser,
    href: ROUTES.PROFILE,
  },
];
