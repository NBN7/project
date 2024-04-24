"use client";

import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import { EditUserDialog } from "@/components/UsersTable/Dialog/EditUserDialog";
import { DeleteUserDialog } from "@/components/UsersTable/Dialog/DeleteUserDialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import type { TUser } from "@/types/user";

import { toastCall } from "@/utils/toastCall";

import { IoIosMore } from "react-icons/io";

export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      const [currentDialog, setCurrentDialog] = useState("");

      const handleCopyId = () => {
        navigator.clipboard.writeText(user.id);

        toastCall("ID copied to clipboard");
      };

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                <span className="sr-only">Open menu</span>
                <IoIosMore className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex flex-col" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleCopyId}>
                Copy ID
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DialogTrigger
                onClick={() => {
                  setCurrentDialog("edit");
                }}
              >
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DialogTrigger>

              <DialogTrigger
                onClick={() => {
                  setCurrentDialog("delete");
                }}
              >
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent
            className="w-11/12 sm:max-w-md"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {currentDialog === "delete" ? (
              <DeleteUserDialog id={user.id} />
            ) : currentDialog === "edit" ? (
              <EditUserDialog user={user} />
            ) : null}
          </DialogContent>
        </Dialog>
      );
    },
  },
];
