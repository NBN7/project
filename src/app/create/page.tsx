"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { useCreateTransaction } from "@/hooks/useCreateTransaction";

import { Container } from "@/components/Container";

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

const TRANSACTION_TYPES = ["Income", "Expense"];

import type { TransactionType } from "@/types/transaction";

export default function CreatePage() {
  const { data: session } = useSession();

  const [description, setDescription] = useState("");
  const [type, setType] = useState<TransactionType>("income");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { callCreateTransactionMutation } = useCreateTransaction({
    id: session?.user?.id as string,
    description,
    type: type,
    amount,
    date: date || new Date(),
  });

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setAmount(newValue);
  };

  const handleCreateTransaction = () => {
    callCreateTransactionMutation();
  };

  return (
    <Container sectionClassName="mt-10">
      <Card className="sm:w-1/2 w-full">
        <CardHeader>
          <CardTitle>New transaction</CardTitle>
          <CardDescription>
            Create a new transaction by filling out the form below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2">
            <Input
              maxLength={32}
              className="focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Description"
              name="description"
              autoComplete="off"
              onChange={handleDescriptionChange}
            />

            <Select
              onValueChange={(type) =>
                setType(type.toLocaleLowerCase() as TransactionType)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {TRANSACTION_TYPES.map((transaction, index) => (
                    <SelectItem key={index} value={transaction}>
                      {transaction}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input
              className="focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Amount"
              name="amount"
              type="number"
              onChange={handleAmountChange}
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
              description.length === 0 || amount <= 0 || !amount || !date
            }
            className="w-full"
            onClick={handleCreateTransaction}
          >
            Create transaction
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}