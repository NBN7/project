import { Combobox } from "./Combobox";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { TUser } from "@/types/user";

export const EditDialog = ({ user }: { user: TUser }) => {
  const handleSaveChanges = () => {
    // replace with toast
    console.log("Changes saved!");
  };

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
        />
        <Combobox currentRole={user.role as string} />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button className="w-full" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
