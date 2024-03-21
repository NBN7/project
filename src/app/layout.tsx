import type { Metadata } from "next";
import "./globals.css";

import "@fontsource/onest";

export const metadata: Metadata = {
  title: "App",
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
      <body className="min-h-screen dark:bg-darkmode dark:text-darkmode bg-lightmode text-lightmode">
        <Providers>
          <NavbarComponent />
          {children}
        </Providers>
      </body>
    </html>
  );
}
