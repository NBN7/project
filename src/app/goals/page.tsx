import { GoalsList } from "@/components/Goals/GoalsList";
import { Separator } from "@/components/ui/separator";

export default function GoalsPage() {
  return (
    <section className="w-full duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <GoalsList goalType="uncompleted" />

      <Separator className="my-10" />

      <GoalsList goalType="completed" />
    </section>
  );
}
