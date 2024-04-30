import { Card } from "../ui/card";

export const GoalsEmpty = () => {
  return (
    <Card className="cursor-default flex items-center justify-center h-[118px]">
      <p className="text-center dark:text-greydark text-greylight">
        No goals yet
      </p>
    </Card>
  );
};
