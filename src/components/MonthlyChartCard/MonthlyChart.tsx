import { useGetMonthlySummary } from "@/hooks/transactions/useGetMonthlySummary";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

import { CustomTooltip } from "./CustomTooltip";

interface MonthlyChartProps {
  id: string;
}

export const MonthlyChart = ({ id }: MonthlyChartProps) => {
  const { data } = useGetMonthlySummary(id);

  const isDataEmpty = data
    ?.map((item) => !item.expense && !item.income)
    .every(Boolean);

  return (
    <>
      {!isDataEmpty ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            <Bar dataKey="income" fill="#2563eb" />
            <Bar dataKey="expense" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-greylight dark:text-greydark mb-10">
          No transactions yet
        </p>
      )}
    </>
  );
};
