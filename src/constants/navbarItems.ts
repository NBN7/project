import { AiOutlineUser } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

export const NAVBAR_ITEMS = [
  {
    label: "[App]",
    icon: BsCurrencyDollar,
    href: "/application",
  },
  {
    label: "Create",
    icon: FiPlus,
    href: "/create",
  },
  {
    label: "Profile",
    icon: AiOutlineUser,
    href: "/profile",
  },
];
