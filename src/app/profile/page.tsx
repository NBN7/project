"use client";

import { useSession } from "next-auth/react";

import { useGetUser } from "@/hooks/users/useGetUser";

import { getUsernameAbbreviation } from "@/utils/user/getUsernameAbbreviation";

import { Container } from "@/components/Container";
import { MonthlyChartCard } from "@/components/MonthlyChartCard";
import { EditProfileDialog } from "@/components/Profile/EditProfileDialog";
import { DownloadTransactionsButton } from "@/components/CustomButtons/DownloadTransactionsButton";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function ProfilePage() {
  const { data: session } = useSession();

  const { data: user } = useGetUser(session?.user.id as string);

  return (
    <Container sectionClassName="mt-20 mb-10 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <Dialog>
        <div className="w-full">
          <div className="w-full flex items-center justify-between">
            <Avatar className="size-28 border-2 dark:border-black">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback>
                {getUsernameAbbreviation(user?.name ?? "")}
              </AvatarFallback>
            </Avatar>

            <DialogTrigger asChild className="self-end">
              <Button variant="outline">Edit profile</Button>
            </DialogTrigger>
          </div>

          <h2 className="mt-6 font-semibold text-xl">{user?.name}</h2>
          <p className="dark:text-greydark text-greylight md:w-[70%]">
            {user?.description}
          </p>

          <MonthlyChartCard id={session?.user.id as string} />

          <DownloadTransactionsButton className="mt-5" />
        </div>

        <EditProfileDialog
          id={session?.user.id as string}
          name={user?.name as string}
          description={user?.description as string}
          role={session?.user.role as string}
        />
      </Dialog>
    </Container>
  );
}
