import { transformDate } from "@/utils/transformDate";

import { DeleteTransactionDialog } from "./DeleteTransactionDialog";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";

import type { Transaction } from "@/types/transaction";

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-neutral-800 rounded transition-all duration-150">
          <div className="overflow-hidden">
            <p className="max-w-[200px] sm:max-w-none truncate text-start">
              {transaction.description}
            </p>
            <p className="text-sm dark:text-greydark text-greylight">
              {transformDate(transaction.date)}
            </p>
          </div>

          <p className="font-semibold">
            {transaction.type === "expense" && "-"}{" "}
            {transaction.amount.toFixed(2)}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent
        className="w-11/12 sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DeleteTransactionDialog id={transaction.id} />
      </DialogContent>
    </Dialog>
  );
};