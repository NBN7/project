"use client";

import { useState, useEffect } from "react";

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
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);

  const { callDeleteUserMutation } = useDeleteUser({ id });

  const handleDeleteClick = () => {
    callDeleteUserMutation();
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
          account and remove the data from our servers.
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
            Delete account
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
