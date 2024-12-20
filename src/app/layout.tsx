import type { Metadata } from "next";
import "./globals.css";

import "@fontsource/onest";

export const metadata: Metadata = {
  title: "Savings App",
  description:
    "Take control of your finances. Our app helps you manage your money smartly, easily, and quickly. Start saving and reach your financial goals today.",
};

import { Providers } from "./Providers";
import { NavbarComponent } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-[100dvh] dark:bg-darkmode dark:text-darkmode bg-lightmode text-lightmode">
        <Providers>
          <NavbarComponent />
          {children}
        </Providers>
      </body>
    </html>
  );
}
