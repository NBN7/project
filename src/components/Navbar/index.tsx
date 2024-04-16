"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { GoBackButton } from "../CustomButtons/GoBackButton";
import { SwitchThemeButton } from "@/components/CustomButtons/SwitchThemeButton";
import { DashboardButton } from "@/components/CustomButtons/DashboardButton";
import { AuthedClient } from "@/components/Navbar/AuthedClient";
import { DefaultClient } from "@/components/Navbar/DefaultClient";

import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";

export const NavbarComponent = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <Navbar className="dark:bg-darkmode bg-lightmode">
      {pathname !== "/" && <GoBackButton />}

      <NavbarContent className="flex gap-2" justify="end">
        <NavbarItem>
          <SwitchThemeButton />
        </NavbarItem>

        {session?.user.role === "ADMIN" && (
          <NavbarItem>
            <DashboardButton />
          </NavbarItem>
        )}

        <NavbarItem>
          {session ? <AuthedClient session={session} /> : <DefaultClient />}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
