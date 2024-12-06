"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";

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
  const [confirm, setConfirm] = useState("");

  const { data: session } = useSession();

  const { callDeleteTransactionMutation } = useDeleteTransaction({
    userId: session?.user?.id as string,
    transactionId: id,
  });

  const handleDeleteClick = (e: React.FormEvent) =>
    callDeleteTransactionMutation();

  const isDisabled = () => {
    return !confirm.length || confirm !== "delete";
  };

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
        onChange={(e) => setConfirm(e.target.value.toLowerCase())}
        name="confirm"
      />

      <DialogFooter>
        <DialogClose asChild>
          <Button
            disabled={isDisabled()}
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
