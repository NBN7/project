"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import {
  GoBackButton,
  SwitchThemeButton,
  DashboardButton,
} from "@/components/CustomButtons";
import { AuthedClient } from "@/components/Navbar/AuthedClient";
import { DefaultClient } from "@/components/Navbar/DefaultClient";

import { Role } from "@prisma/client";

export const NavbarComponent = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="dark:bg-darkmode bg-lightmode w-full h-16 pr-6 flex items-center justify-center sticky z-50 top-0">
      <div className="w-full lg:w-[1000px] h-full flex items-center">
        {pathname !== "/" && <GoBackButton />}

        <div className="w-full flex items-center justify-end">
          <SwitchThemeButton />

          {session?.user.role === Role.ADMIN && <DashboardButton />}

          {session ? <AuthedClient session={session} /> : <DefaultClient />}
        </div>
      </div>
    </nav>
  );
};
