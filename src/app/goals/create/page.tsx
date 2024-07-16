"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { useCreateGoal } from "@/hooks/goals";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { transformToShortDate } from "@/utils/date";

import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

import { CalendarIcon } from "lucide-react";

const today = new Date();
const currentDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);

const defaultSelected = {
  from: currentDate,
  to: addDays(currentDate, 4),
};

const formatDateDisplay = (date: DateRange) => {
  if (!date) return "Date range";

  if (date.from && date.to) return `${transformToShortDate(date.from)} - ${transformToShortDate(date.to)}`;

  if (date.from && !date.to) return `${transformToShortDate(date.from)} - Select due date`;

  if (!date.from) return "Select start date";
};

export default function CreateGoalPage() {
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);

  const [date, setDate] = useState<DateRange | undefined>(defaultSelected);

  const { callCreateGoalMutation } = useCreateGoal({
    id: session?.user?.id as string,
    title,
    amount,
    startDate: date?.from || defaultSelected.from,
    dueDate: date?.to || defaultSelected.to,
  });

  const handleCreateGoal = async () => {
    await callCreateGoalMutation();

    setTitle("");
    setAmount(0);
    setDate(defaultSelected);
  };

  const isDisabled = () => {
    return (
      !title ||
      !title.trim().length ||
      amount <= 0 ||
      !amount ||
      !date ||
      !date.from ||
      !date.to
    );
  };

  return (
    <div className="w-full duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <Card>
        <CardHeader>
          <CardTitle>New goal</CardTitle>
          <CardDescription>
            Create a new goal by filling out the form below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2">
            <Input
              value={title}
              maxLength={32}
              className="sm:w-1/2 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Title"
              name="title"
              autoComplete="off"
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              value={!amount ? "" : amount}
              className="sm:w-1/2 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Amount"
              name="amount"
              type="number"
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="sm:w-1/2 pl-3 text-left font-normal"
                >
                  <span className="dark:text-greydark text-greylight">
                    {formatDateDisplay(date as DateRange)}
                  </span>
                  <CalendarIcon className="ml-auto size-4 dark:text-icondark text-iconlight" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  id="due-date-calendar"
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={currentDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            disabled={isDisabled()}
            className="w-full"
            onClick={handleCreateGoal}
          >
            Create goal
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
