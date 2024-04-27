"use client";

import { useState } from "react";

import { useDeleteUser } from "@/hooks/useDeleteUser";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DeleteUserDialogProps {
  id: string;
}

export const DeleteUserDialog = ({ id }: DeleteUserDialogProps) => {
  const [confirm, setConfirm] = useState("");

  const { callDeleteUserMutation } = useDeleteUser({ id });

  const handleDeleteClick = () => {
    callDeleteUserMutation();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete this
          account and remove the data from our servers.
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
            disabled={!confirm.length || confirm !== "delete"}
            className="w-full"
            onClick={handleDeleteClick}
          >
            Delete account
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
