"use client";

import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DeleteDialog {
  id: string;
}

export const DeleteTransactionDialog = ({ id }: DeleteDialog) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);

  const { data: session } = useSession();

  const { callDeleteTransactionMutation } = useDeleteTransaction({
    userId: session?.user?.id as string,
    transactionId: id,
  });

  const handleDeleteClick = () => {
    callDeleteTransactionMutation();
  };

  useEffect(() => {
    if (value.toLowerCase() !== "delete") {
      setIsError(true);
      return;
    }

    setIsError(false);
  }, [value]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete this
          transaction and remove the data from our servers.
        </DialogDescription>
      </DialogHeader>

      <Input
        autoComplete="off"
        className="focus-visible:ring-offset-0 focus-visible:ring-0"
        placeholder={`Type "delete" to confirm`}
        onChange={(e) => setValue(e.target.value)}
        name="confirm"
      />

      <DialogFooter>
        <DialogClose asChild>
          <Button
            disabled={value.length === 0 || isError}
            className="w-full"
            onClick={handleDeleteClick}
          >
            Delete transaction
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
