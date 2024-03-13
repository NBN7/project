"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { LinkUI } from "./LinkUI";
import { SwitchThemeButton } from "./SwitchThemeButton";

import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { CircularProgress } from "@nextui-org/progress";

export const NavbarComponent = () => {
  const { data: session, status } = useSession();

  return (
    <Navbar className="dark:bg-darkmode bg-lightmode">
      <NavbarContent className="flex gap-4" justify="end">
        <NavbarItem>
          {status === "loading" ? (
            <CircularProgress
              color="default"
              size="sm"
              aria-label="Loading.."
            />
          ) : (
            <div className="flex items-center gap-2">
              <SwitchThemeButton />
              {session ? (
                <Dropdown>
                  <DropdownTrigger
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <Avatar
                      className="cursor-pointer"
                      size="sm"
                      src={session.user!.image!}
                    />
                  </DropdownTrigger>

                  <DropdownMenu variant="light" aria-label="Static Actions">
                    <DropdownItem onClick={() => signOut()}>
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <LinkUI href="/auth">Sign In</LinkUI>
              )}
            </div>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
