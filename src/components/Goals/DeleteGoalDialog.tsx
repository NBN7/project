"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { useDeleteGoal } from "@/hooks/goals/useDeleteGoal";

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

export const DeleteGoalDialog = ({ id }: DeleteDialog) => {
  const [confirm, setConfirm] = useState("");

  const { data: session } = useSession();

  const { mutate: callDeleteGoalMutation } = useDeleteGoal({
    userId: session?.user?.id as string,
    goalId: id,
  });

  const handleDeleteClick = () => {
    callDeleteGoalMutation();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete this goal
          and remove the data from our servers.
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
            Delete goal
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
