import { signOut } from "next-auth/react";

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

import { MdLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";

interface AuthedClientProps {
  session: Session;
}

const getUsernameAbbreviation = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

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

        <DropdownMenuItem>
          <AiOutlineUser className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BsCurrencyDollar className="mr-2 h-4 w-4" />
          <span>[App]</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <MdLogout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
