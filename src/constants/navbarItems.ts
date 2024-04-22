import { AiOutlineUser } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

export const NAVBAR_ITEMS = [
  {
    label: "Create",
    icon: FiPlus,
    href: "/create",
  },
  {
    label: "[App]",
    icon: BsCurrencyDollar,
    href: "/application",
  },
  {
    label: "Profile",
    icon: AiOutlineUser,
    href: "/profile",
  },
];
