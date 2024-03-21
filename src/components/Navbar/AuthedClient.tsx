import { signOut } from "next-auth/react";

import { LinkUI } from "@/components/LinkUI";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";

import type { Session } from "next-auth";

interface AuthedClientProps {
  session: Session;
}

export const AuthedClient = ({ session }: AuthedClientProps) => {
  return (
    <Dropdown>
      <DropdownTrigger role="button" aria-haspopup="true" aria-expanded="false">
        <Avatar
          className="cursor-pointer"
          size="sm"
          src={session.user!.image!}
        />
      </DropdownTrigger>

      <DropdownMenu variant="light" aria-label="Static Actions">
        <DropdownItem textValue="Custom">
          <LinkUI href="/">[App]</LinkUI>
        </DropdownItem>

        <DropdownItem
          textValue="Sign Out"
          color="danger"
          onClick={() => signOut()}
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
