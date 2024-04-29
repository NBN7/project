import { RiHome2Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

import type { TNavbarItem } from "@/types/navbarItems";
import { ROUTES } from "@/constants/routes";

export const NAVBAR_ITEMS: TNavbarItem[] = [
  {
    label: "Home",
    icon: RiHome2Line,
    href: ROUTES.HOME,
  },
  {
    label: "[App]",
    icon: BsCurrencyDollar,
    href: ROUTES.TRANSACTIONS.ROOT,
  },
  {
    label: "Create",
    icon: FiPlus,
    href: ROUTES.TRANSACTIONS.CREATE,
  },
  {
    label: "Profile",
    icon: AiOutlineUser,
    href: ROUTES.PROFILE,
  },
];
