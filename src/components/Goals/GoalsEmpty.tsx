import { Card } from "../ui/card";

interface GoalsEmptyProps {
  goalType?: "uncompleted" | "completed";
}

export const GoalsEmpty = ({ goalType }: GoalsEmptyProps) => {
  return (
    <Card className="cursor-default flex items-center justify-center h-[134px]">
      <p className="text-center dark:text-greydark text-greylight">
        No {goalType} goals yet
      </p>
    </Card>
  );
};
