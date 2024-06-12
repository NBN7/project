"use client";

import { useState, useEffect } from "react";

import { useEditUser } from "@/hooks/users/useEditUser";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EditProfileDialogProps {
  id: string;
  name: string;
  description: string;
  role: string;
}

export const EditProfileDialog = ({
  id,
  name,
  description,
  role,
}: EditProfileDialogProps) => {
  const [inputName, setInputName] = useState(name ?? "");
  const [inputDescription, setInputDescription] = useState(description ?? "");
  const [confirm, setConfirm] = useState("");

  const { callEditUserMutation } = useEditUser({
    id,
    name: inputName,
    description: inputDescription,
    role,
  });

  const handleEditProfile = async () => {
    await callEditUserMutation();

    setConfirm("");
  };

  const isDisabled = () => {
    return (
      !inputName.length ||
      !inputDescription.length ||
      !inputDescription.trim().length ||
      (inputName === name && inputDescription === description) ||
      confirm.toLowerCase() !== "edit"
    );
  };

  useEffect(() => {
    setInputName(name ?? "");
    setInputDescription(description ?? "");
  }, [name, description]);

  return (
    <DialogContent
      className="w-11/12 sm:max-w-md"
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save changes when you're
          done.
        </DialogDescription>
      </DialogHeader>

      <Input
        maxLength={32}
        autoComplete="off"
        placeholder="Name"
        className="focus-visible:ring-offset-0 focus-visible:ring-0"
        value={inputName}
        name="name"
        onChange={(e) => setInputName(e.target.value)}
      />
      <Textarea
        maxLength={32}
        autoComplete="off"
        placeholder="Description"
        className="focus-visible:ring-offset-0 focus-visible:ring-0"
        value={inputDescription}
        name="description"
        onChange={(e) => setInputDescription(e.target.value)}
      />

      <Input
        autoComplete="off"
        className="focus-visible:ring-offset-0 focus-visible:ring-0"
        placeholder={`Type "edit" to confirm`}
        name="confirm"
        onChange={(e) => setConfirm(e.target.value.toLowerCase())}
      />

      <DialogFooter>
        <DialogClose asChild>
          <Button
            disabled={isDisabled()}
            className="w-full"
            onClick={handleEditProfile}
          >
            Save changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
