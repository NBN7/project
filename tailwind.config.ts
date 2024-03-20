import { nextui } from "@nextui-org/react";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      textColor: {
        darkmode: "#ECEDEE",
        lightmode: "#11181C",
        icondark: "#A1A1AA",
        iconlight: "#52525B",
        greydark: "#A1A1AA",
        greylight: "#71717A",
      },
      backgroundColor: {
        darkmode: "#141518",
        lightmode: "#FFFFFF",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
