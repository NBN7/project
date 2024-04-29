import { Card } from "./ui/card";

interface PillProps {
  title: string;
  icon: React.ReactNode;
}

export const Pill = ({ title, icon }: PillProps) => {
  return (
    <Card className="py-1 px-3 rounded-full flex items-center gap-2 cursor-pointer">
      {icon}
      <span className="text-sm">{title}</span>
    </Card>
  );
};
