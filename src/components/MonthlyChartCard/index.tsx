import { MonthlyChart } from "./MonthlyChart";
import { Card, CardHeader, CardContent } from "../ui/card";

interface MonthlyChartProps {
  id: string;
}

interface MonthlyChartProps {}

export const MonthlyChartCard = ({ id }: MonthlyChartProps) => {
  return (
    <Card className="mt-10 space-y-6">
      <CardHeader>
        <p className="font-semibold">My activity</p>
      </CardHeader>

      <CardContent className="w-full sm:px-6 sm:pb-6 p-0">
        <MonthlyChart id={id} />
      </CardContent>
    </Card>
  );
};
