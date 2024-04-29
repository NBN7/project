"use client";

import { useSession } from "next-auth/react";

import { useGetUser } from "@/hooks/useGetUser";

import { Container } from "@/components/Container";
import { TransactionsList } from "@/components/Transactions";

import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationPage() {
  const { data: session } = useSession();

  const { data: user, isLoading: isUserLoading } = useGetUser(
    session?.user?.id as string
  );

  return (
    <Container
      sectionClassName="mt-10 duration-500 animate-in fade-in-5 slide-in-from-bottom-2"
      contentClassName="gap-1"
    >
      <h3 className="dark:text-greydark text-greylight text-base">Balance</h3>
      {isUserLoading ? (
        <Skeleton className="flex rounded-full w-[100px] h-[40px]" />
      ) : (
        <p className="text-4xl font-semibold">${user?.balance?.toFixed(2)}</p>
      )}

      <TransactionsList />
    </Container>
  );
}
