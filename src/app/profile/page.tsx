"use client";

import { useSession } from "next-auth/react";

import { getUsernameAbbreviation } from "@/utils/getUsernameAbbreviation";

import { Container } from "@/components/Container";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { data: session } = useSession();

  const userImage = session?.user.image as string;

  return (
    <Container sectionClassName="mt-20">
      {/* <div className="dark:bg-white bg-black absolute w-[1000px] h-52 top-0"></div> */}
      <div className="w-full">
        <Avatar className="size-28 border-2 border-black">
          <AvatarImage src={userImage} alt={session?.user.name as string} />
          <AvatarFallback>
            {getUsernameAbbreviation(session?.user.name ?? "")}
          </AvatarFallback>
        </Avatar>

        <h2 className="mt-6 font-semibold text-xl">{session?.user.name}</h2>
        <p className="dark:text-greydark text-greylight md:w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit, qui autem.
        </p>

        <div className="mt-10">
          <p className="font-semibold">Recent Activity</p>
        </div>
      </div>
    </Container>
  );
}
