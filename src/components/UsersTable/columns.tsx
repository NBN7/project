"use client";

import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import { EditDialog } from "@/components/UsersTable/Dialog/EditDialog";
import { DeleteDialog } from "@/components/UsersTable/Dialog/DeleteDialog";

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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Copy ID
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DialogTrigger
                onClick={() => {
                  setCurrentDialog("edit");
                }}
              >
                <DropdownMenuItem className="cursor-pointer">
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogTrigger
                onClick={() => {
                  setCurrentDialog("delete");
                }}
              >
                <DropdownMenuItem className="cursor-pointer">
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="w-11/12 sm:max-w-md">
            {currentDialog === "delete" ? (
              <DeleteDialog id={user.id} />
            ) : currentDialog === "edit" ? (
              <EditDialog user={user} />
            ) : null}
          </DialogContent>
        </Dialog>
      );
    },
  },
];
