import { CircleProgress } from "../CircleProgress";
import { DeleteGoalDialog } from "./DeleteGoalDialog";

import { Card } from "../ui/card";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";

import { transformDate } from "@/utils/date/transformDate";

import type { TGoal } from "@/types/goals";

interface GoalCardProps {
  goal: TGoal;
}

const getPercentage = (savedAmount: number, amount: number) => {
  return (savedAmount / amount) * 100;
};

const GoalCard = ({ goal }: GoalCardProps) => {
  const percentage = getPercentage(goal.savedAmount, goal.amount);

  const date = transformDate(goal.dueDate);

  return (
    <Dialog>
      <DialogTrigger className="w-full text-start">
        <Card className="p-2 cursor-pointer flex justify-between overflow-hidden">
          <div className="p-2 w-full flex justify-between hover:bg-[#F5F5F5] dark:hover:bg-neutral-800 rounded transition-all duration-150">
            <div className="flex flex-col justify-center overflow-hidden">
              <p>
                <span className="font-semibold text-xl">
                  {goal.savedAmount}{" "}
                </span>
                <span className="text-greylight dark:text-greydark text-sm">
                  / {goal.amount}
                </span>
              </p>

              <p className="truncate text-sm">{goal.title}</p>
              <p className="dark:text-greydark text-greylight text-sm mt-2">
                {date}
              </p>
            </div>

            <CircleProgress value={percentage} outerCircle="cursor-pointer" />
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent
        className="w-11/12 sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DeleteGoalDialog id={goal.id} />
      </DialogContent>
    </Dialog>
  );
};

export default GoalCard;
