"use client";

import { useSession } from "next-auth/react";

import { useGetGoals } from "@/hooks/useGetGoals";

export const GoalsList = () => {
  const { data: session } = useSession();

  const { data } = useGetGoals(session?.user.id as string);
  return (
    <ul>
      {data?.map((goal) => (
        <li key={goal.id}>{goal.title}</li>
      ))}
    </ul>
  );
};
