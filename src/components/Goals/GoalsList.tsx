"use client";

import { useSession } from "next-auth/react";

import { useGetGoals } from "@/hooks/goals/useGetGoals";

import { GoalCard } from "./GoalCard";
import { GoalsEmpty } from "./GoalsEmpty";

import type { TGoal } from "@/types/goals";

const renderGoals = (goals: TGoal) => {
  return <GoalCard key={goals.id} goal={goals} />;
};

export const GoalsList = () => {
  const { data: session } = useSession();

  const { data } = useGetGoals(session?.user.id as string);

  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {data && data?.length > 0 ? data?.map(renderGoals) : <GoalsEmpty />}
    </div>
  );
};
