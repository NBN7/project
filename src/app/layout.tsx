import type { Metadata } from "next";
import "./globals.css";

import "@fontsource/onest";

export const metadata: Metadata = {
  title: "Notes",
  description: "Default description",
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
      <body className="min-h-screen dark:bg-darkmode dark:text-darkmode bg-lightmode text-ligthmode">
        <Providers>
          <NavbarComponent />
          {children}
        </Providers>
      </body>
    </html>
  );
}
