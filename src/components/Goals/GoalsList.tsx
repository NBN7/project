"use client";

import { useEffect, lazy, Suspense } from "react";

import { useSession } from "next-auth/react";

import { useGetGoals } from "@/hooks/goals/useGetGoals";

const GoalCard = lazy(() => import("./GoalCard"));
import { GoalCardSkeleton } from "./GoalCardSkeleton";
import { GoalsEmpty } from "./GoalsEmpty";

import type { TGoal } from "@/types/goals";

const renderGoals = (goal: TGoal) => {
  return (
    <Suspense key={goal.id} fallback={<GoalCardSkeleton />}>
      <GoalCard goal={goal} />
    </Suspense>
  );
};

export const GoalsList = () => {
  const { data: session } = useSession();

  const { data: goals, refetch } = useGetGoals(session?.user.id as string);

  useEffect(() => {
    refetch();
  }, [session, refetch]);

  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {goals && goals?.length > 0 ? goals?.map(renderGoals) : <GoalsEmpty />}
    </div>
  );
};
