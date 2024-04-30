"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";

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

import { CalendarIcon } from "lucide-react";

import type { TransactionType } from "@/types/transaction";
const TRANSACTION_TYPES: TransactionType[] = ["income", "expense"];

export default function CreateTransactionPage() {
  const { data: session } = useSession();

  const [description, setDescription] = useState("");
  const [type, setType] = useState<TransactionType>("income");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { callCreateTransactionMutation, isPending } = useCreateTransaction({
    id: session?.user?.id as string,
    description,
    type: type,
    amount,
    date: date || new Date(),
  });

  const handleCreateTransaction = async () => {
    await callCreateTransactionMutation();

    setDescription("");
    setAmount(0);
    setDate(new Date());
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
                      {transaction}
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
                  onSelect={setDate}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            disabled={
              !description.length ||
              !type ||
              amount <= 0 ||
              !amount ||
              !date ||
              isPending
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