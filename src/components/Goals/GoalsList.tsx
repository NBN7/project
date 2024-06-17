"use client";

import { useRef, useEffect, lazy, Suspense } from "react";
import { useSession } from "next-auth/react";

import autoAnimate from "@formkit/auto-animate";

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
  const parent = useRef(null);

  const { data: session } = useSession();
  const { data: goals } = useGetGoals(session?.user.id as string);

  const uncompletedGoals = goals?.filter((goal) => !goal.completed) || [];
  const completedGoals = goals?.filter((goal) => goal.completed) || [];

  const selectedGoals =
    goalType === "uncompleted" ? uncompletedGoals : completedGoals;

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <>
      <h3 className="text-2xl font-semibold mb-2 capitalize">{goalType}</h3>

      <div ref={parent} className="grid sm:grid-cols-2 gap-2">
        {!selectedGoals.length ? (
          <GoalsEmpty goalType={goalType} />
        ) : (
          selectedGoals.map(renderGoal)
        )}
      </div>
    </>
  );
};
