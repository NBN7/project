"use client";

import { useEffect, lazy, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useGetGoals } from "@/hooks/goals/useGetGoals";

const GoalCard = lazy(() => import("./GoalCard"));
import { GoalCardSkeleton } from "./GoalCardSkeleton";
import { GoalsEmpty } from "./GoalsEmpty";

import type { TGoal } from "@/types/goals";

const renderGoal = (goal: TGoal) => {
  return (
    <Suspense key={goal.id} fallback={<GoalCardSkeleton />}>
      <GoalCard goal={goal} />
    </Suspense>
  );
};

interface GoalsListProps {
  goalType: "uncompleted" | "completed";
}

export const GoalsList = ({ goalType }: GoalsListProps) => {
  const { data: session } = useSession();
  const { data: goals, refetch } = useGetGoals(session?.user.id as string);

  const uncompletedGoals = goals?.filter((goal) => !goal.completed) || [];
  const completedGoals = goals?.filter((goal) => goal.completed) || [];

  const selectedGoals =
    goalType === "uncompleted" ? uncompletedGoals : completedGoals;

  // useEffect(() => {
  //   refetch();
  // }, [session, refetch]);

  return (
    <>
      <h3 className="text-2xl font-semibold mb-2 capitalize">{goalType}</h3>

      <div className="grid sm:grid-cols-2 gap-2">
        {selectedGoals && selectedGoals.length > 0 ? (
          selectedGoals.map(renderGoal)
        ) : (
          <GoalsEmpty goalType={goalType} />
        )}
      </div>
    </>
  );
};
