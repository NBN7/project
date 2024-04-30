import { Card } from "../ui/card";
import { CircleProgress } from "../CircleProgress";

import { transformDate } from "@/utils/date/transformDate";

import type { TGoal } from "@/types/goals";

interface GoalCardProps {
  goal: TGoal;
}

const getPercentage = (savedAmount: number, amount: number) => {
  return (savedAmount / amount) * 100;
};

export const GoalCard = ({ goal }: GoalCardProps) => {
  const percentage = getPercentage(goal.savedAmount, goal.amount);

  const date = transformDate(goal.dueDate);

  return (
    <Card className="px-4 py-2 flex justify-between overflow-hidden">
      <div className="flex flex-col justify-center overflow-hidden">
        <p>
          <span className="font-semibold text-xl">{goal.savedAmount} </span>
          <span className="text-greylight dark:text-greydark text-sm">
            / {goal.amount}
          </span>
        </p>

        <p className="truncate text-sm">{goal.title}</p>
        <p className="dark:text-greydark text-greylight text-sm mt-2">{date}</p>
      </div>

      <CircleProgress value={percentage} />
    </Card>
  );
};
