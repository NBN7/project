"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";

import { useGetGoals } from "@/hooks/goals";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { ROUTES } from "@/constants/routes";

import { TransactionType } from "@prisma/client";

import { CalendarIcon } from "lucide-react";

const TRANSACTION_TYPES: TransactionType[] = [
  TransactionType.income,
  TransactionType.expense,
];

export default function CreateTransactionPage() {
  const { data: session } = useSession();
  const { data: goals } = useGetGoals(session?.user?.id as string);

  const [description, setDescription] = useState("");
  const [type, setType] = useState<TransactionType>(TransactionType.income);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isForGoal, setIsForGoal] = useState(false);
  const [goalId, setGoalId] = useState<string | undefined>(undefined);

  const { callCreateTransactionMutation, isPending } = useCreateTransaction({
    id: session?.user?.id as string,
    description,
    type,
    amount,
    date: date || new Date(),
    isForGoal,
    goalId,
  });

  const handleCreateTransaction = async () => {
    await callCreateTransactionMutation();

    setDescription("");
    setAmount(0);
    setDate(new Date());
    setIsForGoal(false);
    setGoalId(undefined);
  };

  const handleSetDate = (date: Date) => {
    setIsForGoal(false);
    setGoalId(undefined);
    setDate(date);
  };

  const handleSwitchSetIsForGoal = (checked: boolean) => {
    setIsForGoal(checked);

    if (!checked) setGoalId(undefined);
  };

  return (
    <div className="w-full duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <Card>
        <CardHeader>
          <CardTitle>New transaction</CardTitle>
          <CardDescription>
            Create a new transaction by filling out the form below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2">
            <Input
              value={description}
              maxLength={32}
              className="sm:w-1/2 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Description"
              name="description"
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
            />

            <Select
              onValueChange={(type) =>
                setType(type.toLocaleLowerCase() as TransactionType)
              }
            >
              <SelectTrigger className="w-[180px] focus:ring-transparent">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {TRANSACTION_TYPES.map((transaction, index) => (
                    <SelectItem
                      className="capitalize"
                      key={index}
                      value={transaction}
                    >
                      <span className="capitalize">{transaction}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

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
                  className="w-[180px] pl-3 text-left font-normal"
                >
                  <span>{date?.toLocaleDateString()}</span>
                  <CalendarIcon className="ml-auto size-4 dark:text-icondark text-iconlight" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => handleSetDate(date as Date)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {type === TransactionType.income && (
              <div className="flex items-center space-x-2 mt-2 mb-2 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
                <Checkbox
                  id="choose"
                  checked={isForGoal}
                  onCheckedChange={(checked: boolean) =>
                    handleSwitchSetIsForGoal(checked)
                  }
                />
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="choose"
                >
                  For goals
                </label>
              </div>
            )}

            {isForGoal && (
              <>
                {goals?.length ? (
                  <div className="duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
                    <Select onValueChange={(goal) => setGoalId(goal)}>
                      <SelectTrigger className="w-[180px] focus:ring-transparent">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {goals?.map((goal, index) => (
                            <SelectItem
                              key={index}
                              value={goal.id}
                              disabled={
                                goal.completed ||
                                date!.toISOString() < goal.startDate ||
                                date!.toISOString() > goal.dueDate
                              }
                            >
                              {goal.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <p className="dark:text-greydark text-greylight">
                    You must create a{" "}
                    <Link
                      href={ROUTES.GOALS.ROOT}
                      className="dark:text-darkmode text-lightmode hover:underline"
                    >
                      goal
                    </Link>{" "}
                    first.
                  </p>
                )}
              </>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            disabled={
              !description ||
              !type ||
              amount <= 0 ||
              !amount ||
              !date ||
              isPending ||
              (isForGoal && !goalId)
            }
            className="w-full"
            onClick={handleCreateTransaction}
          >
            Create transaction
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
