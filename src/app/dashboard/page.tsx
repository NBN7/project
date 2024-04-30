"use client";

import { useSession } from "next-auth/react";

import { useGetUsers } from "@/hooks/users/useGetUsers";

import { Container } from "@/components/Container";
import { UsersTable } from "@/components/UsersTable";

import { getFirstName } from "@/utils/getFirsName";

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = getFirstName(session?.user.name || "");

  const { users } = useGetUsers();

  return (
    <Container sectionClassName="mt-2 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <div className="w-full">
        <div className="mb-4">
          <h1 className="font-semibold text-xl">Welcome back, {firstName}</h1>
          <p className="dark:text-greydark text-greylight">
            Track, manage and forecast your platform
          </p>
        </div>

        <UsersTable users={users} />
      </div>
    </Container>
  );
}
