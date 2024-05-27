import { transformDate } from "@/utils/date/transformDate";

import { DeleteTransactionDialog } from "./DeleteTransactionDialog";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import type { Transaction } from "@/types/transaction";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TransactionCardProps {
  transaction: Transaction;
}

const circle = (
  <div
    aria-hidden="true"
    className="bg-[#0070F0] animate-pulse size-[6px] rounded-full"
  ></div>
);

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog>
          <DialogTrigger className="w-full text-start">
            <TooltipTrigger asChild>
              <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-[#F5F5F5] dark:hover:bg-neutral-800 rounded transition-all duration-150">
                <div className="overflow-hidden">
                  <p className="max-w-[200px] sm:max-w-none truncate">
                    {transaction.description}
                  </p>
                  <p className="text-sm dark:text-greydark text-greylight">
                    {transformDate(transaction.date)}
                  </p>
                </div>

                <div className="flex items-center">
                  {transaction.isForGoal ? circle : ""}

                  <p className="ml-2 font-semibold">
                    {transaction.type === "expense" && "-"}{" "}
                    {transaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </TooltipTrigger>
          </DialogTrigger>

          <TooltipContent
            className={`${transaction.isForGoal ? "" : "hidden"}`}
          >
            <p>This transaction is for goals</p>
          </TooltipContent>

          <DialogContent
            className="w-11/12 sm:max-w-md"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DeleteTransactionDialog id={transaction.id} />
          </DialogContent>
        </Dialog>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TransactionCard;
