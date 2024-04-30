"use client";

import { useEffect } from "react";

import { useSession } from "next-auth/react";

import { useGetGoals } from "@/hooks/goals/useGetGoals";

import { GoalCard } from "./GoalCard";
import { GoalsEmpty } from "./GoalsEmpty";

import type { TGoal } from "@/types/goals";

const renderGoals = (goal: TGoal) => {
  return <GoalCard key={goal.id} goal={goal} />;
};

export const GoalsList = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: goals, refetch } = useGetGoals(userId as string);

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {goals && goals?.length > 0 ? goals?.map(renderGoals) : <GoalsEmpty />}
    </div>
  );
};
