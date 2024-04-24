"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useEditUser } from "@/hooks/useEditUser";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ROLES } from "@/constants/roles";

import type { TUser } from "@/types/user";

interface EditUserDialogProps {
  user: TUser;
}

export const EditUserDialog = ({ user }: EditUserDialogProps) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);

  const { data: session, update } = useSession();

  // fn to update the session we get from useSession
  const updateSession = async () => {
    await update({
      ...session,
      user: {
        ...session?.user,
        name,
      },
    });
  };

  const { callEditUserMutation } = useEditUser({
    id: user.id as string,
    name,
    role,
    updateSession,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSaveChanges = () => {
    callEditUserMutation();
  };

  useEffect(() => {
    if (value.toLowerCase() !== "edit") {
      setIsError(true);
      return;
    }

    setIsError(false);
  }, [value]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit user</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-2">
        <Input
          autoComplete="off"
          className="focus-visible:ring-offset-0 focus-visible:ring-0"
          placeholder="Name"
          defaultValue={user.name}
          name="name"
          onChange={handleNameChange}
        />

        <Select
          defaultValue={role ?? "Select a role"}
          onValueChange={(value) => setRole(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {ROLES.map((role, index) => (
                <SelectItem key={index} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          autoComplete="off"
          className="focus-visible:ring-offset-0 focus-visible:ring-0"
          placeholder={`Type "edit" to confirm`}
          onChange={(e) => setValue(e.target.value)}
          name="confirm"
        />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button
            disabled={value.length === 0 || isError}
            className="w-full"
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
