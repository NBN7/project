import { signOut } from "next-auth/react";

import { getUsernameAbbreviation } from "@/utils/getUsernameAbbreviation";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { Session } from "next-auth";

import { NAVBAR_ITEMS } from "@/constants/navbarItems";

import { MdLogout } from "react-icons/md";

interface AuthedClientProps {
  session: Session;
}

export const AuthedClient = ({ session }: AuthedClientProps) => {
  const userImage = session.user.image as string;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={userImage} alt={session.user.name as string} />
          <AvatarFallback>
            {getUsernameAbbreviation(session.user.name as string)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="cursor-default">
          My Account
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {NAVBAR_ITEMS.map((item) => (
          <Link key={item.label} href={item.href}>
            <DropdownMenuItem>
              <item.icon className="mr-2 size-4" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          </Link>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <MdLogout className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
