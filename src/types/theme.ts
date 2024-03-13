import { THEME } from "@/constants/theme";

export type TTheme = (typeof THEME)[keyof typeof THEME];
