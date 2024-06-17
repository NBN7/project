import type { TTab } from "@/types";

import { ROUTES } from "@/constants/routes";

import { BsCurrencyDollar } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

export const TRANSACTION_TABS: TTab[] = [
  {
    title: "Transactions",
    path: ROUTES.TRANSACTIONS.ROOT,
    icon: BsCurrencyDollar,
  },
  {
    title: "Create",
    path: ROUTES.TRANSACTIONS.CREATE,
    icon: FiPlus,
  },
];
