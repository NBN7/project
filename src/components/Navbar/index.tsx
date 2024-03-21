"use client";

import { useSession } from "next-auth/react";

import { SwitchThemeButton } from "@/components/SwitchThemeButton";
import { AuthedClient } from "@/components/Navbar/AuthedClient";
import { DefaultClient } from "@/components/Navbar/DefaultClient";

import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";

export const NavbarComponent = () => {
  const { data: session } = useSession();

  return (
    <Navbar className="dark:bg-darkmode bg-lightmode">
      <NavbarContent className="flex gap-4" justify="end">
        <NavbarItem>
          <SwitchThemeButton />
        </NavbarItem>

        <NavbarItem>
          {session ? <AuthedClient session={session} /> : <DefaultClient />}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
