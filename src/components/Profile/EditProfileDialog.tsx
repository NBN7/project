"use client";

import { useState, useEffect } from "react";

import { useEditUser } from "@/hooks/useEditUser";

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
}

export const EditProfileDialog = ({
  id,
  name,
  description,
}: EditProfileDialogProps) => {
  const [inputName, setInputName] = useState(name ?? "");
  const [inputDescription, setInputDescription] = useState(description ?? "");
  const [confirm, setConfirm] = useState("");

  const { callEditUserMutation } = useEditUser({
    id,
    name: inputName,
    description: inputDescription,
  });

  const handleEditProfile = () => {
    callEditUserMutation();
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
          Edit your profile by filling out the form below.
        </DialogDescription>
      </DialogHeader>

      <Input
        maxLength={32}
        autoComplete="off"
        placeholder="Name"
        className="focus-visible:ring-offset-0 focus-visible:ring-0"
        value={inputName}
        name="name"
        onChange={(e) => setInputName(e.target.value.toLowerCase())}
      />
      <Textarea
        maxLength={32}
        autoComplete="off"
        placeholder="Description"
        className="focus-visible:ring-offset-0 focus-visible:ring-0"
        value={inputDescription}
        name="description"
        onChange={(e) => setInputDescription(e.target.value.toLowerCase())}
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
            disabled={
              !inputName.length ||
              !inputDescription.length ||
              (inputName === name && inputDescription === description) ||
              confirm !== "edit"
            }
            className="w-full"
            onClick={handleEditProfile}
          >
            Edit profile
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
